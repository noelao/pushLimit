const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    const currentTheme = req.cookies.theme || 'light';
    res.render('pages/home', { 
        title: 'Push Limit',
        theme: currentTheme
    });
});


const apiRoutes = require('./api');
router.use('/api', apiRoutes);


module.exports = router; // Pastikan index.js juga memiliki ini di baris terbawah!