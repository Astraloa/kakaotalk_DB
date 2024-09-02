let chatError = require("./../../error")("chatError");
let AutoParse = require("../../AutoParse");
let decrypt = require("./../../decrypt");
var DB = require("../Astraloa");

let getChannelById = require("./../channel");
let getUserById = require("./../user");

/** Need Convert To KakaoTalk Class + prev/next chat */

module.exports = function (botID) {
    let db = DB.getDB1();
    let chatCursor = db.rawQuery("SELECT * FROM chat_logs ORDER BY created_at DESC LIMIT 1", null);
    if (chatCursor.moveToFirst()) {
        try {
            for (let key of cursor.getColumnNames()) {
                let idx = chatCursor.getColumnIndex(key);
                let type = chatCursor.getType(idx);

                if (!type) {
                    chat[key] = null;
                } else if (type == 1 || type == 2) {
                    chat[key] = Number(chatCursor.getString(idx));
                } else if (type == 3) {
                    chat[key] = chatCursor.getString(idx);
                } else if (type == 4) {
                    chat[key] = chatCursor.getBlob(idx);
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
        if (chat[key]) try {
            chat[key] = decrypt(botID, 31, chat[key]);
        } catch (err) { }
    });
    chat = AutoParse(chat);
    
    if(chat.chat_id) {
        chat.channel = getChannelById(chat.chat_id);
        delete chat.chat_id;
    }
    if(chat.user_id) {
        chat.user = getUserById(chat.user_id);
        delete chat.user_id;
    }

    return chat;
}