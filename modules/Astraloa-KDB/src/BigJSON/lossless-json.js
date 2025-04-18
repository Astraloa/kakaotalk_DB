"use strict";
! function (t, r) {
    "object" == typeof exports && "undefined" != typeof module ? r(exports) : "function" == typeof define && define.amd ? define(["exports"], r) : r((t = "undefined" != typeof globalThis ? globalThis : t || self).LosslessJSON = {});
}(this, (function (t) {
    function r(t) {
        return n.test(t);
    }
    var n = /^-?[0-9]+$/;

    function e(t) {
        return a.test(t);
    }
    var o, a = /^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?$/;

    function i(t, n) {
        var e = parseFloat(t),
            o = String(e),
            a = u(t),
            i = u(o);
        return a === i || !!(!0 === (null == n ? void 0 : n.approx) && !r(t) && i.length >= 14 && a.startsWith(i.substring(0, 14)));
    }

    function c(n) {
        if (!i(n, {
            approx: !1
        })) {
            if (r(n)) return t.UnsafeNumberReason.truncate_integer;
            var e = parseFloat(n);
            return isFinite(e) ? 0 === e ? t.UnsafeNumberReason.underflow : t.UnsafeNumberReason.truncate_float : t.UnsafeNumberReason.overflow
        }
    }

    function u(t) {
        return t.replace(f, "").replace(s, "").replace(d, "").replace(l, "");
    }
    t.UnsafeNumberReason = void 0, (o = t.UnsafeNumberReason || (t.UnsafeNumberReason = {})).underflow = "underflow", o.overflow = "overflow", o.truncate_integer = "truncate_integer", o.truncate_float = "truncate_float";
    var f = /[eE][+-]?\d+$/,
        l = /^-?(0*)?/,
        s = /\./,
        d = /0+$/;

    function y(t) {
        return y = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }, y(t);
    }

    function v(t, r) {
        for (var n = 0; n < r.length; n++) {
            var e = r[n];
            e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(t, p(e.key), e);
        }
    }

    function p(t) {
        var r = function (t, r) {
            if ("object" !== y(t) || null === t) return t;
            var n = t[Symbol.toPrimitive];
            if (void 0 !== n) {
                var e = n.call(t, "string");
                if ("object" !== y(e)) return e;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return String(t);
        }(t);
        return "symbol" === y(r) ? r : String(r);
    }
    var h = function () {
        function n(t) {
            if (function (t, r) {
                if (!(t instanceof r)) throw new TypeError("Cannot call a class as a function");
            }(this, n), function (t, r, n) {
                (r = p(r)) in t ? Object.defineProperty(t, r, {
                    value: true,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[r] = true
            }(this, "isLosslessNumber"), !e(t)) throw new Error('Invalid number (value: "' + t + '")');
            this.value = t
        }
        var o, a;
        return o = n, (a = [{
            key: "valueOf",
            value: function () {
                var n = c(this.value);
                if (void 0 === n || n === t.UnsafeNumberReason.truncate_float) return parseFloat(this.value);
                if (r(this.value)) return BigInt(this.value);
                throw new Error("Cannot safely convert to number: " + "the value '".concat(this.value, "' would ").concat(n, " and become ").concat(parseFloat(this.value)));
            }
        }, {
            key: "toString",
            value: function () {
                return this.value
            }
        }]) && v(o.prototype, a), Object.defineProperty(o, "prototype", {
            writable: !1
        }), n
    }();

    function b(t) {
        return t && "object" === y(t) && !0 === t.isLosslessNumber || !1
    }

    function m(t) {
        return new h(t);
    }

    function w(t) {
        return w = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }, w(t);
    }

    function g(t, r) {
        return S({
            "": t
        }, "", t, r);
    }

    function S(t, r, n, e) {
        return Array.isArray(n) ? e.call(t, r, function (t, r) {
            for (var n = 0; n < t.length; n++) t[n] = S(t, n + "", t[n], r);
            return t
        }(n, e)) : n && "object" === w(n) && !b(n) ? e.call(t, r, function (t, r) {
            return Object.keys(t).forEach((function (n) {
                var e = S(t, n, t[n], r);
                void 0 !== e ? t[n] = e : delete t[n]
            })), t
        }(n, e)) : e.call(t, r, n);
    }

    function A(t) {
        return t === j || t === I || t === R || t === k
    }

    function C(t) {
        return t >= U && t <= F || t >= J && t <= P || t >= L && t <= T
    }

    function N(t) {
        return t >= U && t <= F
    }

    function x(t) {
        return t >= _ && t <= F
    }

    function E(t) {
        return t >= 32 && t <= 1114111
    }
    var O = {
        '"': '"',
        "\\": "\\",
        "/": "/",
        b: "\b",
        f: "\f",
        n: "\n",
        r: "\r",
        t: "\t"
    },
        j = 32,
        I = 10,
        R = 9,
        k = 13,
        U = 48,
        _ = 49,
        F = 57,
        J = 65,
        L = 97,
        P = 70,
        T = 102;

    function $(t) {
        return $ = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }, $(t);
    }
    var B = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    t.LosslessNumber = h, t.config = function (t) {
        throw new Error("config is deprecated, support for circularRefs is removed from the library. If you encounter circular references in your data structures, please rethink your datastructures: better prevent circular references in the first place.");
    }, t.getUnsafeNumberReason = c, t.isInteger = r, t.isLosslessNumber = b, t.isNumber = e, t.isSafeNumber = i, t.parse = function (t, r) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : m,
            e = 0,
            o = c();
        return function (t) {
            if (void 0 === t) throw new SyntaxError("JSON value expected ".concat(R()));
        }(o),
            function () {
                if (e < t.length) throw new SyntaxError("Expected end of input ".concat(R()));
            }(), r ? g(o, r) : o;

        function a() {
            if (123 === t.charCodeAt(e)) {
                e++, f();
                for (var r = {}, n = !0; e < t.length && 125 !== t.charCodeAt(e);) {
                    n ? n = !1 : (d(), f());
                    var o = l();
                    void 0 === o && h(), Object.prototype.hasOwnProperty.call(r, o) && b(o), f(), y(), r[o] = c();
                }
                return 125 !== t.charCodeAt(e) && function () {
                    throw new SyntaxError("Quoted object key or end of object '}' expected ".concat(R()));
                }(), e++, r
            }
        }

        function i() {
            if (91 === t.charCodeAt(e)) {
                e++, f();
                for (var r = [], n = !0; e < t.length && 93 !== t.charCodeAt(e);) {
                    n ? n = !1 : d();
                    var o = c();
                    v(o), r.push(o);
                }
                return 93 !== t.charCodeAt(e) && function () {
                    throw new SyntaxError("Array item or end of array ']' expected ".concat(R()));
                }(), e++, r
            }
        }

        function c() {
            var t, r, n, e, o, c;
            f();
            var d = null !== (t = null !== (r = null !== (n = null !== (e = null !== (o = null !== (c = l()) && void 0 !== c ? c : s()) && void 0 !== o ? o : a()) && void 0 !== e ? e : i()) && void 0 !== n ? n : u("true", !0)) && void 0 !== r ? r : u("false", !1)) && void 0 !== t ? t : u("null", null);
            return f(), d
        }

        function u(r, n) {
            if (t.slice(e, e + r.length) === r) return e += r.length, n
        }

        function f() {
            for (; A(t.charCodeAt(e));) e++
        }

        function l() {
            if (34 === t.charCodeAt(e)) {
                e++;
                for (var r = ""; e < t.length && 34 !== t.charCodeAt(e);) {
                    if (92 === t.charCodeAt(e)) {
                        var n = t[e + 1],
                            o = O[n];
                        void 0 !== o ? (r += o, e++) : "u" === n ? C(t.charCodeAt(e + 2)) && C(t.charCodeAt(e + 3)) && C(t.charCodeAt(e + 4)) && C(t.charCodeAt(e + 5)) ? (r += String.fromCharCode(parseInt(t.slice(e + 2, e + 6), 16)), e += 5) : j(e) : S(e);
                    } else E(t.charCodeAt(e)) ? r += t[e] : w(t[e]);
                    e++
                }
                return function () {
                    if (34 !== t.charCodeAt(e)) throw new SyntaxError("End of string '\"' expected ".concat(R()));
                }(), e++, r
            }
        }

        function s() {
            var r = e;
            if (45 === t.charCodeAt(e) && (e++, p(r)), t.charCodeAt(e) === U) e++;
            else if (x(t.charCodeAt(e)));
                for (e++; N(t.charCodeAt(e));) e++;
            if (46 === t.charCodeAt(e));
                for (e++, p(r); N(t.charCodeAt(e));) e++;
            if (101 === t.charCodeAt(e) || 69 === t.charCodeAt(e));
                for (e++, 45 !== t.charCodeAt(e) && 43 !== t.charCodeAt(e) || e++, p(r); N(t.charCodeAt(e));) e++;
            if (e > r) return n(t.slice(r, e));
        }

        function d() {
            if (44 !== t.charCodeAt(e)) throw new SyntaxError("Comma ',' expected after value ".concat(R()));
            e++
        }

        function y() {
            if (58 !== t.charCodeAt(e)) throw new SyntaxError("Colon ':' expected after property name ".concat(R()));
            e++
        }

        function v(t) {
            if (void 0 === t) throw new SyntaxError("Array item expected ".concat(R()));
        }

        function p(r) {
            if (!N(t.charCodeAt(e))) {
                var n = t.slice(r, e);
                throw new SyntaxError("Invalid number '".concat(n, "', expecting a digit ").concat(R()));
            }
        }

        function h() {
            throw new SyntaxError("Quoted object key expected ".concat(R()));
        }

        function b(t) {
            throw new SyntaxError("Duplicate key '".concat(t, "' encountered at position ").concat(e - t.length - 1));
        }

        function w(t) {
            throw new SyntaxError("Invalid character '".concat(t, "' ").concat(I()));
        }

        function S(r) {
            var n = t.slice(r, r + 2);
            throw new SyntaxError("Invalid escape character '".concat(n, "' ").concat(I()));
        }

        function j(r) {
            for (var n = r + 2;
                /\w/.test(t[n]);) n++;
            var e = t.slice(r, n);
            throw new SyntaxError("Invalid unicode character '".concat(e, "' ").concat(I()));
        }

        function I() {
            return "at position ".concat(e);
        }

        function R() {
            return (e < t.length ? "but got '".concat(t[e], "'") : "but reached end of input") + " " + I();
        }
    }, t.parseLosslessNumber = m, t.parseNumberAndBigInt = function (t) {
        return r(t) ? BigInt(t) : parseFloat(t);
    }, t.reviveDate = function (t, r) {
        return "string" == typeof r && B.test(r) ? new Date(r) : r
    }, t.stringify = function t(r, n, o, a) {
        var i = function (t) {
            return "number" == typeof t ? " ".repeat(t) : "string" == typeof t && "" !== t ? t : void 0
        }(o);
        return function r(c, u) {
            if (Array.isArray(a)) {
                var f = a.find((function (t) {
                    return t.test(c);
                }));
                if (f) {
                    var l = f.stringify(c);
                    if ("string" != typeof l || !e(l)) throw new Error("Invalid JSON number: output of a number stringifier must be a string containing a JSON number " + "(output: ".concat(l, ")"));
                    return l
                }
            }
            return "boolean" == typeof c || "number" == typeof c || "string" == typeof c || null === c || c instanceof Date || c instanceof Boolean || c instanceof Number || c instanceof String ? JSON.stringify(c) : c && c.isLosslessNumber || "bigint" == typeof c ? c.toString() : Array.isArray(c) ? function (t, e) {
                if (0 === t.length) return "[]";
                for (var o = i ? e + i : void 0, a = i ? "[\n" : "[", c = 0; c < t.length; c++) {
                    var u = "function" == typeof n ? n.call(t, String(c), t[c]) : t[c];
                    i && (a += o), a += void 0 !== u && "function" != typeof u ? r(u, o) : "null", c < t.length - 1 && (a += i ? ",\n" : ",");
                }
                return a + (i ? "\n" + e + "]" : "]");
            }(c, u) : c && "object" === $(c) ? function (e, a) {
                if ("function" == typeof e.toJSON) return t(e.toJSON(), n, o, void 0);
                var c = Array.isArray(n) ? n.map(String) : Object.keys(e);
                if (0 === c.length) return "{}";
                var u = i ? a + i : void 0,
                    f = !0,
                    l = i ? "{\n" : "{";
                return c.forEach((function (t) {
                    var o = "function" == typeof n ? n.call(e, t, e[t]) : e[t];
                    if (function (t, r) {
                        return void 0 !== r && "function" != typeof r && "symbol" !== $(r);
                    }(0, o)) {
                        f ? f = !1 : l += i ? ",\n" : ",";
                        var a = JSON.stringify(t);
                        l += i ? u + a + ": " : a + ":", l += r(o, u);
                    }
                })), l += i ? "\n" + a + "}" : "}"
            }(c, u) : void 0
        }("function" == typeof n ? n.call({
            "": r
        }, "", r) : r, "");
    }, t.toLosslessNumber = function (t) {
        if (u(t + "").length > 15) throw new Error("Invalid number: contains more than 15 digits and is most likely truncated and unsafe by itself " + "(value: ".concat(t, ")"));
        if (isNaN(t)) throw new Error("Invalid number: NaN");
        if (!isFinite(t)) throw new Error("Invalid number: " + t);
        return new h(String(t));
    }, t.toSafeNumberOrThrow = function (r, n) {
        var e = parseFloat(r),
            o = c(r);
        if (!0 === (null == n ? void 0 : n.approx) ? o && o !== t.UnsafeNumberReason.truncate_float : o) {
            var a = o.replace(/_\w+$/, "");
            throw new Error("Cannot safely convert to number: " + "the value '".concat(r, "' would ").concat(a, " and become ").concat(e));
        }
        return e
    }
}));