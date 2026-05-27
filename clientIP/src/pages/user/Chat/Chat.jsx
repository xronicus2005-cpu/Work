import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, TextField, IconButton, Avatar, Menu, MenuItem, CircularProgress } from "@mui/material";
// Lucide Icons
import { Menu as MenuIcon, Send, MoreHorizontal, Trash2, Eraser, ChevronLeft } from "lucide-react";
import api from "../../../api/axios";
import People from "./People";
import { toast } from "react-toastify";
import "./Chat.css";
import { useAuth } from "../../../hooks/useAuth.js"

const Chat = () => {
  const { id } = useParams();
  const { user } = useAuth();


  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  
  const [me, setMe] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [showContacts, setShowContacts] = useState(true);
  
  const [userFor, setUserFor] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sending, setSending] = useState(false);
  
  const open = Boolean(anchorEl);
  const messagesEndRef = useRef(null);
  const pollingRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allConv = await api.get("/getAll");
        setConversations(allConv.data?.conversations || []);
      } catch (err) { console.error(err); }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!user || !id) return;
    const exist = conversations.find(c =>
      Array.isArray(c.members) && c.members.includes(id) && c.members.includes(user.id)
    );
    if (exist) { setActive(exist.id); return; }

    const createConv = async () => {
      try {
        const res = await api.post(`/getOrCreate/${id}`, {});
        const conv = res.data.conversation;
        if (!conv) return;
        setConversations(prev => {
          const exists = prev.find(c => c.id === conv.id);
          return exists ? prev : [...prev, conv];
        });
        setActive(conv.id);
      } catch (err) { console.error(err); }
    };
    createConv();
  }, [user, id, conversations]);

  const fetchMessages = async (convId) => {
    try {
      const res = await api.get(`/messages/${convId}`);
      setMessages(res.data.messages || []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    if (!active) return;
    fetchMessages(active);
    pollingRef.current = setInterval(() => fetchMessages(active), 3000);
    return () => clearInterval(pollingRef.current);
  }, [active]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // FIXED: Logic to get the OTHER user's info for the header
  useEffect(() => {
    if (!active || !user) return;
    const conv = conversations.find(c => c.id === active);
    if (!conv) return;
    
    // Ensure we compare IDs correctly (Strings to Strings)
    const otherUserId = conv.members.find(m => String(m) !== String(user.id));
    
    if (otherUserId) {
      api.get(`/userFor/${otherUserId}`)
        .then(res => setUserFor(res.data.user))
        .catch(err => console.error(err));
    }
  }, [active, conversations, me]);

  const handleSend = async () => {
    if (!newMessage.trim() || !user || !active || sending) return;
    setSending(true);
    try {
      await api.post("/messages", { conversationId: active, text: newMessage });
      setNewMessage("");
      await fetchMessages(active);
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleClear = async () => {
    if (!active || !window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/clearMessages/${active}`);
      setMessages([]);
      toast.success("Chat cleared");
    } catch (err) { console.error(err); }
    handleClose();
  };

  const handleDelete = async () => {
    if (!active || !window.confirm("Delete this conversation?")) return;
    try {
      await api.delete(`/deleteConversation/${active}`);
      setConversations(prev => prev.filter(c => c.id !== active));
      setActive(null);
      setMessages([]);
      setUserFor(null);
      toast.success("Chat deleted");
      setShowContacts(true);
    } catch (err) { console.error(err); }
    handleClose();
  };

  return (
    <div className="chat-app-wrapper">
      <Box className={`sidebar glass-card ${!showContacts ? 'hidden' : ''}`} sx={{ width: { xs: "100%", sm: "320px", md: "380px" } }}>
        <div className="sidebar-header">
          <Typography className="chat-logo">Messages</Typography>
        </div>
        <div className="contacts-list-container">
          {conversations.map(c => (
            <People
              key={c.id}
              conversation={c}
              person={user}
              active={active === c.id}
              onClick={() => { 
                setActive(c.id); 
                if (window.innerWidth < 600) setShowContacts(false); 
              }}
            />
          ))}
        </div>
      </Box>

      <main className={`chat-main ${showContacts ? 'mobile-hidden' : ''}`}>
        <header className="chat-main-header glass-card">
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <IconButton className="mobile-only" onClick={() => setShowContacts(true)}>
              <ChevronLeft size={24} color="var(--primary-green)" />
            </IconButton>
            {userFor && (
              <>
                <Avatar src={userFor.imgProfile} sx={{ width: 42, height: 42, border: '1px solid var(--glass-border)' }} />
                <Box>
                  <Typography sx={{ fontWeight: 600, color: "var(--text-main)", lineHeight: 1.2 }}>
                    {userFor.name} {userFor.lastName}
                  </Typography>
                  <Typography sx={{ fontSize: "0.75rem", color: "var(--primary-green)" }}>online</Typography>
                </Box>
              </>
            )}
          </Box>

          <IconButton onClick={handleClick}><MoreHorizontal size={20} color="var(--text-secondary)" /></IconButton>
          <Menu 
            anchorEl={anchorEl} 
            open={open} 
            onClose={handleClose}
            PaperProps={{ className: "glass-card", sx: { mt: 1, boxShadow: 'var(--glass-shadow)' } }}
          >
            <MenuItem onClick={handleClear} sx={{ gap: 1.5, fontSize: '0.9rem' }}>
              <Eraser size={18} /> Clear chat
            </MenuItem>
            <MenuItem onClick={handleDelete} sx={{ gap: 1.5, color: "error.main", fontSize: '0.9rem' }}>
              <Trash2 size={18} /> Delete chat
            </MenuItem>
          </Menu>
        </header>

        <div className="messages-container">
          {messages.map(m => (
            <div key={m.id} className={`msg-bubble ${String(m.sender_id) === String(user?.id) ? 'msg-me' : 'msg-them'}`}>
              {m.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-section glass-card">
          <TextField
            fullWidth
            variant="standard"
            InputProps={{ disableUnderline: true }}
            placeholder="iMessage"
            className="ios-input"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={sending}
          />
          <IconButton 
            className="ios-send-button" 
            onClick={handleSend} 
            disabled={!newMessage.trim() || sending}
            sx={{ backgroundColor: 'var(--primary-green) !important' }}
          >
            {sending ? <CircularProgress size={18} color="inherit" /> : <Send size={18} color="white" />}
          </IconButton>
        </div>
      </main>
    </div>
  );
};

export default Chat;