
const app = require("./index.js");
const {PORT} = require("./config.js");

app.listen(PORT, function() {
    console.log(`Alive on http://localhost:${PORT}`)
})