let BigJSON = require("./BigJSON");

function parser(data) {
    if (typeof data !== "object" || !(data instanceof Object) || data instanceof RegExp) {
        return data;
    }
    Object.keys(data).map(key => {
        try{
            data[key] = BigJSON.parse(data[key]);
            data[key] = parser(data[key]);
        }catch (err) {}
    });

    return data;
}

module.exports = parser;