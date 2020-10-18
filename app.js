const port = process.env.PORT || 8080;

const express = require("express");
const helmet = require("helmet");
const timeInImage = require(__dirname + "/time-in-image");

var app = express();
app.use(helmet());

var timeInImage = new timeInImage(app);
timeInImage.onRequest = req => {
    console.log("--------Requested--------");
}

app.listen(port, () => {
    console.log("Web Server Opened At - PublicIP:" + port + "/:type\n");
});
