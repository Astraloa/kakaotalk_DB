module.exports = /** @class */ (function () {
    function DatabaseChat (event, config) {
        this.data = {
            event: event,
            config: config
        }
    }

    DatabaseChat.prototype.getJSON = function () {}

    return DatabaseChat;
})();