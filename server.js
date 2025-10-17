require('dotenv').config(); // ← penting! load file .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// import routes (pakai path relatif)
const kampungRoutes = require('./routes/kampungRoutes');

// koneksi MongoDB Atlas dari .env
mongoose.connect(process.env.MONGO_GEO)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Connection error:', err));

// gunakan routes
app.use('/kampung', kampungRoutes);

// jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
