module.exports = /** @class */ (function () {
    let DB = require("./Astraloa");

    function DatabaseChat (event, config) {
        DB.refresh();
        let db2 = DB.getDB2();
        this.botID = require("./getUserId")(db2);
        this.data = {
            event: event,
            config: config
        } // chat, profile_modify
    }

    DatabaseChat.prototype.getChannelById = require("./channel");
    DatabaseChat.prototype.getUserById = require("./user");
    DatabaseChat.prototype.getChatById = require("./chat");

    DatabaseChat.prototype.getJSON = function () {
        DB.refresh();
        if(this.data.event == "chat") {
            return this.getChatById();
        }
    }

    return DatabaseChat;
})();