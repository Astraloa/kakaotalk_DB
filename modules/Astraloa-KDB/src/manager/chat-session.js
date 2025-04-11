module.exports = (function () {
    const BigJSON = require('../BigJSON');
    const decrypter =require('../decrypt');
    const chat_encrypted = ['message', 'attachment'];
    function chatSession(_raw, steam) {
        _raw.v = BigJSON.parse(_raw.v);
        Object.keys(_raw).forEach(key => {
            if(chat_encrypted.includes(key)) {
                _raw[key] = decrypter(_raw.user_id, _raw.v.enc, _raw[key]);
                if(key == chat_encrypted[1]) {
                    _raw[key] = _raw[key] instanceof org.json.JSONObject
                    ? BigJSON.parse(_raw[key])
                    : _raw[key];
                }
            }
        });
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
    Object.defineProperty(chatSession.prototype, 'feedType', {
        get: function () {
            if(this.raw.message instanceof org.json.JSONObject) {
                return BigJSON(
                    this.raw.message
                ).feedType;
            }
            return null;
        }
    });
    chatSession.prototype.toJSON = function () {
        return this;
    }
    chatSession.create = function (data, steam) {
        return new this(data, steam);
    }
    return chatSession;
})();