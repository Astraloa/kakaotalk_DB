module.exports = function (db2) {
    var cursor = db2.rawQuery("SELECT user_id FROM open_profile LIMIT 1", null);
    var userId;
    if (cursor.moveToFirst()) {
        userId = cursor.getString(0);
        cursor.close();
    } else {
        cursor.close();
        return null;
    }
    return userId;
}