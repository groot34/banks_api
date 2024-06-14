const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Define the bank schema
const bankSchema = new mongoose.Schema({
  ifsc: { type: String, required: true },
  bank_id: { type: Number, required: true },
  branch: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  bank_name: { type: String, required: true },
});

// Create the bank model
const Bank = mongoose.model('Bank', bankSchema);

// Function to import data from CSV
const importData = () => {
  const filePath = path.join(__dirname, '../data/bank_branches.csv');
  const banks = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      banks.push(row);
    })
    .on('end', async () => {
      try {
        await Bank.insertMany(banks);
        console.log('Data successfully imported');
        process.exit();
      } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
      }
    });
};

// Connect to DB and import data
connectDB().then(importData);
