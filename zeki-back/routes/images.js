var express = require('express');
const path = require('path');
const fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/random', function (req, res, next) {
    const imagePath = path.join(__dirname, '../public/images');
    const imageFiles = fs.readdirSync(imagePath);

    // Choix aléatoire d'une image
    const randomIndex = randomNotIn(imageFiles.length, []);
    const randomIndex2 = randomNotIn(imageFiles.length, [randomIndex]);
    const randomIndex3 = randomNotIn(imageFiles.length, [randomIndex, randomIndex2]);
    const randomIndex4 = randomNotIn(imageFiles.length, [randomIndex, randomIndex2, randomIndex3]);
    const randomImage = imageFiles[randomIndex];
    const badRandomImage2 = imageFiles[randomIndex2];
    const badRandomImage3 = imageFiles[randomIndex3];
    const badRandomImage4 = imageFiles[randomIndex4];

// Envoi de l'image
    const parsedFile = parseFile(randomImage);
    const parsedFile2 = parseFile(badRandomImage2);
    const parsedFile3 = parseFile(badRandomImage3);
    const parsedFile4 = parseFile(badRandomImage4);
    const imageUrls = {
        url: `${req.protocol}://${req.get('host')}/images/${randomImage}`,
        ...parsedFile,
        badRandomImages: [
            parsedFile2,
            parsedFile3,
            parsedFile4
        ]
    }
    res.json(imageUrls);
});

router.get('/all', function (req, res, next) {
    const imagePath = path.join(__dirname, '../public/images');
    const imageFiles = fs.readdirSync(imagePath);
    // Envoi de l'image
    const imageUrls = imageFiles.map((fileName) => {
        const parsedFile = fileName.split("_");
        const name = parsedFile[0];
        const surname = parsedFile[1];
        const location = parsedFile[2].split(".")[0];
        return {
            url: `${req.protocol}://${req.get('host')}/images/${fileName}`,
            name: name,
            surname: surname,
            location: location
        }
    });
    res.json(imageUrls);
});

function randomNotIn(length, alreadyExist) {
    let random;
    while (!alreadyExist.includes(random = Math.floor(Math.random() * length))) {

    }
    return random;
}

function parseFile(randomImage) {
    const parsedFile = randomImage.split("_");
    const name = parsedFile[0];
    const surname = parsedFile[1];
    const location = parsedFile[2].split(".")[0];
    return {
        name,
        surname,
        location
    };
}

module.exports = router;
