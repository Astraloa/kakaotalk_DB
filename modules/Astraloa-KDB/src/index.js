let events = {},
    Observer = require("./observer"),
    DatabaseWatcher,
    chatDB = require("./database"),
    prevId,
    KDB = () => {
        let data = new chatDB('message').getJSON();
        if (data.id == prevId) return;
        prevId = data.id;
        try {
            switch (data.v.origin) {
                case "MSG":
                case "CHATINFO": {
                    events['message'](data);
                    break;
                }
                case "WRITE": {
                    react && events['message'](data);
                    break;
                }
                case "NEWMEM": {
                    data.isFeed() & data.message.feedType == 1 ? events['invite'](data) : events['join'](data);
                    break;
                }
                case "DELMEM": {
                    data.isFeed() & data.message.feedType == 6 ? events['kick'](data) : data.message.feedType == 2 & events['leave'](data);
                    break;
                }
                case 'SYNCDLMSG': {
                    events['delete'](data);
                    break;
                }
                case 'SYNCREWR': {
                    events['hide'](data);
                    break;
                }
                case 'SYNCMEMT': {
                    events['member_type_change'](data);
                }
            }
        } catch (err) {
            (this.console ? console.log : Log.error)((err + "\n" + (err.stack || "")).slice(0, -1))
        }
    };

module.exports = function (packageName, react) {
    function on(event, callback) {
        if (DatabaseWatcher) return;
        events[event] = callback;
    }

    function start() {
        DatabaseWatcher = new Observer("/data/data/" + packageName + "/databases/KakaoTalk.db", KDB);
        events = Object.assign({
            message: () => { },
            invite: () => { },
            join: () => { },
            kick: () => { },
            leave: () => { },
            delete: () => { },
            hide: () => { },
            member_type_change: () => { },
        }, events);
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