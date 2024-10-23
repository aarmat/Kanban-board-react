import React, { useState, useEffect } from 'react';
import './KanbanBoard.css';
import TicketCard from './TicketCard';
import Controls from './Controls';

const priorities = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No Priority',
};

const statuses = {
  'Todo': 'To Do',
  'In progress': 'In Progress',
  'Backlog': 'Backlog',
};

const priorityOrder = ['No Priority', 'Urgent', 'High', 'Medium', 'Low'];

function KanbanBoard() {
  const [tickets, setTickets] = useState([]);
  const [grouping, setGrouping] = useState(() => {
    return localStorage.getItem('grouping') || 'user'; // Retrieve saved grouping from localStorage or default to 'user'
  });
  const [sortOrder, setSortOrder] = useState(() => {
    return localStorage.getItem('sortOrder') || 'title'; // Retrieve saved sortOrder from localStorage or default to 'title'
  });

  useEffect(() => {
    // Fetch tickets from the API or a mock data source
    const fetchTickets = async () => {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment'); // Update with actual API
      const data = await response.json();
      setTickets(data.tickets);
    };
    fetchTickets();
  }, []);

  // Save the grouping state in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('grouping', grouping);
  }, [grouping]);

  // Save the sortOrder state in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sortOrder', sortOrder);
  }, [sortOrder]);

  // Sort tickets based on the selected sort order
  const sortTickets = (ticketsArray) => {
    switch (sortOrder) {
      case 'title':
        return [...ticketsArray].sort((a, b) => a.title.localeCompare(b.title));
      case 'priority':
        return [...ticketsArray].sort((a, b) => a.priority - b.priority);
      default:
        return ticketsArray;
    }
  };

  // Group tickets based on the selected grouping option
  const groupTickets = () => {
    let grouped;

    switch (grouping) {
      case 'priority':
        grouped = tickets.reduce((acc, ticket) => {
          const priorityLabel = priorities[ticket.priority];
          if (!acc[priorityLabel]) {
            acc[priorityLabel] = [];
          }
          acc[priorityLabel].push(ticket);
          return acc;
        }, {});

        // Sort priorities based on the desired order
        const sortedGroupedByPriority = {};
        priorityOrder.forEach(priority => {
          if (grouped[priority]) {
            sortedGroupedByPriority[priority] = sortTickets(grouped[priority]); // Sort within groups
          }
        });

        return sortedGroupedByPriority;

      case 'status':
        grouped = tickets.reduce((acc, ticket) => {
          const statusLabel = statuses[ticket.status] || ticket.status;
          if (!acc[statusLabel]) {
            acc[statusLabel] = [];
          }
          acc[statusLabel].push(ticket);
          return acc;
        }, {});
        return Object.keys(grouped).reduce((acc, group) => {
          acc[group] = sortTickets(grouped[group]); // Sort within groups
          return acc;
        }, {});

      case 'user':
      default:
        grouped = tickets.reduce((acc, ticket) => {
          const userName = ticket.userId; // Assuming ticket.userId is the user name
          if (!acc[userName]) {
            acc[userName] = [];
          }
          acc[userName].push(ticket);
          return acc;
        }, {});
        return Object.keys(grouped).reduce((acc, group) => {
          acc[group] = sortTickets(grouped[group]); // Sort within groups
          return acc;
        }, {});
    }
  };

  const groupedTickets = groupTickets();

  return (
    <div className="kanban-board">
      <div className="kanban-header">
        <Controls onGroupingChange={setGrouping} onSortOrderChange={setSortOrder} />
        <h1>Task Manager</h1>
      </div>

      <div className="columns-container">
        {Object.keys(groupedTickets).map((group) => (
          <div className="kanban-column" key={group}>
            <div className="column-header">
              <h2>{group}</h2>
              <span>{groupedTickets[group].length} Tickets</span>
            </div>
            {groupedTickets[group].map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
