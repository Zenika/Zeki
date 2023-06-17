var express = require('express');
const path = require('path');
const fs = require('fs');
var router = express.Router();

let picturesFiles = getPicturesFiles();
let profiles = getProfilesFromPictures(picturesFiles);

function getPicturesFiles() {
    const imagePath = path.join(__dirname, '../public/images');
    return fs.readdirSync(imagePath);
}

function getProfilesFromPictures(picturesFiles) {
    return picturesFiles.map(parseFile);
}

router.get('/random', function (req, res, next) {
    const randomIndices = getRandomUniqueIndices(4, picturesFiles.length);
    const randomImageUrls = randomIndices.map(index => {
        const image = picturesFiles[index];
        return {
            ...parseFile(image),
            url: `${req.protocol}://${req.get('host')}/images/${image}`
        };
    });
    res.json(randomImageUrls);
});

router.get('/all', function (req, res, next) {
    const profilesWithUrl = profiles.map(profile => {
        return {
            ...profile,
            url: `${req.protocol}://${req.get('host')}/images/${profile.name}_${profile.surname}_${profile.location}.jpg`
        }
    })
    res.json(profilesWithUrl);
});

router.get('/questions', function (req, res, next) {
    let questions = profiles.map((profile) => {
        const actualProfile = {name: profile.name, surname: profile.surname }
        const fakeProfile = getFakeProfile()
        const randomProfile1 =  getRandomProfile()
        const randomProfile2 = getRandomProfile()
        return {
            picture: `${req.protocol}://${req.get('host')}/images/${profile.name}_${profile.surname}_${profile.location}.jpg`,
            solution: actualProfile,
            answers: shuffle([
                actualProfile,
                fakeProfile,
                randomProfile1,
                randomProfile2
            ])
        }
    })
    res.json(shuffle(questions));
});

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

function parseFile(fileName) {
    const parsedFile = fileName.split("_");
    const name = parsedFile[0];
    const surname = parsedFile[1];
    const location = parsedFile[2].split(".")[0];
    return {
        name,
        surname,
        location
    };
}

function getRandomProfile() {
    const randomIndex = Math.floor(Math.random() * profiles.length);
    const randomProfile = profiles[randomIndex];
    return {
        name: randomProfile.name,
        surname: randomProfile.surname
    }
}

function getFakeProfile() {
    const randomIndex = Math.floor(Math.random() * fakeProfile.length);
    return fakeProfile[randomIndex];
}

const fakeProfile = [
    {
        "name": "Thomas",
        "surname": "Pesquet"
    },
    {
        "name": "Omar",
        "surname": "Sy"
    },
    {
        "name": "Kylian",
        "surname": "Mbappé"
    },
    {
        "name": "Kim",
        "surname": "Kardashian"
    },
    {
        "name": "Bob",
        "surname": "Léponge"
    },
    {
        "name": "Elon",
        "surname": "Musk"
    },
    {
        "name": "Maitre",
        "surname": "Gims"
    },
    {
        "name": "Pierre",
        "surname": "Niney"
    },
    {
        "name": "Jonathan",
        "surname": "Cohen"
    },
    {
        "name": "Tahar",
        "surname": "Rahim"
    },
    {
        "name": "Leïle",
        "surname": "Bekhti"
    },
    {
        "name": "Izïa",
        "surname": "Higelin"
    },
    {
        "name": "Carl",
        "surname": "Pitt"
    },
    {
        "name": "Romain",
        "surname": "Depp"
    },
    {
        "name": "Patrick",
        "surname": "Swayze"
    },
    {
        "name": "Rocky",
        "surname": "Balboa"
    },
    {
        "name": "Marion",
        "surname": "Cotillard"
    },
    {
        "name": "Eva",
        "surname": "Green"
    },
    {
        "name": "Nathalie",
        "surname": "Porteman"
    },
    {
        "name": "Tonton",
        "surname": "David"
    }
]

module.exports = router;
