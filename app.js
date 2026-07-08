const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts'); // 1. Import package

const app = express();

// Setup EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// 2. Deklarasikan penggunaan express-ejs-layouts
app.use(expressLayouts);

// 3. Tentukan letak file layout default 
// (akan mencari file di src/views/layouts/main.ejs)
app.set('layout', 'layouts/utama'); 

// Serve Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const routes = require('./src/routes/index');
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});