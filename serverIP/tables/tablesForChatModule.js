import pool from "../config/db.js"

export async function createChatModule() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS conversations (
        id SERIAL PRIMARY KEY,
        members INTEGER[] NOT NULL,
        unread_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)
    console.log("conversations table created")

    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
        sender_id INTEGER NOT NULL,
        text TEXT NOT NULL,
        read_by INTEGER[] DEFAULT '{}',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `)
    console.log("messages table created")

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_messages_conversation_id 
      ON messages(conversation_id);
    `)
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_conversations_members 
      ON conversations USING GIN(members);
    `)
    console.log("indexes created")

  } catch (err) {
    console.log("error when creating chat module", err)
  }
}

createChatModule()