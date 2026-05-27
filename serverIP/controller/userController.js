
import pool from "../config/db.js";

// change user info
export async function changeUserInfo(req, res) {

    const client = await pool.connect();

    try {
        // user id from auth middleware
        const userId = req.user.id;

        // text fields from form-data
        const {
            name,
            last_name,
            fathers_name,
            number,
            sex,
            email_address,
            state,
            city,
            role,
            job,
            info
        } = req.body;

        // uploaded file (if exists)
        const file = req.file;

        if (!userId) {
            return res.status(400).json({ message: "User not found" });
        }

        // start transaction
        await client.query("BEGIN");

        // prepare avatar path
        let avatarPath = null;

        if (file) {
            // save relative path to DB
            avatarPath = `/uploads/avatars/${file.filename}`;
        }

        // update query (dynamic)
        const result = await client.query(
            `
            UPDATE users
            SET 
                name = $1,
                last_name = $2,
                fathers_name = $3,
                number = $4,
                sex = $5,
                email_address = $6,
                state = $7,
                city = $8,
                role = $9,
                job = $10,
                info = $11,
                img_profile = COALESCE($12, img_profile) -- keep old if null
            WHERE id = $13
            RETURNING *
            `,
            [
                name,
                last_name,
                fathers_name,
                number,
                sex,
                email_address,
                state,
                city,
                role,
                job || null,
                info || null,
                avatarPath,
                userId
            ]
        );

        // commit transaction
        await client.query("COMMIT");

        return res.status(200).json({
            success: true,
            user: result.rows[0]
        });

    } catch (err) {
        // rollback if error
        await client.query("ROLLBACK");

        console.log("err when changing user info", err);

        return res.status(500).json({
            message: "Internal Server Error"
        });

    } finally {
        client.release();
    }
}

//create work

export async function createWork(req, res) {
    const client = await pool.connect();
    try {
        const userId = req.user.id;
        // Casing must match what you append in Frontend's FormData
        const { title, niche, profession, infoWork, buyersMust, cost, location } = req.body;

        // Logging to debug if values are actually coming through
        

        if (!userId || !title || !niche || !profession || !infoWork || !buyersMust || !cost || !location) {
            return res.status(400).json({ message: "Barlıq maydanlardı toltırıń" });
        }

        const file = req.file;
        let imgWorkPath = null;
        if (file) {
            imgWorkPath = `/uploads/work/${file.filename}`;
        }

        await client.query("BEGIN");
        const result = await client.query(
            `INSERT INTO works (user_id, title, niche, profession, imgwork, infowork, buyersmust, cost, location)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [userId, title, niche, profession, imgWorkPath, infoWork, buyersMust, cost, location]
        );
        await client.query("COMMIT");

        return res.status(201).json({
            success: true,
            work: result.rows[0]
        });
    } catch (err) {
        await client.query("ROLLBACK");
        console.error("ERR when creating new work:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    } finally {
        client.release();
    }
}


export async function giveAllWorks(req, res) {
    const client = await pool.connect()

    try{
        const userId = req.user.id

        if(!userId){
            return res.status(401).json({message: "Not Found"})
        }

        const result = await client.query(
            `SELECT * FROM works WHERE user_id = $1`,
            [userId]
        )

        const works = result.rows

        return res.status(200).json({
            success: true,
            works
        })
    }
    catch(err){
        console.log("err", err)
        return res.status(500).json({message: "Internale Server Error"})
    }
    finally{
        client.release()
    }
    
}

//create vocations

export async function createVocation(req, res) {
    const client = await pool.connect()
    try{
        const userId = req.user.id

        const {work_name, info, cost, town, place} = req.body

        if(
            !userId || !work_name || !info || !cost || !town || !place
        ){
            return res.status(400).json({message: "Missing Values"})
        }

        await client.query("BEGIN")

        const result = await client.query(
            `INSERT INTO vocations (user_id, work_name, info, cost, town, place)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
            `, [userId, work_name, info, cost, town, place]
        )

        await client.query("COMMIT")

        return res.status(201).json({
            success: true,
            vocations: result.rows
        })
    }
    catch(err){
        await client.query("ROLLBACK")
        console.log("err when creating vocations", err)
        return res.status(500).json("Internal Server Error")
    }
    finally{
        client.release()
    }
    
}

//give all vocations

export async function giveAllVocation(req, res) {

    const client = await pool.connect()
    try{
        const userId = req.user.id

        if(!userId){
            return res.status(401).json({message: "User does not exists"})
        }

        const result = await client.query(
            `SELECT * FROM vocations WHERE user_id = $1`,
            [userId]
        )

        return res.status(200).json({
            success: true,
            vocations: result.rows
        })
    }
    catch(err){
        console.log("error when giving all vocations", err)
        return res.status(500).json({message: "Internal Server Error"})
    }
    finally{
        client.release()
    }
    
}