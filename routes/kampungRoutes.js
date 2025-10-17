const express = require('express');
const router = express.Router();
const Kampung = require('../models/kampungModel');

// CREATE
router.post('/', async (req, res) => {
  console.log(req.body); // cek data yang diterima
  try {
    const newData = new Kampung(req.body);
    await newData.save();
    res.json(newData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// READ ALL
router.get('/', async (req, res) => {
  const data = await Kampung.find();
  res.json(data);
});

// UPDATE
router.put('/:id', async (req, res) => {
  const updated = await Kampung.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Kampung.findByIdAndDelete(req.params.id);
  res.json({ message: 'Data deleted' });
});

module.exports = router;
