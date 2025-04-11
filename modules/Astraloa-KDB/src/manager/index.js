module.exports = (function () {
    function chatSession(_raw, steam) {
        Object.defineProperty(this, 'raw', {
            value: _raw,
            writable: false
        });
        Object.defineProperty(this, 'userKey', {
            value: steam.userKey,
            writable: false
        });
        Object.defineProperty(this, 'db2', {
            value: steam.db2,
            writable: false
        });
        Object.defineProperty(this, 'db', {
            value: steam.db,
            writable: false
        });
    }
    chatSession.prototype.toJSON = function () {
        return this;
    }
    chatSession.create = function (data, steam) {
        return new this(data, steam);
    }
    return chatSession;
})();