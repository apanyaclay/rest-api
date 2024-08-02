const {User} = require('../models/user'); // Import model User
const bcrypt = require('bcrypt');
const saltRounds = 10; // Jumlah rounds untuk bcrypt

exports.create = async function (req, res, next) {
  try {
    // Mengambil data dari request body
    const { name, email, password } = req.body;

    // Hashing kata sandi
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Membuat pengguna baru
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword // Simpan kata sandi yang telah di-hash
    });

    // Mengembalikan respons berhasil
    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
        // Jangan mengembalikan kata sandi ke klien
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    // Menangani error
    res.status(500).json({
      message: 'An error occurred while creating the user',
      error: error.message
    });
  }
};
