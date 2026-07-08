const fs = require('fs').promises;
const path = require('path');

const express = require('express');
const api = express.Router();



api.get('/', async (req, res) => {
    try {
        const filePath = path.join(__dirname, '..', '..', 'data', 'semua.json');
        const rawData = await fs.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(rawData);
        res.send(jsonData);
    } catch(err){
        console.error("Error membaca data:", err);
        res.status(500).send('Gagal mengambil data JSON');
    }
});

// search
api.get('/:query', async (req, res) => {
    try {
        // 1. Ambil keyword dari parameter URL dan jadikan huruf kecil
        // Karena route menggunakan /:query, gunakan req.params
        const keyword = req.params.query.toLowerCase();
        
        // 2. Baca dan parse file JSON
        const filePath = path.join(__dirname, '..', '..', 'data', 'semua.json');
        const rawData = await fs.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(rawData);
        
        // 3. Lakukan filter pada data JSON
        const filteredData = jsonData.filter((item) => {
            // Gunakan opsional chaining (?.) untuk mencegah error jika ada data yang null/undefined
            const matchName = item.name?.toLowerCase().includes(keyword);
            const matchQuery = item.query?.toLowerCase().includes(keyword);
            const matchKategori = item.kategori?.toLowerCase().includes(keyword);
            const matchUploader = item.uploader?.nama?.toLowerCase().includes(keyword);

            // Return true jika keyword cocok dengan salah satu field di atas
            return matchName || matchQuery || matchKategori || matchUploader;
        });

        // 4. Kirimkan data yang HANYA lolos filter
        res.send(filteredData);

    } catch(err){
        console.error("Error membaca data:", err);
        res.status(500).send('Gagal mengambil data JSON');
    }
});


module.exports = api;


// 
// api.get('/:th/:kategori/:urutkan', async (req, res) => {
//         console.log("terpanggil")
//         try {

//             const th = req.params.th;
//             const kategori = req.params.kategori;
//             const urutan = req.params.urutkan;

//             const filePath = path.join(__dirname,'..', '..', 'data', `th${th}.json`);
            
//             const rawData = await fs.readFile(filePath, 'utf-8');
            
//             const jsonData = JSON.parse(rawData);

//             const typeBase = jsonData.find(item => item.kategori === kategori);
//         if (typeBase) {
//             if(urutan == 0){
//                 let filterData = typeBase.data;
//                 const typeBaseFilter = filterData.sort((a, b) => b.rating - a.rating);
//                 typeBase.data = typeBaseFilter;
//                 res.json(typeBase);
//             } else if(urutan == 1){
//                 let filterData = typeBase.data;
//                 const typeBaseFilter = filterData.sort((a, b) => b.id - a.id);
//                 typeBase.data = typeBaseFilter;
//                 res.json(typeBase); 
//             } else {
//                 res.json(typeBase); 
//             }
//         } else {
//             // Kalau kategori warBase tidak ada di dalam file JSON tersebut
//             res.status(404).json({ error: 'Kategori '+kategori+' tidak ditemukan' });
//         }
//     } catch(err){
//         console.error(err);
//         res.status(500).send('Gagal mengambil json');
//     }
// });