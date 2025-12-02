import express from 'express';
import authRoutes from './routes/auth.routes.js';
import dotenv from 'dotenv';
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from 'cookie-parser';

dotenv.config();




const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse req.body
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data


app.use(cookieParser());
app.use('/api/auth', authRoutes);



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
  connectMongoDB();
});



