const { User, Credentials } = require('../user/model');
const bcrypt = require('bcryptjs');

// Register API
module.exports.createUser = async (req, res) => {
  try {
    const { name, email, password, age, phoneNumber, gender } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, age, phoneNumber, gender });
    const savedUser = await user.save();

    const credentials = new Credentials({
      email,
      password: hashedPassword,
      userId: savedUser._id,
    });

    const savedCredentials = await credentials.save();

    res.status(201).json({
      message: 'User created successfully',
      data: savedCredentials,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



// Login API
exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user by email
      const user = await Credentials.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      res.status(200).json({
        message: 'Login successful',
        data: {
          userId: user.userId,
          email,
        },
      });
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };