// src/components/TicketCard.js
import React from 'react';
import './TicketCard.css'; // Import the CSS for the card

const TicketCard = ({ ticket, user }) => {
  const { id, title, tag } = ticket;
  
  // Fallback for avatar if user is not defined
  const avatarUrl = user?.avatarUrl || 'path-to-default-avatar.png'; // Use a default avatar if not provided

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{id}</span>
        <div className="user-avatar">
          <img src={avatarUrl} alt="User avatar" />
          <span className="user-name">{user?.name || 'User'}</span>
        </div>
      </div>
      <h3 className="ticket-title">{title}</h3>
      <div className="ticket-footer">
        <div className="ticket-tag">
          <i className="icon-feature-request"></i>
          <span>{tag[0]}</span>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
