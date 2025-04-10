module.exports = (function () {
    function chatSession(_raw, userKey) {
        this.raw = _raw;
        this.userKey = userKey;
    }
    chatSession.create = function (data, userKey) {
        return new this(data, userKey);
    }
    return chatSession;
})();