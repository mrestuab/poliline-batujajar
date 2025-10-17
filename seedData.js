require('dotenv').config();
const mongoose = require('mongoose');
const Kampung = require('./models/kampungModel');

// Data koordinat yang akan dimasukkan
const batujajarData = [
  {
    name: "Jalan Raya Batujajar",
    description: "Jalan utama di Desa Galanggang",
    geometry: {
      type: "LineString",
      coordinates: [
        [107.49134102907023, -6.91731863229691],
        [107.49134218871153, -6.917332136006459],
        [107.49143094597565, -6.920949989294047]
      ]
    }
  },
  {
    name: "Jl. Hegarwangi",
    description: "Jalan di Galanggang, Batujajar",
    geometry: {
      type: "LineString",
      coordinates: [
        [107.492004427933, -6.916972308637259],
        [107.4920016671904, -6.9169703171121295],
        [107.49960232121656, -6.913076278655603]
      ]
    }
  },
  {
    name: "Jalan Raya Citapen",
    description: "Jalan terdekat di area Batujajar",
    geometry: {
      type: "LineString",
      coordinates: [
        [107.4860713406533, -6.918442029885093],
        [107.48884803452152, -6.917990200192751],
        [107.49073921306605, -6.917557606355144]
      ]
    }
  }
];

async function seedDatabase() {
  try {
    // Koneksi ke MongoDB
    await mongoose.connect(process.env.MONGO_GEO);
    console.log('✅ Connected to MongoDB');

    // Hapus data lama (optional)
    await Kampung.deleteMany({});
    console.log('🗑️ Old data cleared');

    // Insert data baru
    const result = await Kampung.insertMany(batujajarData);
    console.log(`✅ ${result.length} records inserted successfully!`);
    
    // Tampilkan data yang berhasil dimasukkan
    result.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - ${item.description}`);
    });

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    // Tutup koneksi
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Jalankan fungsi
seedDatabase();