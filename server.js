// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db');

const authRoutes = require('./auth');
const registerRoutes = require('./register'); // <-- yeni

const app = express();
const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

// API rotaları
app.use('/login', authRoutes);
app.use('/register', registerRoutes); // <-- yeni

// Veritabanı bağlantısı ve sunucuyu başlat
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
});
