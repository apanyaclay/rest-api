const validator = require("validator");

exports.register = function (req, res, next) {
  const { name, email, password } = req.body;
  const errors = [];

  // Validasi nama
  if (validator.isEmpty(name)) {
    errors.push({ message: "Name is required" });
  } else if (!validator.isLength(name, { min: 3 })) {
    errors.push({ message: "Name must be at least 3 characters long" });
  }

  // Validasi email
  if (validator.isEmpty(email)) {
    errors.push({ message: "Email is required" });
  } else if (!validator.isEmail(email)) {
    errors.push({ message: "Invalid email format" });
  } else {
    req.body.email = validator.normalizeEmail(email); // Sanitasi email
  }

  // Validasi password
  if (validator.isEmpty(password)) {
    errors.push({ message: "Password is required" });
  } else if (!validator.isLength(password, { min: 6 })) {
    errors.push({ message: "Password must be at least 6 characters long" });
  }

  // Jika ada kesalahan, kirim respons kesalahan
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Jika tidak ada kesalahan, lanjut ke middleware berikutnya
  next();
};
