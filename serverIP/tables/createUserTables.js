import pool from "../config/db.js"

export async function createUsersTable() {
    try{
        await pool.query(
            `CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name TEXT,
                last_name TEXT,
                fathers_name TEXT,
                number VARCHAR(30),
                sex VARCHAR(20),
                email_address VARCHAR(255) NOT NULL UNIQUE,
                state VARCHAR(30),
                city VARCHAR(30),
                password TEXT,
                role VARCHAR(10) DEFAULT 'user',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                job VARCHAR(30),
                info TEXT,
                img_profile TEXT
            )`
        )

        console.log("users table has created!")
    }
    catch(err){
        console.log("users table Error", err)
    }
}