const request = require("request");
const tzlookup = require("tz-lookup");
const moment = require("moment-timezone");
const suncalc = require("suncalc");
const generateImageBuffer = require(__dirname + "/generate-image-buffer");

var cachedLats = {};
var cachedLons = {};
var cachedTzs = {};

const getBuffer = (cachedTzs, type) => {
    let time = moment().tz(cachedTzs).format("HH:mm:ss").split(":").map(x => parseInt(x));
    let date = moment().tz(cachedTzs).toDate();
    let moonAge = Math.round(suncalc.getMoonIllumination(date).phase * 30 * 10);
    let sun = SunCalc.getPosition(date, cachedLats[ip], cachedLons[ip]);
    let sunAltitude = Math.round(sun.altitude * 180 / Math.PI * 10);
    let sunAzimuth = Math.round((sun.azimuth * 180 / Math.PI + 360) % 360 * 10);
    let moon = SunCalc.getMoonPosition(date, cachedLats[ip], cachedLons[ip]);
    let moonAltitude = Math.round(moon.altitude * 180 / Math.PI * 10);
    let moonAzimuth = Math.round((moon.azimuth * 180 / Math.PI + 360) % 360 * 10);
    let ampm = "";
    if(Math.round(time[0]) < 12) {
        time[3] = 0;
            ampm = "AM";
    } else {
        time[0] -= 12;
        time[3] = 1;
        ampm = "PM";
    }
    let sunSign = 0;
    if(sunAltitude > 0) {
        sunSign = 1;
        sunAltitude = Math.abs(sunAltitude);
    }
    let moonSign = 0;
    if(moonAltitude > 0) {
        moonSign = 1;
        moonAltitude = Math.abs(moonAltitude);
    }

    console.log("Type: " + type + "\n");
    switch(type) {
        case "CurrentTime":
            return generateImageBuffer.generateCurrentTimeImageBuffer(time);
        case "CurrentTimeMoon":
            return generateImageBuffer.generateCurrentMoonAgeImageBuffer(moonAge);
        case "CurrentTimeSkybox":
            return generateImageBuffer.generateCurrentTimeSkyboxImageBuffer(moonAge, sunSign, sunAltitude, sunAzimuth, moonSign, moonAltitude, moonAzimuth, time);
        default:
            return generateImageBuffer.generateCurrentTimeImageBuffer(time);
    }
}

// Clear cache once a week
setInterval(() => {
    cachedLats = {};
    cachedLons = {};
    cachedTzs = {};
}, 1000 * 60 * 60 * 24 * 7);

const timeInImage = function(app) {
    this.onRequest = () => {};

    app.get("/:type", (req, res) => {
        this.onRequest(req);
        res.header({"Content-Type" : "image/jpg"});

        let ip = "0.0.0.0"
        if (req.headers['x-forwarded-for']) {
            ip = req.headers['x-forwarded-for'];
        } else if (req.connection && req.connection.remoteAddress) {
            ip = req.connection.remoteAddress;
        } else if (req.connection.socket && req.connection.socket.remoteAddress) {
            ip = req.connection.socket.remoteAddress;
        } else if (req.socket && req.socket.remoteAddress) {
            ip = req.socket.remoteAddress;
        }
        ip = (ip + ".").match(/(([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){4}/)[0].slice(0, -1);
        console.log("IP Address : " + ip);

        if (cachedTzs[ip]) {
            res.end(getBuffer(cachedTzs[ip], req.params.type));
        }

        request.get({
            url: "http://ip-api.com/json/" + ip,
            json: true
        }, (err, _, body) => {
            if(err) {
                console.log(err);
                return res.send();
            } try {
                console.log(body);
                cachedLats[ip] = body.lat;
                cachedLons[ip] = body.lon;
                cachedTzs[ip] = tzlookup(body.lat, body.lon);

                res.end(getBuffer(cachedTzs[ip], req.params.type));
            } catch(err) {
                console.log("--------Error--------\n", err);
                res.send();
            }
        });
    });
}

module.exports = timeInImage;
