module.exports = /** @class */ (function () {
    let DB = require("./Astraloa");

    function DatabaseChat (event) {
        DB.refresh();
        let db2 = DB.getDB2();
        this.botID = require("./getUserId")(db2);
        this.data = {
            event: event
        } // chat, modify_profile
    }

    DatabaseChat.prototype.getChannelById = (chatId) => require("./channel")(chatId, this.botID);
    DatabaseChat.prototype.getUserById = (userId) => require("./user")(userId, this.botID);
    DatabaseChat.prototype.getChatById = require("./chat");
    DatabaseChat.prototype.getChatStacks = () => DB.refresh(), this.getChatById(this.botID, {});
    DatabaseChat.prototype.getJSON = function () {
        DB.refresh();
            return Object.create(this.getChatById(this.botID));
    }

    return DatabaseChat;
})();