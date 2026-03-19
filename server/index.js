import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { connectDB } from '../config/db.js';

// import employeeRoutes from './routes/employeeRoutes.js';

dotenv.config({quiet: true});

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());

// app.use('/api/employees', employeeRoutes);

connectDB();        

// Health check route
app.get('/', (req, res, next) => {
    res.status(200).json({ status: 'success', message: 'API is working...😉' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
   return res.status(res.statusCode === 200 ? 500 : res.statusCode).json({success: false, error: err.message || 'An unexpected error occurred' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (error) => {
    if (error) {
        console.error('Server is not starting:', error);
        return;
    }else {
        console.log(`Server is running on http://localhost:${PORT}`);
    }
  

});