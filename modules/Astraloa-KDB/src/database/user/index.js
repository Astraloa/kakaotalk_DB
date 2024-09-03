let userError = require("./../../error")("userError");
let AutoParse = require("../../AutoParse");
let decrypt = require("./../../decrypt");
var DB = require("../Astraloa");

function getUserById(userId, botID) {
    let db2 = DB.getDB2();
    let userCursor = db2.rawQuery("SELECT * FROM friends WHERE id=? ORDER BY _id LIMIT 1", [userId]);
    if (userCursor.moveToFirst()) {
        try {
            for (let key of cursor.getColumnNames()) {
                let idx = userCursor.getColumnIndex(key);
                let type = userCursor.getType(idx);

                if (!type) {
                    user[key] = null;
                } else if (type == 1 || type == 2) {
                    user[key] = Number(userCursor.getString(idx));
                } else if (type == 3) {
                    user[key] = userCursor.getString(idx);
                } else if (type == 4) {
                    user[key] = userCursor.getBlob(idx);
                }
            }
        } catch (err) {
            userCursor.close();
            throw new userError("caught UnException Error while create user Object:\n  - " + err);
        }
    } else {
        userCursor.close();
        throw new userError("cannot find user with this userId: " + chatId);
    }
    let userEncryptKey = ["name", "phonetic_name", "profile_image_url", "full_profile_image_url", "original_profile_image_url", "status_message", "v", "board_v", "nick_name"];
    userEncryptKey.forEach(key => {
        if (user[key]) try {
            user[key] = decrypt(botID, 31, user[key]);
        } catch (err) { }
    });
    user = AutoParse(user);
    return user;
}

module.exports = getUserById;