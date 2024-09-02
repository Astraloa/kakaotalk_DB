'use strict'
Object.defineProperty(exports, '__esModule', { value: true });
exports.BigJSON = void 0
var BigJSON,
    BIG = require('./lossless-json');
!(function (z) {
    function O(I, d) {
        if ('object' == typeof d && d && 'isLosslessNumber' in d) {
            try {
                return d.valueOf();
            } catch (t) {
                return d.toString();
            }
        }
        return d
    }
    z.parseOnlyNum = function (I) {
        for (
            var d = [], c = new org.json.JSONArray(I), m = 0;
            m < Number(c.length());
            m++
        ) {
            var U = String(c.getString(m));
            d.push(U);
        }
        return d
    }
    z.parse = function (I) {
        return BIG.parse(I, O);
    }
    z.stringify = function (I) {
        return BIG.stringify(I);
    }
})(BigJSON || (exports.BigJSON = BigJSON = {}))