const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // For loading environment variables

const app = express();
const port = 5000; // Backend runs on port 5000

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection string from environment variables
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://durgasathish28:sathish28@clusterbd.wly7m.mongodb.net/?retryWrites=true&w=majority&appName=Clusterbd';

mongoose.connect(mongoURI)
.then(() => {
  console.log('MongoDB Connected');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Sample model
const DataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true }
});

const Data = mongoose.model('Data', DataSchema);

// API Routes
app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find(); // Fetch all data from MongoDB
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

app.post('/api/data', async (req, res) => {
  try {
    const newData = new Data(req.body);
    await newData.save();
    res.status(201).json(newData); // Use 201 status for resource creation
  } catch (error) {
    res.status(500).json({ message: 'Error saving data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
