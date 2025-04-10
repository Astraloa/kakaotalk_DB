let db;
let db2;

let { SQLiteDatabase } = android.database.sqlite;

function open(dbDir) {
    dbDir = dbDir || "/data/data/com.kakao.talk/databases/";
    db = SQLiteDatabase.openDatabase(dbDir + "KakaoTalk.db", null, android.database.sqlite.SQLiteDatabase.CREATE_IF_NECESSARY | android.database.sqlite.SQLiteDatabase.ENABLE_WRITE_AHEAD_LOGGING);
    db2 = SQLiteDatabase.openDatabase(dbDir + "KakaoTalk2.db", null, android.database.sqlite.SQLiteDatabase.CREATE_IF_NECESSARY | android.database.sqlite.SQLiteDatabase.ENABLE_WRITE_AHEAD_LOGGING);
}

module.exports = function () {
    return open(), [db, db2];
}