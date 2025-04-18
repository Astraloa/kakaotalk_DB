let chatError = require("./../../error")("chatError");
let AutoParse = require("../../AutoParse");
let decrypt = require("./../../decrypt");

let getChannelById = require("./../channel");
let getUserById = require("./../user");

let chatTable = ["_id", "id", "type", "chat_id", "user_id", "message", "attachment", "created_at", "deleted_at", "client_message_id", "prev_id", "referer", "supplement", "v"];
let botId;
let dbs;

function getChat(dbs, botID, logId) {
    botId = botID;
    dbs = dbs;
    let db = dbs[0];
    let chatCursor = logId ? db.rawQuery("SELECT " + chatTable.join(",") + " FROM chat_logs WHERE id = ? LIMIT 1", [logId]) : db.rawQuery("SELECT * FROM chat_logs ORDER BY created_at DESC LIMIT 1", null);
    if (chatCursor.moveToFirst()) {
        try {
            for (let key of chatCursor.getColumnNames()) {
                let idx = chatCursor.getColumnIndex(key);
                let type = chatCursor.getType(idx);

                if (!type) {
                    this[key] = null;
                } else if (type == 1 || type == 2) {
                    this[key] = Number(chatCursor.getString(idx));
                } else if (type == 3) {
                    this[key] = chatCursor.getString(idx);
                } else if (type == 4) {
                    this[key] = chatCursor.getBlob(idx);
                }
            }
        } catch (err) {
            chatCursor.close();
            throw new chatError("caught UnException Error while create chat Object:\n  - " + err);
        }
    } else {
        chatCursor.close();
        throw new chatError("cannot find chat logs!");
    }
    chatCursor.close();
    let chatEncryptKey = ["message", "attachment"];
    chatEncryptKey.forEach(key => {
        if (this[key]) try {
            this[key] = decrypt(botID, 31, this[key]);
        } catch (err) { }
    });
    let chatData = AutoParse(Object.create(this));
    Object.keys(chatData).forEach(key => {
        this[key] = chatData[key];
    });
    
    this.isFeed = () => {
        return false;
    }
    
    if(this.type == 0) {
        this.isFeed = () => {
            return true;
        }
    }

    this.isReply = () => {
        return false;
    }

    if (this.chat_id) {
        this.channel = getChannelById(dbs, this.chat_id, botID);
        delete this.chat_id;
    }
    if (this.user_id) {
        this.user = getUserById(dbs, this.user_id, botID);
        delete this.user_id;
    }

    if (this.attachment) if (this.attachment['src_logId']) {
        this.isReply = () => {
            return true;
        };
        this.source = new getChat(dbs, botID, chat.attachment['src_logId']);
    }
}

getChat.prototype.getPrevChat = function (n) {
    n = n || 1;
    const chatId = this.channel.id;
    const currentId = this['_id'];

    let prevCursor = dbs[0].rawQuery("SELECT _id, id FROM chat_logs WHERE chat_id = ? AND _id <= ? ORDER BY _id DESC", [chatId, currentId]);

    if (!prevCursor.moveToFirst()) throw new chatError("Cannot find Chat Log!");

    if (!prevCursor.moveToPosition(n)) throw new RangeError("Cannot find Prev Chat Log!");
    let prevId = prevCursor.getString(1);
    prevCursor.close();

    return new getChat(dbs, botId, prevId);
};

getChat.prototype.getNextChat = function (n) {
    n = n || 1;
    const chatId = this.channel.id;
    const currentId = this['_id'];

    let nextCursor = dbs[0].rawQuery("SELECT _id, id FROM chat_logs WHERE chat_id = ? AND _id >= ? ORDER BY _id DESC", [chatId, currentId]);

    if (!nextCursor.moveToFirst()) throw new chatError("Cannot find Chat Log!");

    if (!nextCursor.moveToPosition(n)) throw new chatError("Cannot find Next Chat Log!");
    let nextId = nextCursor.getString(1);
    nextCursor.close();

    return new getChat(dbs, botId, nextId);
};

getChat.prototype.getMaxPrevCount = function () {
    const chatId = this.channel.id;
    const currentId = this['_id'];

    let prevCursor = dbs[0].rawQuery("SELECT _id, id FROM chat_logs WHERE chat_id = ? AND _id <= ? ORDER BY _id DESC", [chatId, currentId]);

    if (!prevCursor.moveToFirst()) throw new RangeError("Cannot find Chat Log!");
    let count = prevCursor.getCount() - 1;
    return prevCursor.close(), count;
}

getChat.prototype.getMaxNextCount = function () {
    const chatId = this.channel.id;
    const currentId = this['_id'];

    let nextCursor = dbs[0].rawQuery("SELECT _id, id FROM chat_logs WHERE chat_id = ? AND _id >= ? ORDER BY _id DESC", [chatId, currentId]);

    if (!nextCursor.moveToFirst()) throw new chatError("Cannot find Chat Log!");
    let count = nextCursor.getCount() - 1;
    return nextCursor.close(), count;
}

module.exports = (dbs, botID, logId) => {
    if(typeof logId == 'object' && logId instanceof Object) {
        let db = dbs[0],
        stacksCursor = db.rawQuery("SELECT id FROM chat_logs ORDER BY created_at DESC LIMIT 1", []),
        logId = stacksCursor.moveToFirst() && stacksCursor.getString(0);
        return (
            stacksCursor.close(),
            logId
        );
    }
    return new getChat(dbs, botID, logId);
};
