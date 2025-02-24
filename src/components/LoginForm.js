// src/components/LoginForm.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  width: 300px;
  padding: 20px;
  background: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const RegisterLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 10px;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginForm = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () =>{
    const data = {
      email,
      password
    }
    try {
      const response = await axios.post('http://localhost:3001/api/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMessage(response.data);
      setTimeout(() => {
        window.location.href = `/profile?name=${encodeURIComponent(response.data.data.name)}&email=${encodeURIComponent(response.data.data.email)}&photo=${encodeURIComponent(response.data.data.photo)}`;
      }, 1000); // 3 seconds delay
    } catch (error) {
      setMessage('Error registering your profile. Please try again.');
    }
  }

  return (
    <FormContainer>
      <h3>Login</h3>
      <Input type="email" placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleSubmit}>Login</Button>
      <RegisterLink to="/register">Register now</RegisterLink>
    </FormContainer>
  );
};

export default LoginForm;
