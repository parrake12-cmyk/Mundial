const db = require('./database');
const imageCatalog = require('./imageCatalog');

db.serialize(() => {
  const stmt = db.prepare('UPDATE diseases SET image_url = ? WHERE disease_code = ?');
  Object.entries(imageCatalog).forEach(([diseaseCode, imageUrl]) => {
    stmt.run(imageUrl, diseaseCode);
  });

  stmt.finalize((err) => {
    if (err) {
      console.error('Error al sincronizar imágenes:', err.message);
      process.exitCode = 1;
    } else {
      console.log(`Sincronizadas ${Object.keys(imageCatalog).length} imágenes de enfermedades.`);
    }
    db.close();
  });
});
