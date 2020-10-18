const getImageBuffer = require(__dirname + "/get-image-buffer");

const generateCurrentTimeImageBuffer = (time) => {  // 12.0, 60.0, 60.0
    return new Promise((resolve, reject) => {
        let binaryTime = [
            ("0000" + time[0].toString(2)).slice(-4),
            ("000000" + time[1].toString(2)).slice(-6),
            ("000000" + time[2].toString(2)).slice(-6),
            ("0" + time[3].toString(2)).slice(-1)
        ];
        let hourBitArray = [];
        for (let i = 0; i < 4; i++) {
            hourBitArray[i] = parseInt(binaryTime[0].charAt(i)) * 255;
        }
        let minuteBitArray = [];
        for (let i = 0; i < 6; i++) {
            minuteBitArray[i] = parseInt(binaryTime[0].charAt(i)) * 255;
        }
        let secondBitArray = [];
        for (let i = 0; i < 6; i++) {
            secondBitArray[i] = parseInt(binaryTime[0].charAt(i)) * 255;
        }
        ampm = parseInt(binaryTime[3].charAt(0)) * 255;

        getImageBuffer.getImageBuffer([
            [[hourBitArray[0], hourBitArray[1], hourBitArray[2]], [hourBitArray[3], 0, ampm]],
            [[minuteBitArray[0], minuteBitArray[1], minuteBitArray[2]], [minuteBitArray[3], minuteBitArray[4], minuteBitArray[5]]],
            [[secondBitArray[0], secondBitArray[1], secondBitArray[2]], [secondBitArray[3], secondBitArray[4], minuteBitArray[5]]],
        ], 3, 2, 6, 6).then(buffer => {
            resolve(buffer);
        });
    });
};

const generateCurrentMoonAgeImageBuffer = (moonAge) => {
    return new Promise((resolve, reject) => {
        let binaryMoonAge = ("000000000" + moonAge.toString(2)).slice(-9);
        let moonBitArray = [];
        for (let i = 0; i < 9; i++) {
            moonBitArray[i] = parseInt(binaryMoonAge.charAt(i)) * 255;
        }

        getImageBuffer.getImageBuffer([
            [[moonBitArray[0], moonBitArray[1], moonBitArray[2]]],
            [[moonBitArray[3], moonBitArray[4], moonBitArray[4]]],
            [[moonBitArray[5], moonBitArray[6], moonBitArray[7]]],
        ], 3, 1, 12, 12).then(buffer => {
            resolve(buffer);
        });
    });
};

