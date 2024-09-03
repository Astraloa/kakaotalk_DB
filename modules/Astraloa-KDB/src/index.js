let events = {};
let Observer = require("./observer");
let DatabaseWatcher;

let chatDB = require("./database");
let prevId;

module.exports = function (packageName, react) {
    function on(event, callback) {
        events[event] = callback;
    }

    function start() {
        DatabaseWatcher = new Observer("/data/data/" + packageName + "/databases/KakaoTalk.db", () => {
            let data = new chatDB('chat').getJSON();
            if (data.id == prevId) return;
            prevId = data.id;
            if(!react && data.v.isMine) return;
            events['chat'](data);
        });
        return DatabaseWatcher.start();
    }

    function stop() {
        if (DatabaseWatcher) {
            return DatabaseWatcher.stop();
        }
    }

    return {
        on: on,
        start: start,
        stop: stop
    };
};