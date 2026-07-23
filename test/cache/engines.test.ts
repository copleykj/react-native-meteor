import { describe, it, expect } from 'vitest';

import { compileMatcher } from '../../src/cache/matcher';
import { applyModifier } from '../../src/cache/modifier';
import { compileSorter, compareValues } from '../../src/cache/sorter';
import { applyProjection } from '../../src/cache/projector';
import MeteorError from '../../src/lib/error';
import type { Document, Selector, Modifier, SortSpec, FieldsSpec } from '../../src/cache/types';

function doc(fields: Record<string, unknown>, _id = 'id1'): Document {
    return { _id, ...fields };
}

function expectMeteorError(fn: () => unknown, code: string): void {
    let thrown: unknown;
    try {
        fn();
    } catch (error) {
        thrown = error;
    }
    expect(thrown).toBeInstanceOf(MeteorError);
    expect((thrown as MeteorError).error).toBe(code);
}

describe('compileMatcher', () => {
    type MatchCase = [name: string, selector: Selector, document: Record<string, unknown>, expected: boolean];

    const cases: MatchCase[] = [
        // -- plain equality ------------------------------------------------
        ['string equality matches', { name: 'ada' }, { name: 'ada' }, true],
        ['string equality rejects', { name: 'ada' }, { name: 'bob' }, false],
        ['number equality matches', { n: 5 }, { n: 5 }, true],
        ['boolean equality matches', { ok: true }, { ok: true }, true],
        ['deep object equality via EJSON', { profile: { age: 3, tags: ['x'] } }, { profile: { age: 3, tags: ['x'] } }, true],
        ['deep object equality rejects differing nesting', { profile: { age: 3 } }, { profile: { age: 4 } }, false],
        ['date equality via EJSON', { at: new Date(1000) }, { at: new Date(1000) }, true],
        ['null matches explicit null', { a: null }, { a: null }, true],
        ['null matches missing field', { a: null }, { b: 1 }, true],
        ['null rejects present value', { a: null }, { a: 1 }, false],
        // -- array containment --------------------------------------------
        ['array containment matches element', { tags: 'x' }, { tags: ['w', 'x'] }, true],
        ['array containment rejects absent element', { tags: 'x' }, { tags: ['w', 'y'] }, false],
        ['array whole-value equality matches', { tags: ['w', 'x'] }, { tags: ['w', 'x'] }, true],
        ['array containment of object element', { items: { a: 1 } }, { items: [{ a: 1 }, { b: 2 }] }, true],
        // -- dotted paths --------------------------------------------------
        ['dotted path matches', { 'a.b.c': 7 }, { a: { b: { c: 7 } } }, true],
        ['dotted path rejects', { 'a.b.c': 7 }, { a: { b: { c: 8 } } }, false],
        ['dotted path through array of docs matches', { 'a.b': 2 }, { a: [{ b: 1 }, { b: 2 }] }, true],
        ['dotted path through array of docs rejects', { 'a.b': 3 }, { a: [{ b: 1 }, { b: 2 }] }, false],
        ['numeric index into array matches', { 'a.1': 'y' }, { a: ['x', 'y'] }, true],
        ['dotted path into array element field containment', { 'a.b': 'x' }, { a: [{ b: ['w', 'x'] }] }, true],
        // -- $eq / $ne -----------------------------------------------------
        ['$eq matches', { n: { $eq: 5 } }, { n: 5 }, true],
        ['$eq array containment', { tags: { $eq: 'x' } }, { tags: ['x', 'y'] }, true],
        ['$ne matches different value', { n: { $ne: 5 } }, { n: 6 }, true],
        ['$ne rejects equal value', { n: { $ne: 5 } }, { n: 5 }, false],
        ['$ne rejects array containing value (Mongo semantics)', { tags: { $ne: 'x' } }, { tags: ['w', 'x'] }, false],
        ['$ne matches array without value', { tags: { $ne: 'x' } }, { tags: ['w', 'y'] }, true],
        ['$ne over dotted array path rejects when any branch equals', { 'a.b': { $ne: 1 } }, { a: [{ b: 1 }, { b: 2 }] }, false],
        // -- $in / $nin ----------------------------------------------------
        ['$in matches listed value', { n: { $in: [1, 2, 3] } }, { n: 2 }, true],
        ['$in rejects unlisted value', { n: { $in: [1, 2, 3] } }, { n: 4 }, false],
        ['$in matches via array containment', { tags: { $in: ['x'] } }, { tags: ['w', 'x'] }, true],
        ['$in with RegExp member', { name: { $in: [/^a/] } }, { name: 'ada' }, true],
        ['$in with null matches missing field', { a: { $in: [null] } }, { b: 1 }, true],
        ['$nin rejects listed value', { n: { $nin: [1, 2] } }, { n: 2 }, false],
        ['$nin matches unlisted value', { n: { $nin: [1, 2] } }, { n: 3 }, true],
        ['$nin rejects array containing listed value', { tags: { $nin: ['x'] } }, { tags: ['w', 'x'] }, false],
        // -- ordering operators -------------------------------------------
        ['$gt number matches', { n: { $gt: 5 } }, { n: 6 }, true],
        ['$gt number rejects equal', { n: { $gt: 5 } }, { n: 5 }, false],
        ['$gte number matches equal', { n: { $gte: 5 } }, { n: 5 }, true],
        ['$lt number matches', { n: { $lt: 5 } }, { n: 4 }, true],
        ['$lte number rejects greater', { n: { $lte: 5 } }, { n: 6 }, false],
        ['$gt string lexicographic', { s: { $gt: 'apple' } }, { s: 'banana' }, true],
        ['$lt date matches', { at: { $lt: new Date(2000) } }, { at: new Date(1000) }, true],
        ['$gt cross-type never matches (string vs number)', { n: { $gt: 5 } }, { n: 'zzz' }, false],
        ['$gt cross-type never matches (number vs string)', { s: { $gt: 'a' } }, { s: 5 }, false],
        ['$gt matches any array element', { scores: { $gt: 90 } }, { scores: [10, 95] }, true],
        ['$gt combined range with $lt', { n: { $gt: 1, $lt: 5 } }, { n: 3 }, true],
        ['$gt combined range rejects outside', { n: { $gt: 1, $lt: 5 } }, { n: 7 }, false],
        // -- $exists -------------------------------------------------------
        ['$exists true matches present field', { a: { $exists: true } }, { a: 0 }, true],
        ['$exists true rejects missing field', { a: { $exists: true } }, { b: 1 }, false],
        ['$exists false matches missing field', { a: { $exists: false } }, { b: 1 }, true],
        ['$exists false rejects present field', { a: { $exists: false } }, { a: null }, false],
        ['$exists false on dotted path with element lacking field', { 'a.b': { $exists: false } }, { a: [{ b: 1 }, { c: 1 }] }, true],
        // -- regex ---------------------------------------------------------
        ['$regex string pattern matches', { name: { $regex: '^ad' } }, { name: 'ada' }, true],
        ['$regex string pattern rejects', { name: { $regex: '^ad' } }, { name: 'bob' }, false],
        ['$regex with $options case-insensitive', { name: { $regex: '^AD', $options: 'i' } }, { name: 'ada' }, true],
        ['$regex RegExp literal value', { name: { $regex: /a$/ } }, { name: 'ada' }, true],
        ['bare RegExp acts like $regex', { name: /^ad/ }, { name: 'ada' }, true],
        ['bare RegExp matches array element', { tags: /^x/ }, { tags: ['w', 'xyz'] }, true],
        ['regex rejects non-string values', { n: /5/ }, { n: 55 }, false],
        // -- logical operators --------------------------------------------
        ['$and all match', { $and: [{ a: 1 }, { b: 2 }] }, { a: 1, b: 2 }, true],
        ['$and one fails', { $and: [{ a: 1 }, { b: 3 }] }, { a: 1, b: 2 }, false],
        ['$or one matches', { $or: [{ a: 9 }, { b: 2 }] }, { a: 1, b: 2 }, true],
        ['$or none match', { $or: [{ a: 9 }, { b: 9 }] }, { a: 1, b: 2 }, false],
        ['$nor none match', { $nor: [{ a: 9 }, { b: 9 }] }, { a: 1, b: 2 }, true],
        ['$nor one matches', { $nor: [{ a: 1 }] }, { a: 1 }, false],
        ['$not negates operator doc', { n: { $not: { $gt: 5 } } }, { n: 3 }, true],
        ['$not rejects matching operator doc', { n: { $not: { $gt: 5 } } }, { n: 7 }, false],
        ['$not with RegExp', { name: { $not: /^ad/ } }, { name: 'bob' }, true],
        // -- $elemMatch / $size / $mod ------------------------------------
        ['$elemMatch value form matches single element satisfying both', { scores: { $elemMatch: { $gt: 5, $lt: 9 } } }, { scores: [4, 7] }, true],
        ['$elemMatch value form rejects when no single element satisfies', { scores: { $elemMatch: { $gt: 5, $lt: 9 } } }, { scores: [4, 12] }, false],
        ['$elemMatch document form matches', { items: { $elemMatch: { qty: { $gt: 5 }, sku: 'a' } } }, { items: [{ sku: 'a', qty: 9 }, { sku: 'b', qty: 1 }] }, true],
        ['$elemMatch document form rejects split across elements', { items: { $elemMatch: { qty: { $gt: 5 }, sku: 'b' } } }, { items: [{ sku: 'a', qty: 9 }, { sku: 'b', qty: 1 }] }, false],
        ['$size matches exact length', { tags: { $size: 2 } }, { tags: ['a', 'b'] }, true],
        ['$size rejects other lengths', { tags: { $size: 2 } }, { tags: ['a'] }, false],
        ['$size rejects non-arrays', { tags: { $size: 0 } }, { tags: 'ab' }, false],
        ['$mod matches', { n: { $mod: [4, 1] } }, { n: 9 }, true],
        ['$mod rejects', { n: { $mod: [4, 1] } }, { n: 8 }, false],
        ['$mod matches array element', { n: { $mod: [2, 0] } }, { n: [3, 4] }, true],
        // -- combinations --------------------------------------------------
        ['implicit AND of multiple fields', { a: 1, 'b.c': { $gte: 2 } }, { a: 1, b: { c: 5 } }, true],
        ['implicit AND fails on one field', { a: 1, 'b.c': { $gte: 2 } }, { a: 2, b: { c: 5 } }, false],
        ['empty selector matches everything', {}, { anything: 1 }, true],
    ];

    it.each(cases)('%s', (_name, selector, document, expected) => {
        expect(compileMatcher(selector)(doc(document))).toBe(expected);
    });

    it('throws MeteorError(unsupported-selector) for unknown field operators', () => {
        expectMeteorError(() => compileMatcher({ a: { $near: [0, 0] } }), 'unsupported-selector');
    });

    it('throws MeteorError(unsupported-selector) for unknown top-level operators', () => {
        expectMeteorError(() => compileMatcher({ $where: 'this.a === 1' }), 'unsupported-selector');
    });

    it('throws for $and without an array', () => {
        expectMeteorError(() => compileMatcher({ $and: { a: 1 } }), 'invalid-selector');
    });

    it('throws for $options without $regex', () => {
        expectMeteorError(() => compileMatcher({ a: { $options: 'i' } }), 'invalid-selector');
    });
});

