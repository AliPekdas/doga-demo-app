// register.js
const express = require('express');
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcrypt');

// Yeni kullanıcı kaydı
router.post('/', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    // Var mı kontrol et
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists.' });
    }

    // Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // Yeni kullanıcıyı kaydet
    const newUser = new User({
      username,
      password: hashedPassword,
      role: role || 'user'
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
