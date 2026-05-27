import pool from "../config/db.js"

export async function getAllItJobs(req, res) {

    const client = await pool.connect()
    try{

        const IT = "IT"

        const result = await client.query(
            `SELECT * FROM works WHERE niche = $1`, [IT]
        )

        return res.status(200).json({
            success: true,
            jobs: result.rows
        })
    }
    catch(err){
        console.log("Error when giving it jobs", err)
        return res.status(500).json({message: "Internal Server Error"})
    }

    finally{
        client.release()
    }

    
}

export async function getAllTeachJobs(req, res) {

    const client = await pool.connect()
    try{
        const teach = "Oqitiw"

        const result = await client.query(
            `SELECT * FROM works WHERE niche = $1`, [teach]
        )

        return res.status(200).json({
            success: true,
            jobs: result.rows
        })
    }
    catch(err){
        console.log("error when giving all works", err)
        return res.status(500).json({message: "Internal Server Error"})
    }
    finally{
        client.release()
    }
    
}

export async function getAllHandJobs(req, res) {

    const client = await pool.connect()
    try{
        const niche = "Qolmiyneti"

        const result = await client.query(
            `SELECT * FROM works WHERE niche = $1`, [niche]
        )

        return res.status(200).json({
            success: true,
            jobs: result.rows
        })
    }

    catch(err){
        console.log("err when giving hand jobs")
        return res.status(500).json({message: "Internal Server Error"})
    }

    finally{
        client.release()
    }
    
}

export async function getAllCarJobs(req, res) {

    const client = await pool.connect()
    try{

        const niche = "Mashinasazliq"

        const result = await client.query(
            `SELECT * FROM works WHERE niche = $1`, [niche]
        )

        return res.status(200).json({
            success: true,
            jobs: result.rows
        })
    }
    catch(err){
        console.log("err when giving all car jobs", err)
        return res.status(500).json({message: "Internal Server Error"})
    }
    finally{
        client.release()
    }
    
}

export async function getAllElectrJobs(req, res) {

    const client = await pool.connect()
    try{
        const niche = "Elektronika"

        const result = await client.query(
            `SELECT * FROM works WHERE niche = $1`, [niche]
        )

        return res.status(200).json({
            success: true,
            jobs: result.rows
        })
    }
    catch(err){
        console.log("Error when giving electr jobs", err)
        return res.status(500).json({message: "Internal Server Error"})
    }
    finally{
        client.release()
    }
}


export async function getAllStat(req, res) {

    const client = await pool.connect()

    try{
        //give the count of all users
        const result1 = await client.query(
            `SELECT
               (SELECT COUNT(*) FROM users) AS total_users,
               
               (SELECT COUNT(*)
                FROM users WHERE created_at >= NOW() - INTERVAL '7 days'
                ) AS weekly_users,
                 
                (SELECT COUNT(*) FROM works) AS total_works`
        )

        const stats = result1.rows[0]


        return res.status(200).json({
            success: true,
            users: stats.total_users,
            weekly: stats.weekly_users,
            works: stats.total_works
        })
        


    }
    catch(err){
        console.log("error when giving statistics", err)
        return res.status(500).json({message: "Internal Server Error"})
    }
    finally{
        client.release()
    }

    
}