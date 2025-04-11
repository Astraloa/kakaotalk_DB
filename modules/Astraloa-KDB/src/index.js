module.exports = (function () {
    const Promise = require('./Promise');
    const Chat = require('./manager/chat-session');
    const myuserId = require('./manager/getUserId');
    const observer = require('./observer');

    function KDB(packageName, reactByMine) {
        this.packageName = packageName;
        this.reactByMine = reactByMine;
        this.lastID;
        this.events = {};
        this.obs = new observer('/data/data/' + this.packageName + '/databases/KakaoTalk.db', function () {
            let chats = this.getChatStack();
            let chats_count = chats.length;
            if (chats_count == 0)
                return;
            for (var Int = 0; Int < chats_count; Int++) {
                let chat = chats[Int];
                this.push(chat);
            }
        });
        this.db = android.database.sqlite.SQLiteDatabase.openDatabase('/data/data/' + this.packageName + '/databases/KakaoTalk.db', null, android.database.sqlite.SQLiteDatabase.CREATE_IF_NECESSARY | android.database.sqlite.SQLiteDatabase.ENABLE_WRITE_AHEAD_LOGGING),
            this.db2 = android.database.sqlite.SQLiteDatabase.openDatabase('/data/data/' + V.packageName + '/databases/KakaoTalk2.db', null, android.database.sqlite.SQLiteDatabase.CREATE_IF_NECESSARY);
        this.userKey = myuserId(this.db2);
    }
    KDB.prototype.on = function (event, call) {
        if (!this.events[event]) this.events[event] = [call];
        else this.events[event].push(call);
    }
    KDB.prototype.emit = function (event) {
        var args = Array.prototype.slice.call(arguments, 1);
        if (this.events[event]) {
            this.events[event].forEach(function (call) {
                new Promise(function () {
                    call.apply(null, args);
                });
            });
            return true;
        }
        return false;
    }
    KDB.prototype.push = function (chat_1) {
        var raw_v = chat_1.raw.v,
            channel_1 = chat_1.channel;
        switch (null == raw_v ? void 0 : raw_v.origin) {
            case 'MSG':
            case 'CHATINFO':
                this.emit('message', chat_1, channel_1);
                break;
            case 'NEWMEM':
                chat_1.isFeed() && (1 === chat_1.feedType ? this.emit('invite', chat_1, channel_1) : this.emit('join', chat_1, channel_1));
                break;
            case 'DELMEM':
                chat_1.isFeed() && (6 === chat_1.feedType ? this.emit('kick', chat_1, channel_1) : 2 === chat_1.feedType && this.emit('leave', chat_1, channel_1));
                break;
            case 'SYNCDLMSG':
                this.emit('delete', chat_1, channel_1);
                break;
            case 'SYNCREWR':
                this.emit('hide', chat_1, channel_1);
                break;
            case 'SYNCMEMT':
                this.emit('member_type_change', chat_1, channel_1);
        }
    }
    KDB.prototype.getChatStack = function (lastID, max) {
        void 0 === lastID && (lastID = void 0);
        void 0 === max && (max = void 0);
        lastID = lastID || '0';
        max = max || String(Number.MAX_SAFE_INTEGER);
        var query = 'SELECT * WHERE id > ? AND id <= ? ORDER BY id',
            cursor = this.db.rawQuery(query, [
                lastID,
                max
            ]),
            chats_1 = [];
        if (!cursor.moveToFirst()) {
            return cursor.close(), [];
        }
        do {
            var chat_1 = Chat.create(cursor, this);
            chats_1.push(chat_1);
        } while (cursor.moveToNext());
        return cursor.close(), chats_1;
    }
    KDB.prototype.start = function () {
        return this.obs.stop(), this.obs.start();
    }
    KDB.prototype.stop = function () {
        return this.obs.stop();
    }
    KDB.create = function (packageName, reactByMine) {
        return new this(packageName, reactByMine);
    }

    return KDB;
})();