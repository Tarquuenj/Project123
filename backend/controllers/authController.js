// controllers/authController.js
const jwt = require("jsonwebtoken");
const pool = require("../getPool");

const SECRET_KEY = "your_secret_key";

function generateToken(user) {
  return jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "1h" });
}

async function signup(req, res) {
  // Implement user registration logic
  const { Fullname, username, Password } = req.body;

  // Input validation (optional, but recommended)
  if (!Fullname || !username || !Password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const hashedPassword = await bcrypt.hash(Password, 10); // Hash password securely

    const [rows] = await pool.query(
      "INSERT INTO user_login (Fullname, username, Password) VALUES (?, ?, ?)",
      [Fullname, username, hashedPassword]
    );

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during signup" });
  }
}

async function login(req, res) {
  // Implement user login logic
  const { username, Password } = req.body;

  if (!username || !Password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [rows] = await pool.query(
      "SELECT * FROM user_login WHERE username = ?",
      [username]
    );
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password); // Compare hashed passwords

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // You can generate a JWT (JSON Web Token) here for authentication
    // ...

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during login" });
  }
}

module.exports = {
  signup,
  login,
};
