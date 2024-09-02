let db;
let db2;

let { SQLiteDatabase } = android.database.sqlite;

function open(dbDir) {
    dbDir = dbDir || "/data/data/com.kakao.talk/databases/";
    db = SQLiteDatabase.openDatabase(dbDir + "KakaoTalk.db", null, 0);
    db2 = SQLiteDatabase.openDatabase(dbDir + "KakaoTalk2.db", null, 0);
}

module.exports = {
    refresh: open,
    getDB1: () => db,
    getDB2: () => db2,
    getDBs: () => [db, db2]
}