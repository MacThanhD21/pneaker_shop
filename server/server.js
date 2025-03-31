const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const collectionsRouter = require('./routes/collections');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/collections', collectionsRouter);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pneaker_shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 