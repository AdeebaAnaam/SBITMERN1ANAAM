
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const supportstaffRoutes = require('./routes/suppportstaffRoutes');
const hostelstaffRoutes = require('./routes/hostelstaffRoutes');
const managementRoutes = require('./routes/managementRoutes');
const feedbackRoute = require('./routes/feedbackRoute');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://your-frontend-name.onrender.com"
  ],
  credentials: true
}));
app.use(bodyParser.json());
// ✅ Serve static files from public/images
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
console.log("Serving images from:", path.join(__dirname, 'public', 'images'));



mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
app.use('/api', studentRoutes);
app.use('/api', facultyRoutes);
app.use('/api', supportstaffRoutes);
app.use('/api', hostelstaffRoutes);
app.use('/api', managementRoutes);
app.use('/api', feedbackRoute);
app.use('/api', authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

