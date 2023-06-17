var express = require('express');
const path = require('path');
const getFakeProfile = require('../fakeProfiles');
const fs = require('fs');
var router = express.Router();


let picturesFiles = getPicturesFiles();
let profiles = getProfilesFromPictures(picturesFiles);

router.get('/all', function (req, res, next) {
    const profilesWithUrl = profiles.map(profile => {
        return {
            ...profile,
            url: `${req.protocol}://${req.get('host')}/images/${profile.name}_${profile.surname}_${profile.location}.jpg`
        }
    })
    res.json(profilesWithUrl);
});

router.get('/quiz', function (req, res, next) {
    let questions = profiles.map((profile) => {
        const actualProfile = {name: profile.name, surname: profile.surname}
        const filteredProfiles = profiles.filter((p) => p.name !== profile.name && p.surname !== profile.surname);
        const fakeProfile = getFakeProfile()
        const [randomProfile1, randomProfile2] = getRandomUniqueProfiles(2, filteredProfiles)
        return {
            picture: `${req.protocol}://${req.get('host')}/images/${profile.name}_${profile.surname}_${profile.location}.jpg`,
            solution: actualProfile,
            answers: shuffle([actualProfile, fakeProfile, randomProfile1, randomProfile2])
        }
    })
    res.json(shuffle(questions));
});
function getPicturesFiles() {
    const imagePath = path.join(__dirname, '../public/images');
    return fs.readdirSync(imagePath);
}

function getProfilesFromPictures(picturesFiles) {
    return picturesFiles.map(parseFileName);
}


function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function getRandomUniqueIndices(n, max) {
    const set = new Set();
    while (set.size < n) {
        set.add(Math.floor(Math.random() * max));
    }
    return Array.from(set);
}

function parseFileName(fileName) {
    const parsedFile = fileName.split("_");
    const name = parsedFile[0];
    const surname = parsedFile[1];
    const location = parsedFile[2].split(".")[0];
    return {name, surname, location};
}

function getRandomUniqueProfiles(numberOfProfiles, profiles) {
    const uniqueIndices = getRandomUniqueIndices(numberOfProfiles, profiles.length);
    return uniqueIndices.map(index => profiles[index]);
}


module.exports = router;