const generateCurrentTimeSkyboxImageBuffer = (moonAge, sunSign, sunAltitude, sunAzimuth, moonSign, moonAltitude, moonAzimuth, time) => {  // 9 10 12 10 12 4+1 6 6 = 70
    return new Promise((resolve, reject) => {
        let binaryMoonAge = ("000000000" + moonAge.toString(2)).slice(-9);
        let moonAgeBitArray = [];
        for (let i = 0; i < 9; i++) {
            moonAgeBitArray[i] = parseInt(binaryMoonAge.charAt(i)) * 255;
        }
        let binarySunAltitude = ("0000000000" + sunAltitude.toString(2)).slice(-10);
        let sunAltitudeBitArray = [];
        for (let i = 0; i < 10; i++) {
            sunAltitudeBitArray[i] = parseInt(binarySunAltitude.charAt(i)) * 255;
        }
        let binarySunAzimuth = ("000000000000" + sunAzimuth.toString(2)).slice(-12);
        let sunAzimuthBitArray = [];
        for (let i = 0; i < 12; i++) {
            sunAzimuthBitArray[i] = parseInt(binarySunAzimuth.charAt(i)) * 255;
        }
        let binaryMoonAltitude = ("0000000000" + moonAltitude.toString(2)).slice(-10);
        let moonAltitudeBitArray = [];
        for (let i = 0; i < 10; i++) {
            moonAltitudeBitArray[i] = parseInt(binaryMoonAltitude.charAt(i)) * 255;
        }
        let binaryMoonAzimuth = ("000000000000" + moonAzimuth.toString(2)).slice(-12);
        let moonAzimuthBitArray = [];
        for (let i = 0; i < 12; i++) {
            moonAzimuthBitArray[i] = parseInt(binaryMoonAzimuth.charAt(i)) * 255;
        }
        let binaryTime = [
            ("0000" + time[0].toString(2)).slice(-4),
            ("000000" + time[1].toString(2)).slice(-6),
            ("000000" + time[2].toString(2)).slice(-6),
            ("0" + time[3].toString(2)).slice(-1)
        ];
        let hourBitArray = [];
        for (let i = 0; i < 4; i++) {
            hourBitArray[i] = parseInt(binaryTime[0].charAt(i)) * 255;
        }
        let minuteBitArray = [];
        for (let i = 0; i < 6; i++) {
            minuteBitArray[i] = parseInt(binaryTime[0].charAt(i)) * 255;
        }
        let secondBitArray = [];
        for (let i = 0; i < 6; i++) {
            secondBitArray[i] = parseInt(binaryTime[0].charAt(i)) * 255;
        }
        ampm = parseInt(binaryTime[3].charAt(0)) * 255;

        getImageBuffer.getImageBuffer([
            [[moonAgeBitArray[0], moonAgeBitArray[1], moonAgeBitArray[2]],
            [moonAgeBitArray[3], moonAgeBitArray[4], moonAgeBitArray[5]],
            [moonAgeBitArray[6], moonAgeBitArray[7], moonAgeBitArray[8]],
            [sunSign, sunAltitudeBitArray[0], sunAltitudeBitArray[1]],
            [sunAltitudeBitArray[2], sunAltitudeBitArray[3], sunAltitudeBitArray[4]]],
            [[sunAltitudeBitArray[5], sunAltitudeBitArray[6], sunAltitudeBitArray[7]],
            [sunAltitudeBitArray[8], sunAltitudeBitArray[9], sunAzimuthBitArray[0]],
            [sunAzimuthBitArray[1], sunAzimuthBitArray[2], sunAzimuthBitArray[3]],
            [sunAzimuthBitArray[4], sunAzimuthBitArray[5], sunAzimuthBitArray[6]],
            [sunAzimuthBitArray[7], sunAzimuthBitArray[8], sunAzimuthBitArray[9]]],
            [[sunAzimuthBitArray[10], sunAzimuthBitArray[11], moonSign],
            [moonAltitudeBitArray[0], moonAltitudeBitArray[1], moonAltitudeBitArray[2]],
            [moonAltitudeBitArray[3], moonAltitudeBitArray[4], moonAltitudeBitArray[5]],
            [moonAltitudeBitArray[6], moonAltitudeBitArray[7], moonAltitudeBitArray[8]],
            [moonAltitudeBitArray[9], moonAzimuthBitArray[0], moonAzimuthBitArray[1]]],
            [[moonAzimuthBitArray[2], moonAzimuthBitArray[3], moonAzimuthBitArray[4]],
            [moonAzimuthBitArray[5], moonAzimuthBitArray[6], moonAzimuthBitArray[7]],
            [moonAzimuthBitArray[8], moonAzimuthBitArray[9], moonAzimuthBitArray[10]],
            [moonAzimuthBitArray[11], hourBitArray[0], hourBitArray[1]],
            [hourBitArray[2], hourBitArray[3], ampm]],
            [[minuteBitArray[0], minuteBitArray[1], minuteBitArray[2]],
            [minuteBitArray[3], minuteBitArray[4], minuteBitArray[5]],
            [secondBitArray[0], secondBitArray[1], secondBitArray[2]],
            [secondBitArray[3], secondBitArray[4], minuteBitArray[5]],
            [0, 0, 0]],
        ], 5, 5, 10, 10).then(buffer => {
            resolve(buffer);
        });
    });
};

module.exports = {
    generateCurrentTimeImageBuffer: generateCurrentTimeImageBuffer,
    generateCurrentMoonAgeImageBuffer: generateCurrentMoonAgeImageBuffer,
    generateCurrentTimeSkyboxImageBuffer: generateCurrentTimeSkyboxImageBuffer,
}

