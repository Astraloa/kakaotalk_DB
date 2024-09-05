let Listener = require("./src/index");

function getInstance(config) {
    config = config || {};
    let packageName = config.packageName || "com.kakao.talk";
    let reactByMine = config.reactByMine || false;
    java.lang.Runtime.getRuntime()
        .exec(['su', '-c', 'chmod -R 777 /data/data/' + packageName])
        .waitFor();

    return Listener(packageName, reactByMine);
}

exports['getInstance'] = getInstance;