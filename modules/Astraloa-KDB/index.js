let Listener = require("./src/index");

function getInstance (config) {
    config = config || {};
    let packageName = config.packageName || "com.kakao.talk";
    let reactByMine = config.reactByMine || false;

    return Listener(packageName, reactByMine);
}

module.exports = getInstance;