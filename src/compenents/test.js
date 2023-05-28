import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/data') // Make a GET request to the backend API endpoint
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>mysql db 내용</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;