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

function getPicturesFiles() {
    const imagePath = path.join(__dirname, '../public/images');
    return fs.readdirSync(imagePath);
}

function getProfilesFromPictures(picturesFiles) {
    return picturesFiles.map((fileName) => {
        const splitFileName = fileName.split("_");
        const name = splitFileName[0];
        const surname = splitFileName[1];
        const location = splitFileName[2].split(".")[0];
        return {
            name: name,
            surname: surname,
            location: location
        }
    });
}

router.get('/all', function (req, res, next) {
    const picturesFiles = getPicturesFiles();
    const profiles = getProfilesFromPictures(picturesFiles);
    const profilesWithUrl = profiles.map((profile) => {
        return {
            ...profile,
            url: `${req.protocol}://${req.get('host')}/images/${profile.name}_${profile.surname}_${profile.location}.jpg`
        }
    })
    res.json(profilesWithUrl);
});

router.get('/questions', function (req, res, next) {
    const picturesFiles = getPicturesFiles();
    const profiles = getProfilesFromPictures(picturesFiles);
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
    let shuffledArray = [];
    while (array.length > 0) {
        const randomIndex = Math.floor(Math.random() * array.length);
        shuffledArray.push(array[randomIndex]);
        array.splice(randomIndex, 1);
    }
    return shuffledArray;
}


function randomNotIn(length, alreadyExist) {
    let random = Math.floor(Math.random() * length);
    while (alreadyExist.includes(random)) {
        random = Math.floor(Math.random() * length);
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

function getRandomProfile() {
    const picturesFiles = getPicturesFiles();
    const profiles = getProfilesFromPictures(picturesFiles);
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
