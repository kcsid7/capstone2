const { BadRequestError } = require("../expressError");



function sqlPartialUpdate(data, sql) {
    const keys = Object.keys(data);
    if (keys.length === 0) throw new BadRequestError();

    const newKeys = keys.map((c, i) => {
        return `"${sql[c] || c}"=$${i + 1}`
    });

    return {
        cols: newKeys.join(","),
        values: Object.values(data)
    }
}

module.exports = {sqlPartialUpdate};