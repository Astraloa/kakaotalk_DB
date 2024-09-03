let chatError = require("./../../error")("chatError");
let AutoParse = require("../../AutoParse");
let decrypt = require("./../../decrypt");
var DB = require("../Astraloa");

let getChannelById = require("./../channel");
let getUserById = require("./../user");

let botId;

function getChat(botID, logId) {
    botId = botID; // get next/prev 에 쓰일 botId 저장용
    let db = DB.getDB1();
    let chatCursor = logId ? db.rawQuery("SELECT * FROM chat_logs WHERE id = ? LIMIT 1", [logId]) : db.rawQuery("SELECT * FROM chat_logs ORDER BY created_at DESC LIMIT 1", null);
    if (chatCursor.moveToFirst()) {
        try {
            for (let key of cursor.getColumnNames()) {
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

    this.isReply = () => {
        return false;
    }

    if (this.chat_id) {
        this.channel = getChannelById(this.chat_id, botID);
        delete this.chat_id;
    }
    if (this.user_id) {
        this.user = getUserById(this.user_id, botID);
        delete this.user_id;
    }

    if (this.attachment) if (this.attachment['src_logId']) {
        this.isReply = () => {
            return true;
        };
        this.source = new getChat(botID, chat.attachment['src_logId']);
    }
}

getChat.prototype.getPrevChat = function (n) {
    n = n || 1;
    const chatId = this.channel.id;
    const currentId = this['_id'];

    let prevCursor = db.rawQuery("SELECT _id, id FROM chat_logs WHERE chat_id = ? AND _id <= ? ORDER BY _id DESC", [chatId, currentId]);

    if (!prevCursor.moveToFirst()) throw new chatError("Cannot find Chat Log!");

    if (!prevCursor.moveToPosition(n)) throw new RangeError("Cannot find Prev Chat Log!");
    let prevId = prevCursor.getString(1);
    prevCursor.close();

    return new getChat(botId, prevId);
};

getChat.prototype.getNextChat = function (n) {
    n = n || 1;
    const chatId = this.channel.id;
    const currentId = this['_id'];

    let nextCursor = db.rawQuery("SELECT _id, id FROM chat_logs WHERE chat_id = ? AND _id >= ? ORDER BY _id DESC", [chatId, currentId]);

    if (!nextCursor.moveToFirst()) throw new chatError("Cannot find Chat Log!");

    if (!nextCursor.moveToPosition(n)) throw new chatError("Cannot find Next Chat Log!");
    let nextId = nextCursor.getString(1);
    nextCursor.close();

    return dbGet(botId, nextId);
};

getChat.prototype.getMaxPrevCount = function () {
    const chatId = this.channel.id;
    const currentId = this['_id'];

    let prevCursor = db.rawQuery("SELECT _id, id FROM chat_logs WHERE chat_id = ? AND _id <= ? ORDER BY _id DESC", [chatId, currentId]);

    if (!prevCursor.moveToFirst()) throw new RangeError("Cannot find Chat Log!");
    let count = prevCursor.getCount() - 1;
    return prevCursor.close(), count;
}

getChat.prototype.getMaxNextCount = function () {
    const chatId = this.channel.id;
    const currentId = this['_id'];

    let nextCursor = db.rawQuery("SELECT _id, id FROM chat_logs WHERE chat_id = ? AND _id >= ? ORDER BY _id DESC", [chatId, currentId]);

    if (!nextCursor.moveToFirst()) throw new chatError("Cannot find Chat Log!");
    let count = nextCursor.getCount() - 1;
    return nextCursor.close(), count;
}

module.exports = (botID, logId) => {
    return new getChat(botID, logId);
};