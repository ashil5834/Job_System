# Job_System
Clone the repository: git clone <repository-url>
Install dependencies: npm install
Set up the database: Update the config/database.ts file with your SQL Server credentials.
Create a .env file in the root directory: PORT=3000
                                          JWT_SECRET=yourSecretKey
                                          DB_HOST=localhost
                                          DB_USER=your_database_user
                                          DB_PASSWORD=your_database_password
                                          DB_NAME=your_database_name
                                          DB_PORT=1433

Run database migrations: npx sequelize-cli db:migrate
Start the Server: npm run dev
API documentation(Swagger): http://localhost:3000/api-docs
 
