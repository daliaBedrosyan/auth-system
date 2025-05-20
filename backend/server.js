import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectDB } from './db/connectDB.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!!');
});


app.listen(PORT, () => {
    connectDB();
    console.log('Server running on http://localhost:3000');
})
