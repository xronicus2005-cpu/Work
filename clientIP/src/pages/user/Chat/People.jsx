import React, { useEffect, useState } from "react";
import { Avatar, Typography, Box, Badge } from "@mui/material";
import api from "../../../api/axios";
import "./People.css";

const People = ({ conversation, person, active, onClick }) => {
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    if (!conversation || !person) return;
    const friendId = conversation.members.find(m => String(m) !== String(person.id));
    if (!friendId) return;

    api.get(`/userFor/${friendId}`)
      .then(res => setFriend(res.data.user))
      .catch(err => console.error(err));
  }, [conversation, person]);

  if (!friend) return null;

  return (
    <div onClick={onClick} className={`person-item ${active ? 'active' : ''}`}>
      <Badge
        color="primary"
        variant="dot"
        invisible={!conversation.unread_count}
        sx={{ "& .MuiBadge-badge": { backgroundColor: 'var(--primary-green)' } }}
      >
        <Avatar
          src={friend.imgProfile}
          className="person-avatar"
          sx={{ width: 50, height: 50, border: active ? '2px solid white' : '1px solid #d1d1d6' }}
        >
          {friend.name?.charAt(0)}
        </Avatar>
      </Badge>
      <div className="person-content">
        <div className="person-header">
           <span className="person-name">{friend.name} {friend.lastName}</span>
           {conversation.last_message_time && (
             <span className="person-time">12:45 PM</span>
           )}
        </div>
        <div className="person-preview">Tap to open conversation</div>
      </div>
    </div>
  );
};

export default People;