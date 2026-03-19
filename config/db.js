import sql from 'mssql';
import { config } from "dotenv";
config({ quiet: true });

const configs = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // Use encryption for Azure SQL
        trustServerCertificate: true, // For local development, set to true
    },
};

export const connectDB = async () => {
    try {
        const connectionInstance = await sql.connect(configs);
        console.log('Connected to SQL Server database successfully.');
        return connectionInstance;
    }
    catch (error) {
        console.error('Database connection failed:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};
