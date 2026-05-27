import pool from "../config/db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export async function createUser(req, res) {

    const client = await pool.connect()

    try{
        const {name, last_name, father_name, number, sex, email_address, state, city, pass} = req.body

        if(!name || !last_name || !father_name || !number || !sex || !email_address || !state || !city || !pass){
            return res.status(400).json({message: "Missing values"})
        }

        const hashPassword = await bcrypt.hash(pass, 10)

        await client.query("BEGIN")

        const result = await client.query(
            `INSERT INTO users (name, last_name, fathers_name, number, sex, email_address, state, city, password)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING id, role`,
            [name, last_name, father_name, number, sex, email_address, state, city, hashPassword]
        )
        
        await client.query("COMMIT")

        const newUser = result.rows[0]


        //generating token
        const token = jwt.sign(
            {id: newUser.id, role: newUser.role}, //payload
            process.env.JWT_SECRET_KEY, //secret key
            {expiresIn: "24h"} //options
        )


        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        })

        

        return res.json({success: true})

    }

    catch(err){
        await client.query("ROLLBACK")
        console.log(err)
        return res.status(500).json({message: "Internal Server Error"})
    }

    finally{
        client.release()
    }
    
}

export async function loginUser(req, res) {

    const client = await pool.connect()

    try{
        
        const {email_address, pass} = req.body

        if(!email_address || !pass){
            return res.status(401).json({message: "Missing Values"})
        }

        const result = await client.query(
            `SELECT * FROM users WHERE email_address = $1`,
            [email_address]
        )

        const user = result.rows[0]

        if(!user){
            return res.status(400).json({message: "User not found"})
        }

        //comparison of passwords
        const isValid = await bcrypt.compare(pass, user.password)

        if(!isValid){
            return res.status(401).json({message: "Password Error"})
        }

        //generate token
        const token = jwt.sign(
            {id: user.id, role: user.role},//payload
            process.env.JWT_SECRET_KEY, //key
            {expiresIn: "24h"} //timeline
        )

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.json({success: true})

    }
    catch(err){
        console.log(err)
        return res.status(500).json({message: "Internal Server Error"})
    }

    finally{
        client.release()
    }
    
}

export async function me(req, res) {

    const client = await pool.connect()

    try{
        const userId = req.user.id
        
        const result = await client.query(
            `SELECT * FROM users WHERE id = $1`,
            [userId]
        )

        const user = result.rows[0]

        if(!user){
            return res.status(400).json({message: "User not Found"})
        }

        

        const {password, ...safeUser} = user

        return res.status(200).json({success: true, user: safeUser})
    }

    catch(err){
        console.log(err)
        return res.status(500).json({message: "Internal Server Error"})
    }

    finally{
        client.release()
    }
    
}

export async function logout(req, res) {

    try{

        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        })

        return res.status(200).json({success: true, message: "Logged out!"})

    }
    catch(err){
        console.log("Error in Clearing cookie", err)
        return res.status(500).json({message: "Internal Server Error"})
    }
    
}