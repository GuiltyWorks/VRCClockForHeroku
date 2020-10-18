const port = process.env.PORT || 80;

const express = require("express");
const helmet = require("helmet");
const timeImageGenerator = require(__dirname + "/time-image-generator");

var app = express();
app.use(helmet());

var generator = new timeImageGenerator(app);
generator.onRequest = req => {
    console.log("--------Requested--------");
}

app.listen(port, () => {
    console.log("Web Server Opened At - PublicIP:" + port + "/:type\n");
});
