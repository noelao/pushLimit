const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname); 
const outputFile = path.join(__dirname, 'data.json');

const imageExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'];

// 1. Fungsi Rekursif untuk membaca file sampai ke sub-folder terdalam
function getFilesRecursively(directory) {
  let files = [];
  const items = fs.readdirSync(directory, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(directory, item.name);
    
    if (item.isDirectory()) {
      files = files.concat(getFilesRecursively(fullPath));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

try {
  const allFiles = getFilesRecursively(baseDir);
  let idCounter = 1;

  // 2. Filter dan petakan data dasar file gambar
  const photosData = allFiles
    .filter(file => {
      const ext = path.extname(file).toLowerCase();
      return imageExtensions.includes(ext);
    })
    .map(file => {
      // Memastikan path menggunakan '/' agar aman untuk web
      const relativePath = path.relative(baseDir, file).split(path.sep).join('/');
      return {
        id: idCounter++,
        filename: path.basename(file),
        extension: path.extname(file).toLowerCase(),
        webPath: `/troops/${relativePath}`,
        relativePath: relativePath 
      };
    });

  // 3. Mengelompokkan data bersarang (Nested Object) berdasarkan nama folder
  const nestedData = {};

  photosData.forEach(photo => {
    // Pisahkan path menjadi array. Contoh: 'hero/pets/fox.png' menjadi ['hero', 'pets']
    const folders = photo.relativePath.split('/');
    folders.pop(); // Buang nama file dari array, sisakan nama foldernya saja

    let currentLevel = nestedData;

    // Iterasi untuk membuat cabang folder di dalam objek JSON
    folders.forEach(folder => {
      if (!currentLevel[folder]) {
        currentLevel[folder] = {}; // Buat objek baru jika foldernya belum ada
      }
      // Masuk ke level folder selanjutnya
      currentLevel = currentLevel[folder];
    });

    // Masukkan data foto ke dalam array 'items' di dalam folder terdalam
    // Menggunakan key 'items' agar data foto tidak bentrok dengan nama sub-folder
    if (!currentLevel.items) {
      currentLevel.items = [];
    }
    currentLevel.items.push(photo);
  });

  // 4. Tulis hasil akhir ke data.json
  fs.writeFileSync(outputFile, JSON.stringify(nestedData, null, 2), 'utf-8');

  console.log(`✅ Berhasil memetakan dan mengelompokkan ${photosData.length} foto!`);
  console.log(`📁 File JSON tersimpan di: ${outputFile}`);

} catch (error) {
  console.error('❌ Terjadi kesalahan:', error.message);
}