import pool from "../config/db.js"

export async function getJobDetails(req, res) {

    const client = await pool.connect()
    try{
        const jobId = req.params.id
        

        if(!jobId){
            return res.status(401).json({message: "Unauthorized"})
        }

        const result1 = await client.query(
            `SELECT * FROM works WHERE id = $1`, [jobId]
        )

        const {user_id, ...job} = result1.rows[0]

        const result2 = await client.query(
            `SELECT * FROM users WHERE id = $1`, [user_id]
        )

        const {password, ...user} = result2.rows[0]

        return res.status(200).json({
            success: true,
            job: job,
            user: user
        })

    }
    catch(err){
        console.log("Erro when giving job details", err)
        return res.status(500).json({message: "Internal Server Error"})
    }
    finally{
        client.release()
    }
    
}

export async function getAllVoc(req, res) {

    const client = await pool.connect()

    try{
        const result = await client.query(
            `SELECT * FROM vocations`
        )

        const voc = result.rows

        return res.status(200).json({
            success: true,
            voc: voc
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