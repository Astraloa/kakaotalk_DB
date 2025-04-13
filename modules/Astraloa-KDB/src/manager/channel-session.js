module.exports = (function () {
    function channelSession(chat_id, steam) {
        this.id = chat_id;
        Object.defineProperty(this, 'db2', {
            value: steam.db2,
            writable: false
        });
        Object.defineProperty(this, 'db', {
            value: steam.db,
            writable: false
        });
    }
    channelSession.prototype.dev = '개발중..';
    channelSession.create = function (chat_id, steam) {
        return new this(chat_id, steam);
    }

    return channelSession;
})();