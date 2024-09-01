module.exports = function setting(name) {
    let errorName = name;
    return function (message, lineNumber) {
        let err;
        try{
            eval('{');
        }catch (e) {
            err = e;
        }
        err.name = errorName;
        err.message = message;
        err.lineNumber = lineNumber || 0;
    }
}