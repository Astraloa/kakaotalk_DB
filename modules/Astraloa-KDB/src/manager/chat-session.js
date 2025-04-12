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
        this._isHidden = false;
        this._type = -1;
        var type = _raw.type;
        this._isHidden = this._type >= 16384;
        this._type = 4294950911 & type;
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
        },
        enumerable: true
    });
    Object.defineProperty(chatSession.prototype, 'text', {
        get: function () {
            return this.raw.message;
        },
        enumerable: true
    });
    Object.defineProperty(chatSession.prototype, 'id', {
        get: function () {
            return this.raw.id;
        },
        enumerable: true
    });
    Object.defineProperty(chatSession.prototype, 'type', {
        get: function () {
            return this.raw.type;
        },
        enumerable: true
    });
    Object.defineProperty(chatSession.prototype, 'attachment', {
        get: function () {
            if(this.raw.attachment instanceof org.json.JSONObject) {
                return BigJSON(
                    this.raw.attachment
                );
            }
            return this.raw.attachment;
        },
        enumerable: true
    });
    Object.defineProperty(chatSession.prototype, 'originType', {
        get: function () {
            return this._type;
        },
        enumerable: false
    });
    Object.defineProperty(chatSession.prototype, 'isHidden', {
        get: function () {
            return this._isHidden;
        },
        enumerable: false
    });
    Object.defineProperty(k.prototype, 'sendTime', {
        'get': function() {
            return new Date(1000 * Number(this.raw.created_at));
        },
        'enumerable': false
    });
    chatSession.prototype.toJSON = function () {
        return this;
    }
    chatSession.create = function (data, steam) {
        return new this(data, steam);
    }
    return chatSession;
})();