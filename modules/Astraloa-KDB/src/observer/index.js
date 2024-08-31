module.exports = /** @class */ (function () {

    /**
     * set observer
     * 
     * callback - (event, path)
     * 
     * @param {string} file_path 
     * @param {function} callback 
     */

    function Observer(file_path, callback) {
        this.path = file_path;
        this.callback = callback;
        this.observer;
    }

    /**
     * start watching
     * @returns {boolean}
     */

    Observer.prototype.start = function () {
        this.observer = new JavaAdapter(android.os.FileObserver, {
            onEvent: this.callback
        }, new java.io.File(this.path));

        return true;
    }

    /**
     * stop watching
     * @returns {boolean}
     */

    Observer.prototype.stop = function () {
        this.observer.stopWatching();

        return true;
    }

    /**
     * Obsever class
     */

    Observer.prototype.toString = (function () {
        return "[class Observer]";
    }).bind();

    return Observer;
})();