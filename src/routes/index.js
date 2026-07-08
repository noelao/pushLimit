const express = require('express');
const router = express.Router();



router.get('/', (req, res) => {
    res.render('pages/home', { title: 'Beranda' });
});


const apiRoutes = require('./api');
router.use('/api', apiRoutes);


module.exports = router; // Pastikan index.js juga memiliki ini di baris terbawah!