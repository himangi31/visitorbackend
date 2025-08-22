const express = require('express');
const router = express.Router();
const db = require('../db');
const upload = require('../multer');


router.post('/userlogin', (req, res) => {
console.log('📊 /userlogin route hit');
@@ -158,33 +158,38 @@ router.post('/login', (req, res) => {
res.json({ success: true, message: 'Login successful' });
});
});
// POST /api/visitors/save
router.post('/save', (req, res) => {
  console.log('📊 /save route hit');
  console.log('📩 Body:', req.body);

 // POST /api/visitors/save
router.post('/save', upload.single('image'), (req, res) => {
   console.log('📊 / route hit');
   console.log('📩 Body:', req.body);
  console.log('📷 File:', req.file);

  const { name, email, phone, company, designation, program } = req.body;
  const { name, email, phone, company, designation, program, scannedText } = req.body;

  if (!name || !email || !phone || !company || !designation || !program) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  if (!name || !email || !phone || !program) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, phone, and program are required',
    });
}

  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
  const imageText = scannedText || null;

const sql = `
   INSERT INTO visitors (name, email, phone, company, designation, program, image)
   VALUES (?, ?, ?, ?, ?, ?, ?)
 `;
  const values = [name, email, phone, company, designation, program, imagePath];

  const values = [name, email, phone, company || null, designation || null, program, imageText];

db.query(sql, values, (err, result) => {
if (err) {
console.error('❌ DB Insert Error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
      return res.status(500).json({
        success: false,
        message: 'Database error',
      });
}
        

return res.status(200).json({
success: true,
message: 'Visitor saved successfully',
@@ -193,22 +198,6 @@ router.post('/save', upload.single('image'), (req, res) => {
});
});

// POST /upload
router.post('/upload', upload.single('image'), (req, res) => {
  

  console.log('Uploaded file:', req.file);

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
 

  const imageUrl = `http://198.168.10.78:3000/uploads/${req.file.filename}`;
  res.status(200).json({ success: true, imageUrl });
});



// routes/visitorRoutes.js
