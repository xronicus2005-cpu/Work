import express from "express"
import pool from "../config/db.js"
import { accessTokenChecker } from "../middleware/accressTokenChecker.js"

const router = express.Router()

// GET /getAll — all conversations for the logged-in user
router.get("/getAll", accessTokenChecker ,async (req, res) => {
  try {
    const userId = req.user.id

    const result = await pool.query(
      `SELECT * FROM conversations 
       WHERE $1 = ANY(members) 
       ORDER BY updated_at DESC`,
      [userId]
    )

    res.json({ conversations: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

// POST /getOrCreate/:id — get or create conversation between two users
router.post("/getOrCreate/:id", accessTokenChecker ,async (req, res) => {
  try {
    const me = req.user.id
    const other = parseInt(req.params.id)

    if (isNaN(other)) {
      return res.status(400).json({ error: "Invalid user id" })
    }

    const existing = await pool.query(
      `SELECT * FROM conversations 
       WHERE members @> ARRAY[$1::int, $2::int]
       AND array_length(members, 1) = 2`,
      [me, other]
    )

    if (existing.rows.length > 0) {
      return res.json({ conversation: existing.rows[0] })
    }

    const created = await pool.query(
      `INSERT INTO conversations (members) 
       VALUES (ARRAY[$1::int, $2::int]) 
       RETURNING *`,
      [me, other]
    )

    res.json({ conversation: created.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

// GET /messages/:conversationId — all messages in a conversation
router.get("/messages/:conversationId", accessTokenChecker ,async (req, res) => {
  try {
    const conversationId = parseInt(req.params.conversationId)

    if (isNaN(conversationId)) {
      return res.status(400).json({ error: "Invalid conversation id" })
    }

    const result = await pool.query(
      `SELECT * FROM messages 
       WHERE conversation_id = $1 
       ORDER BY created_at ASC`,
      [conversationId]
    )

    res.json({ messages: result.rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

// POST /messages — send a new message
router.post("/messages", accessTokenChecker,  async (req, res) => {
  try {
    const { conversationId, text } = req.body
    const senderId = req.user.id

    if (!conversationId || !text?.trim()) {
      return res.status(400).json({ error: "conversationId and text are required" })
    }

    const result = await pool.query(
      `INSERT INTO messages (conversation_id, sender_id, text, read_by)
       VALUES ($1, $2, $3, ARRAY[$2::int])
       RETURNING *`,
      [conversationId, senderId, text]
    )

    await pool.query(
      `UPDATE conversations SET updated_at = NOW() WHERE id = $1`,
      [conversationId]
    )

    res.json({ message: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

// DELETE /clearMessages/:conversationId — delete all messages in a conversation
router.delete("/clearMessages/:conversationId", accessTokenChecker ,async (req, res) => {
  try {
    const conversationId = parseInt(req.params.conversationId)

    if (isNaN(conversationId)) {
      return res.status(400).json({ error: "Invalid conversation id" })
    }

    await pool.query(
      `DELETE FROM messages WHERE conversation_id = $1`,
      [conversationId]
    )

    res.json({ message: "Tazalandi" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

// DELETE /deleteConversation/:id — delete a conversation (messages cascade)
router.delete("/deleteConversation/:id", accessTokenChecker, async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid conversation id" })
    }

    await pool.query(`DELETE FROM conversations WHERE id = $1`, [id])

    res.json({ message: "Oshirildi" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

// GET /userFor/:userId — get another user's profile
router.get("/userFor/:userId", accessTokenChecker, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId)

    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user id" })
    }

    const result = await pool.query(
      `SELECT id, name, last_name AS "lastName", img_profile AS "imgProfile" 
       FROM users WHERE id = $1`,
      [userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json({ user: result.rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
})

export default router