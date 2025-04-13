module.exports = (function () {
    function userSession(user_id, chat_id, steam) {
        this.id = user_id;
        Object.defineProperty(this, 'db2', {
            value: steam.db2,
            writable: false
        });
        Object.defineProperty(this, 'db', {
            value: steam.db,
            writable: false
        });
        Object.defineProperty(this, 'chat_id', {
            value: chat_id,
            writable: false
        });
    }
    userSession.prototype.dev = '개발중..';
    userSession.create = function (user_id, chat_id, steam) {
        return new this(user_id, chat_id, steam);
    }

    return userSession;
})();