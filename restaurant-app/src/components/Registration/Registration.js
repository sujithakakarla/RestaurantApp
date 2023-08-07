import React, { useState } from 'react';
import { createUserAPIEndpoint } from '../../api';
import axios from 'axios';
import { Button, Container, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const FormContainer = styled(Container)({
  maxWidth: 400,
  margin: '0 auto',
  padding: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px',
});

const FormInput = styled(TextField)({
  marginBottom: '16px',
});

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform any validation or submit the data to your backend here.
    // For this example, we'll just log the form data to the console.
    axios
      .post('https://localhost:44310/api/Registration', formData)
      .then((response) => {
        console.log('Registration is successfull');
        console.log(response.data);
        const jwtToken=response.data.token;
        localStorage.setItem('jwtToken',jwtToken);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <FormContainer maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Registration Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Username"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
        />
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </FormContainer>
  );
};

export default Registration;
