const express = require('express');
const router = express.Router();
const Contact = require('../model/contact');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Simple validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
