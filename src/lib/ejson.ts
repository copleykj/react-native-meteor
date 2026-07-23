import EJSON from 'ejson';

/**
 * Single import site for EJSON. Every module in this package goes through
 * this wrapper (never `import from 'ejson'` directly) so the implementation
 * can be swapped or vendored without touching call sites.
 *
 * The `ejson` npm package is Meteor's own extraction and tracks the wire
 * format we speak over DDP; reimplementing it would be all risk, no reward.
 */
export type { EJSONableCustomType } from 'ejson';
export default EJSON;
