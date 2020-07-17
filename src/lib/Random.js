const UNMISTAKABLE_CHARS = '23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz';

export default {
    id (count = 17) {
        let res = '';
        for (let i = 0; i < count; i++) {
            res += UNMISTAKABLE_CHARS[Math.floor(Math.random() * UNMISTAKABLE_CHARS.length)];
        }
        return res;
    },
};
