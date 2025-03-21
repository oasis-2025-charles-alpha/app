import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Protected = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:5000/protected', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(response.data.logged_in_as);
      } catch (error) {
        console.error('Access denied:', error.response?.data?.msg || error.message);
        navigate('/login'); // Redirect to login if unauthorized
      }
    };
    fetchData();
  }, [navigate]);

  return (
    <div>
      <h1>Protected Page</h1>
      <p>{message}</p>
    </div>
  );
};

export default Protected;