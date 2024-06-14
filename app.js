const express = require('express');
const connectDB = require('./src/config/db.js');
const bankRoutes = require('./src/routes/bankRoutes.js');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());
app.use('/api', bankRoutes);

app.get('/', (req, res)=>{
  res.json("Please go to api/branches/<branchNAME> or api/banks")
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
