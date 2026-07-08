// app.js
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts'); 

const app = express();

// Middleware Cookie (Wajib ditambahkan agar route bisa baca cookie)
app.use(cookieParser());

// Setup EJS & Layouts
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(expressLayouts);
app.set('layout', 'layouts/utama'); 

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Panggil Routes
const routes = require('./src/routes/index');
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});