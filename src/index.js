import dotenv from 'dotenv';
import connectDB from './db/index.js';
// import { Express } from 'express';

dotenv.config({
    path: './env'
})

connectDB();

// const app = Express;

// app.get('/', (req, res) => {
//     res.send('Hello world');
// })

// app.listen((process.env.PORT) => {
//     console.log('Server running...');
// })