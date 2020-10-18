const Jimp = require("jimp");

const getImageBuffer = (rgb, row, column, width, height) => {
    return new Promise((resolve, reject) => {
        let imageData = [];
        for (let i = 0; i < (width * height); i++) {
            let r = Math.floor(row * ((i / width) / height));
            let c = Math.floor(column * ((i % width) / width));
            imageData.push([rgb[r][c]]);
        }

        new Jimp({
            width: width,
            height: height,
            data: Buffer.from(imageData)
        }, (err, image) => {
                resolve(image.getBufferAsync(Jimp.MIME_JPEG));
        })
    });
}

module.exports = getImageBuffer;