describe('applyModifier', () => {
    it('$set assigns top-level and dotted paths, creating intermediates', () => {
        const original = doc({ a: 1 });
        const updated = applyModifier(original, { $set: { a: 2, 'b.c.d': 5 } });
        expect(updated.a).toBe(2);
        expect(updated.b).toEqual({ c: { d: 5 } });
        expect(original).toEqual(doc({ a: 1 })); // input untouched
    });

    it('$set creates arrays for numeric path parts and pads with nulls', () => {
        const updated = applyModifier(doc({}), { $set: { 'a.2': 'x' } });
        expect(updated.a).toEqual([null, null, 'x']);
    });

    it('$set into an existing array element field', () => {
        const updated = applyModifier(doc({ a: [{ b: 1 }, { b: 2 }] }), { $set: { 'a.1.b': 9 } });
        expect(updated.a).toEqual([{ b: 1 }, { b: 9 }]);
    });

    it('$set clones its argument (no aliasing into the result)', () => {
        const value = { nested: [1] };
        const updated = applyModifier(doc({}), { $set: { v: value } });
        (value.nested as number[]).push(2);
        expect(updated.v).toEqual({ nested: [1] });
    });

    it('$unset removes fields and nulls array elements', () => {
        const updated = applyModifier(doc({ a: 1, b: { c: 2, d: 3 }, e: [1, 2, 3] }), {
            $unset: { a: '', 'b.c': '', 'e.1': '' },
        });
        expect('a' in updated).toBe(false);
        expect(updated.b).toEqual({ d: 3 });
        expect(updated.e).toEqual([1, null, 3]); // Mongo leaves a null hole
    });

    it('$unset of a missing path is a no-op', () => {
        expect(applyModifier(doc({ a: 1 }), { $unset: { 'x.y': '' } })).toEqual(doc({ a: 1 }));
    });

    it('$inc adds, treats missing as 0, and supports dotted paths', () => {
        const updated = applyModifier(doc({ n: 1, deep: { m: 5 } }), {
            $inc: { n: 2, 'deep.m': -1, fresh: 10 },
        });
        expect(updated.n).toBe(3);
        expect(updated.deep).toEqual({ m: 4 });
        expect(updated.fresh).toBe(10);
    });

    it('$inc throws on non-numeric targets', () => {
        expectMeteorError(() => applyModifier(doc({ n: 'x' }), { $inc: { n: 1 } }), 'invalid-modifier');
    });

    it('$mul multiplies and treats missing as 0', () => {
        const updated = applyModifier(doc({ n: 4 }), { $mul: { n: 3, fresh: 5 } });
        expect(updated.n).toBe(12);
        expect(updated.fresh).toBe(0);
    });

    it('$push appends and creates missing arrays', () => {
        const updated = applyModifier(doc({ a: [1] }), { $push: { a: 2, b: 'first' } });
        expect(updated.a).toEqual([1, 2]);
        expect(updated.b).toEqual(['first']);
    });

    it('$push supports $each', () => {
        const updated = applyModifier(doc({ a: [1] }), { $push: { a: { $each: [2, 3] } } });
        expect(updated.a).toEqual([1, 2, 3]);
    });

    it('$push to a non-array throws', () => {
        expectMeteorError(() => applyModifier(doc({ a: 1 }), { $push: { a: 2 } }), 'invalid-modifier');
    });

    it('$push rejects unsupported sub-modifiers like $position', () => {
        expectMeteorError(
            () => applyModifier(doc({ a: [] }), { $push: { a: { $each: [1], $position: 0 } } }),
            'unsupported-modifier',
        );
    });

    it('$addToSet adds only missing values (EJSON.equals dedup of objects)', () => {
        const updated = applyModifier(doc({ a: [{ x: 1 }] }), { $addToSet: { a: { x: 1 } } });
        expect(updated.a).toEqual([{ x: 1 }]);
        const grown = applyModifier(doc({ a: [{ x: 1 }] }), { $addToSet: { a: { x: 2 } } });
        expect(grown.a).toEqual([{ x: 1 }, { x: 2 }]);
    });

    it('$addToSet supports $each with dedup across existing and new items', () => {
        const updated = applyModifier(doc({ a: [1, 2] }), { $addToSet: { a: { $each: [2, 3, 3] } } });
        expect(updated.a).toEqual([1, 2, 3]);
    });

    it('$pop removes from the end (1) and the front (-1)', () => {
        expect(applyModifier(doc({ a: [1, 2, 3] }), { $pop: { a: 1 } }).a).toEqual([1, 2]);
        expect(applyModifier(doc({ a: [1, 2, 3] }), { $pop: { a: -1 } }).a).toEqual([2, 3]);
        expectMeteorError(() => applyModifier(doc({ a: [1] }), { $pop: { a: 2 } }), 'invalid-modifier');
    });

    it('$pull removes by deep-equal value', () => {
        const updated = applyModifier(doc({ a: [{ x: 1 }, { x: 2 }, { x: 1 }] }), { $pull: { a: { x: 1 } } });
        expect(updated.a).toEqual([{ x: 2 }]);
    });

    it('$pull removes by operator condition', () => {
        const updated = applyModifier(doc({ a: [1, 5, 9] }), { $pull: { a: { $gt: 4 } } });
        expect(updated.a).toEqual([1]);
    });

    it('$pull with document condition partially matches element docs', () => {
        const updated = applyModifier(doc({ a: [{ x: 1, y: 1 }, { x: 2, y: 1 }] }), {
            $pull: { a: { y: 1, x: { $lt: 2 } } },
        });
        expect(updated.a).toEqual([{ x: 2, y: 1 }]);
    });

    it('$pull on a missing field is a no-op', () => {
        expect(applyModifier(doc({}), { $pull: { a: 1 } })).toEqual(doc({}));
    });

    it('$pullAll removes every listed value', () => {
        const updated = applyModifier(doc({ a: [1, 2, 3, 2, { x: 1 }] }), { $pullAll: { a: [2, { x: 1 }] } });
        expect(updated.a).toEqual([1, 3]);
    });

    it('$min and $max keep or replace based on comparison', () => {
        const original = doc({ lo: 5, hi: 5 });
        expect(applyModifier(original, { $min: { lo: 3 } }).lo).toBe(3);
        expect(applyModifier(original, { $min: { lo: 7 } }).lo).toBe(5);
        expect(applyModifier(original, { $max: { hi: 7 } }).hi).toBe(7);
        expect(applyModifier(original, { $max: { hi: 3 } }).hi).toBe(5);
        expect(applyModifier(original, { $min: { fresh: 9 } }).fresh).toBe(9);
    });

    it('$rename moves values across dotted paths', () => {
        const updated = applyModifier(doc({ a: { b: 1 }, keep: 2 }), { $rename: { 'a.b': 'c.d' } });
        expect(updated.a).toEqual({});
        expect(updated.c).toEqual({ d: 1 });
        expect(updated.keep).toBe(2);
        expect(applyModifier(doc({ a: 1 }), { $rename: { missing: 'other' } })).toEqual(doc({ a: 1 }));
    });

    it('$currentDate sets a Date for true and {$type: "date"}', () => {
        const updated = applyModifier(doc({}), { $currentDate: { at: true, 'deep.ts': { $type: 'date' } } });
        expect(updated.at).toBeInstanceOf(Date);
        expect((updated.deep as { ts: unknown }).ts).toBeInstanceOf(Date);
        expectMeteorError(() => applyModifier(doc({}), { $currentDate: { at: 'nope' } }), 'invalid-modifier');
    });

    it('replacement modifier replaces the document but keeps _id', () => {
        const updated = applyModifier(doc({ a: 1, b: 2 }, 'keep-me'), { fresh: true } as Modifier);
        expect(updated).toEqual({ _id: 'keep-me', fresh: true });
    });

    it('replacement with a matching _id is allowed', () => {
        const updated = applyModifier(doc({ a: 1 }, 'same'), { _id: 'same', b: 2 } as Modifier);
        expect(updated).toEqual({ _id: 'same', b: 2 });
    });

    it('replacement with a different _id throws', () => {
        expectMeteorError(
            () => applyModifier(doc({ a: 1 }, 'one'), { _id: 'two', b: 2 } as Modifier),
            'invalid-modifier',
        );
    });

    it('mixing $-operators and plain fields throws', () => {
        expectMeteorError(
            () => applyModifier(doc({ a: 1 }), { $set: { a: 2 }, b: 3 }),
            'invalid-modifier',
        );
    });

    it('unknown $-operators throw MeteorError(unsupported-modifier)', () => {
        expectMeteorError(() => applyModifier(doc({}), { $bit: { a: { and: 1 } } }), 'unsupported-modifier');
    });

    it('modifying _id throws (top-level and dotted)', () => {
        expectMeteorError(() => applyModifier(doc({}), { $set: { _id: 'nope' } }), 'invalid-modifier');
        expectMeteorError(() => applyModifier(doc({}), { $inc: { '_id.x': 1 } }), 'invalid-modifier');
        expectMeteorError(() => applyModifier(doc({ a: 1 }), { $rename: { a: '_id' } }), 'invalid-modifier');
    });

    it('never mutates the input document', () => {
        const original = doc({ a: [1, 2], b: { c: 3 } });
        const snapshot = JSON.parse(JSON.stringify(original)) as unknown;
        applyModifier(original, { $push: { a: 3 }, $set: { 'b.c': 9, 'b.d': 1 }, $inc: { n: 1 } });
        expect(original).toEqual(snapshot);
    });
});

