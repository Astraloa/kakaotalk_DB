module.exports = /** @class */ (function () {
    let DB = require("./main");

    function DatabaseChat(event) {
        this.botID = require("./getUserId")(DB()[1]);
        this.data = {
            event: event
        } // chat, modify_profile
    }

    DatabaseChat.prototype.getChannelById = (chatId) => require("./channel")(DB(), chatId, this.botID);
    DatabaseChat.prototype.getUserById = (userId) => require("./user")(DB(), userId, this.botID);
    DatabaseChat.prototype.getChatById = (logId) => require("./chat")(DB(), this.botID, logId);
    DatabaseChat.prototype.getChatStacks = () => {
        return this.getChatById({});
    };
    DatabaseChat.prototype.getJSON = function () {
        return Object.create(this.getChatById());
    }

    return DatabaseChat;
})();