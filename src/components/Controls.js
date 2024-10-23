import React from 'react';
import './Controls.css'; // Add CSS for the hover dropdown

const Controls = ({ onGroupingChange, onSortOrderChange }) => {
  return (
    <div className="controls-container">
      <div className="dropdown">
        <button className="dropdown-button">
          Display
        </button>

        {/* Dropdown menu appears on hover */}
        <div className="dropdown-menu">
          <div className="dropdown-group">
            <label>Grouping</label>
            <p>Grouping</p>
            
            <select onChange={(e) => onGroupingChange(e.target.value)}>
              <option value="userId">User</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
            </select>
          </div>

          <div className="dropdown-group">
            <label >Ordering</label>
            <p>Ordering</p>
            <select onChange={(e) => onSortOrderChange(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
