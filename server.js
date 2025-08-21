const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const visitorRoutes = require('./routes/visitors');
const db = require('./db'); 
const app = express();
const PORT = 3000;
const multer = require('multer');
const path = require('path');

app.get('/', (req, res) => {
  res.send('Backend is up and running!');
});
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`🔄 ${req.method} ${req.url}`);
  next();
});
app.use('/api/auth', authRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/uploads', express.static('uploads'));

///////////////////////////multer/////////////////////////////////////////////////












db.query('SELECT * FROM user', (err, res) => {
  if (err) console.log('❌ Error from DB:', err);
  else console.log('✅ DB is working');
});


app.use((err, req, res, next) => {
  console.error('🔥 Global Error:', err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});




