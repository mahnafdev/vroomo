import { Pool } from "pg";
import dotenv from "dotenv";

//* Configure DotEnv
dotenv.config();

//* DB connection
const db = new Pool({
	connectionString: process.env.DB_URL,
});

//* DB schema
const initTables = async () => {
	await db.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            email VARCHAR(150) NOT NULL UNIQUE,
            password TEXT NOT NULL CHECK (char_length(password) >= 6),
            phone VARCHAR(20) NOT NULL,
            role VARCHAR(10) NOT NULL CHECK (role IN ('admin', 'customer'))
        );
        CREATE TABLE IF NOT EXISTS vehicles (
            id SERIAL PRIMARY KEY,
            vehicle_name VARCHAR(255) NOT NULL,
            type VARCHAR(5) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
            registration_number VARCHAR(10) NOT NULL UNIQUE,
            daily_rent_price NUMERIC NOT NULL CHECK (daily_rent_price > 0),
            availability_status VARCHAR(10) NOT NULL CHECK (availability_status IN ('available', 'booked'))
        );
        CREATE TABLE IF NOT EXISTS bookings (
            id SERIAL PRIMARY KEY,
            customer_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            vehicle_id INT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
            rent_start_date DATE NOT NULL,
            rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date),
            total_price NUMERIC NOT NULL CHECK (total_price > 0),
            status VARCHAR(10) NOT NULL CHECK (status IN ('active', 'cancelled', 'returned'))
        );
        `);
};

//* Exports
export { db, initTables };
