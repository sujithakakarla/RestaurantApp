import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, TextField, Typography } from "@mui/material";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const correctUsername = "testuser";
    const correctPassword = "testpassword";

    if (userName === correctUsername && password === correctPassword) {
      console.log("Login Successful");
    } else {
      
      // You cannot use <Link> here to redirect. Use useHistory() hook instead.
      // Redirect to "/registration" route.
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login Page
      </Typography>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="UserName"
            variant="outlined"
            value={userName}
            onChange={handleUsernameChange}
            fullWidth
            margin="normal"
          />
        </div>
        <div>
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            margin="normal"
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
      <Typography variant="body1" align="center">
        <Link to="/registration">Register here</Link>
      </Typography>
    </Container>
  );
};

export default Login;
