const ChatSession = require('./chat-session');
exports['create'] = function (cursor, steam) {
    let data = {};
    for (let key of cursor.getColumnNames()) {
        let idx = cursor.getColumnIndex(key);
        let type = cursor.getType(idx);
        if (!type) {
            data[key] = null;
        } else if (type == 1 || type == 2) {
            data[key] = Number(cursor.getString(idx));
        } else if (type == 3) {
            data[key] = cursor.getString(idx);
        } else if (type == 4) {
            data[key] = cursor.getBlob(idx);
        }
    }
    return ChatSession.create(data, steam);
}