describe('compileSorter', () => {
    const byIds = (docs: Document[]): string[] => docs.map((d) => d._id);

    it('sorts ascending and descending on a single key', () => {
        const docs = [doc({ n: 3 }, 'c'), doc({ n: 1 }, 'a'), doc({ n: 2 }, 'b')];
        expect(byIds([...docs].sort(compileSorter({ n: 1 })))).toEqual(['a', 'b', 'c']);
        expect(byIds([...docs].sort(compileSorter({ n: -1 })))).toEqual(['c', 'b', 'a']);
    });

    it('breaks ties with subsequent keys, preserving spec order', () => {
        const docs = [
            doc({ g: 1, n: 2 }, 'b'),
            doc({ g: 2, n: 1 }, 'c'),
            doc({ g: 1, n: 1 }, 'a'),
        ];
        expect(byIds([...docs].sort(compileSorter({ g: 1, n: 1 })))).toEqual(['a', 'b', 'c']);
        expect(byIds([...docs].sort(compileSorter({ g: 1, n: -1 })))).toEqual(['b', 'a', 'c']);
    });

    it('supports the array form with asc/desc', () => {
        const docs = [doc({ n: 1 }, 'a'), doc({ n: 2 }, 'b')];
        expect(byIds([...docs].sort(compileSorter([['n', 'desc']])))).toEqual(['b', 'a']);
        expect(byIds([...docs].sort(compileSorter([['n', 'asc']])))).toEqual(['a', 'b']);
    });

    it('supports dotted paths', () => {
        const docs = [doc({ a: { b: 2 } }, 'y'), doc({ a: { b: 1 } }, 'x')];
        expect(byIds([...docs].sort(compileSorter({ 'a.b': 1 })))).toEqual(['x', 'y']);
    });

    it('orders across type brackets: null < number < string < object < array < boolean < date', () => {
        const docs = [
            doc({ v: true }, 'bool'),
            doc({ v: 'str' }, 'string'),
            doc({ v: new Date(0) }, 'date'),
            doc({ v: [1] }, 'array'),
            doc({ v: null }, 'null'),
            doc({ v: { a: 1 } }, 'object'),
            doc({ v: 5 }, 'number'),
        ];
        expect(byIds([...docs].sort(compileSorter({ v: 1 })))).toEqual([
            'null', 'number', 'string', 'object', 'array', 'bool', 'date',
        ]);
    });

    it('treats missing fields like null (first ascending)', () => {
        const docs = [doc({ v: 1 }, 'has'), doc({}, 'missing')];
        expect(byIds([...docs].sort(compileSorter({ v: 1 })))).toEqual(['missing', 'has']);
    });

    it('returns 0 for full ties', () => {
        expect(compileSorter({ n: 1 })(doc({ n: 1 }, 'a'), doc({ n: 1 }, 'b'))).toBe(0);
        expect(compileSorter({})(doc({}, 'a'), doc({}, 'b'))).toBe(0);
    });

    it('compares dates by time and booleans false-first', () => {
        expect(compareValues(new Date(1000), new Date(2000))).toBeLessThan(0);
        expect(compareValues(false, true)).toBeLessThan(0);
        expect(compareValues('a', 'b')).toBeLessThan(0);
    });

    it('throws on invalid sort directions', () => {
        expectMeteorError(() => compileSorter({ n: 2 } as unknown as SortSpec), 'invalid-sort');
        expectMeteorError(() => compileSorter([['n', 'up']] as unknown as SortSpec), 'invalid-sort');
    });
});

