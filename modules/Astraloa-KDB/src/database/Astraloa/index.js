let Astraloa = require("./main");

function refresh() {
    Astraloa.refresh();
}

module.exports = Object.assign(Astraloa, {
    refresh: refresh
});