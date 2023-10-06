import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"; 
import connectDB from "./Config/db.js";

const port = process.env.PORT || 5000;

import userRoutes from './Routes/userRoutes.js';

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Middleware to set a timeout for requests (adjust the timeout as needed)
app.use((req, res, next) => {
  const timeoutMs = 60000; // Set the timeout duration in milliseconds (e.g., 60 seconds)

  // Set a timeout for the response
  const timeout = setTimeout(() => {
    // Respond with an error if the request takes too long to complete
    res.status(500).json({ error: 'Request timed out' });
  }, timeoutMs);

  // Attach the timeout to the request object
  req.timeout = timeout;

  res.on('finish',() =>{
    clearTimeout(timeout);
  });

  // Continue processing the request
  next();
});

app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started successfully on port ${port}`);
});
