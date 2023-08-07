import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import { Link, Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Login/login';
import Registration from './components/Registration/Registration';
import Order from './components/order';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform login logic here, and if successful, set isLoggedIn to true.
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Container maxWidth="md">
        <Typography gutterBottom variant='h2' align='center'>
          Restaurant App
        </Typography>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/registration">Registration</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/"
            element={isLoggedIn ? <Order /> : <Navigate to="/login" />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
