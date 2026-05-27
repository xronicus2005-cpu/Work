import pool from "../config/db.js";

export async function createVocation() {

    try{
        await pool.query(
            `CREATE TABLE IF NOT EXISTS vocations (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                work_name TEXT,
                info TEXT,
                cost TEXT,
                town VARCHAR(50),
                place VARCHAR(50)
           )`
        )

        console.log("Vocation table created!")
    }

    catch(err){
        console.log("error in creating vocation table", err)
    }
    
}
