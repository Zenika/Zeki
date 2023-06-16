var express = require('express');
const path = require('path');
const fs = require('fs');
var router = express.Router();

/* GET users listing. */
router.get('/random', function (req, res, next) {
    const imagePath = path.join(__dirname, '../public/images');
    const imageFiles = fs.readdirSync(imagePath);

    // Choix aléatoire d'une image
    const randomIndex = Math.floor(Math.random() * imageFiles.length);
    const randomImage = imageFiles[randomIndex];

    // Envoi de l'image
    const parsedFile = randomImage.split("_");
    const name = parsedFile[0];
    const surname = parsedFile[1];
    const location = parsedFile[2].split(".")[0];
    const imageUrls = {
        url: `${req.protocol}://${req.get('host')}/images/${randomImage}`,
        name: name,
        surname: surname,
        location: location
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

module.exports = router;
