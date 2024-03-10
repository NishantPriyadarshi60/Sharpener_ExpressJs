const express = require("express");
const path = require('path');

const rootDir = require('../utils/path');

const router = express.Router();

router.get('/contactUs', (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", 'contactUs.html'));
});


router.post('/contactUs/submit', (req, res, next) => {
    const { name, email, phone, time } = req.body;
    console.log(name)
 
    res.redirect('/success');
});

module.exports = router;