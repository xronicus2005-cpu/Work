import pool from "../config/db.js"

export async function createWorkTable() {

    try{
        await pool.query(
            `CREATE TABLE IF NOT EXISTS works (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                title TEXT,
                niche VARCHAR(50),
                profession VARCHAR(50),
                imgWork TEXT,
                infoWork TEXT,
                buyersMust TEXT,
                cost VARCHAR(100),
                location VARCHAR(50),
                rating VARCHAR(25) DEFAULT '0.1'
            )`
        )

        console.log("works table created!")
    }
    catch(err){
        console.log("works table createsion err", err)
    }
    
}