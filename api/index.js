const express = require('express');
const router = express.Router();
const app = express();
const fs = require('fs');

router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request);
    Object.setPrototypeOf(res, app.response);
    req.res = res;
    res.req = req;
    next();
});

router.post('/set-pairs', (req, res) => {
    saveDataToFile('pairs.json', JSON.stringify(req.body));
    res.status(200).json({
        message: 'success'
    });
});

router.post('/set-rates', (req, res) => {
    saveDataToFile('rates.json', JSON.stringify(req.body));
    res.status(200).json({
        message: 'success'
    });
});

router.get('/get-pairs', (req, res) => {
    res.status(200).json( JSON.parse(readDataFromFile('pairs.json') ) );
});

router.get('/get-rates', (req, res) => {
    res.status(200).json( JSON.parse(readDataFromFile('rates.json') ) );
});

function saveDataToFile(fileName, data) {
    fs.writeFile(`api/${fileName}`, data, err => {
        if (err) {
            console.error(err);
            return;
        }
    });
}

function readDataFromFile(fileName) {
    return fs.readFileSync(`api/${fileName}`, 'utf8');
}

module.exports = {
    path: '/api',
    handler: router
};