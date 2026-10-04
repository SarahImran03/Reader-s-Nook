const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// connecting with the database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// routing incoming requests
app.use('/api/auth', require('./routes/authentication'));

const PORT = process.env.PORT || 5000;

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/upload', require('./routes/doc_uploads'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));