let events = {};
let Observer = require("./observer");
let DatabaseWatcher;

let chatDB = require("./database");

function on(event, callback) {
    events[event] = callback;
}

function start() {
    DatabaseWatcher = new Observer("/data/data/com.kakao.talk/databases/KakaoTalk.db", () => {
        events['chat'](new chatDB('chat').getJSON());
    });
    return DatabaseWatcher.start();
}

function stop() {
    if(DatabaseWatcher) {
        return DatabaseWatcher.stop();
    }
}

module.exports = {
    on: on,
    start: start,
    stop: stop
};