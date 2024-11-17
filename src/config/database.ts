import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize({
    dialect: 'mssql',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'job_system',
    logging: false,
    dialectOptions: {
        options: {
            encrypt: true,
            trustServerCertificate: true
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// // Test the connection
// export const testConnection = async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Database connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// };