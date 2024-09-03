module.exports = /** @class */ (function () {
    let DB = require("./Astraloa");
    let supportEvent = ["chat"];

    function DatabaseChat (event) {
        DB.refresh();
        let db2 = DB.getDB2();
        this.botID = require("./getUserId")(db2);
        this.data = {
            event: event
        } // chat, profile_modify
    }

    DatabaseChat.prototype.getChannelById = require("./channel");
    DatabaseChat.prototype.getUserById = require("./user");
    DatabaseChat.prototype.getChatById = require("./chat");
    DatabaseChat.prototype.getJSON = function () {
        if(!supportEvent.includes(this.data.event)) return Object.create({
            message: "Not Support Event"
        });
        DB.refresh();
        if(this.data.event == "chat") {
            return Object.create(this.getChatById(this.botID));
        }
    }

    return DatabaseChat;
})();