describe('applyProjection', () => {
    const base = doc({ name: 'ada', age: 36, profile: { city: 'london', zip: 'e1' }, tags: ['a', 'b'] });

    it('returns a clone when fields is undefined or empty', () => {
        const cloned = applyProjection(base, undefined);
        expect(cloned).toEqual(base);
        expect(cloned).not.toBe(base);
        expect(applyProjection(base, {})).toEqual(base);
    });

    it('include mode keeps only listed paths plus _id', () => {
        expect(applyProjection(base, { name: 1 })).toEqual({ _id: 'id1', name: 'ada' });
        expect(applyProjection(base, { name: 1, age: true })).toEqual({ _id: 'id1', name: 'ada', age: 36 });
    });

    it('include mode with _id: 0 drops _id', () => {
        expect(applyProjection(base, { name: 1, _id: 0 })).toEqual({ name: 'ada' });
    });

    it('include mode supports dotted paths', () => {
        expect(applyProjection(base, { 'profile.city': 1, _id: 0 })).toEqual({ profile: { city: 'london' } });
    });

    it('include mode projects into arrays of documents', () => {
        const withItems = doc({ items: [{ sku: 'a', qty: 1 }, { sku: 'b', qty: 2 }] });
        expect(applyProjection(withItems, { 'items.sku': 1, _id: 0 })).toEqual({
            items: [{ sku: 'a' }, { sku: 'b' }],
        });
    });

    it('exclude mode drops listed paths and keeps the rest', () => {
        expect(applyProjection(base, { age: 0, tags: false })).toEqual({
            _id: 'id1',
            name: 'ada',
            profile: { city: 'london', zip: 'e1' },
        });
    });

    it('exclude mode supports dotted paths, including through arrays', () => {
        const withItems = doc({ items: [{ sku: 'a', qty: 1 }, { sku: 'b', qty: 2 }], n: 1 });
        expect(applyProjection(withItems, { 'items.qty': 0 })).toEqual({
            _id: 'id1',
            items: [{ sku: 'a' }, { sku: 'b' }],
            n: 1,
        });
        expect(applyProjection(base, { 'profile.zip': 0, age: 0, tags: 0 })).toEqual({
            _id: 'id1',
            name: 'ada',
            profile: { city: 'london' },
        });
    });

    it('{_id: 0} alone excludes only _id; {_id: 1} alone keeps only _id', () => {
        expect(applyProjection(doc({ a: 1 }), { _id: 0 })).toEqual({ a: 1 });
        expect(applyProjection(doc({ a: 1 }), { _id: 1 })).toEqual({ _id: 'id1' });
    });

    it('throws MeteorError(invalid-fields) on mixed include/exclude', () => {
        expectMeteorError(() => applyProjection(base, { name: 1, age: 0 }), 'invalid-fields');
    });

    it('throws on non-boolean, non-0/1 specifiers', () => {
        expectMeteorError(() => applyProjection(base, { name: 2 } as unknown as FieldsSpec), 'invalid-fields');
    });

    it('does not mutate the input document', () => {
        const original = doc({ a: { b: 1 }, c: 2 });
        applyProjection(original, { 'a.b': 0 });
        applyProjection(original, { c: 1 });
        expect(original).toEqual(doc({ a: { b: 1 }, c: 2 }));
    });
});
