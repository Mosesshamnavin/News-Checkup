// src/components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  height: 100vh;
  background: url('https://source.unsplash.com/1600x900/?news,journalism,media') no-repeat center center/cover;
  font-family: 'Poppins', sans-serif;
  padding: 20px;
`;

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 350px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const Message = styled.p`
  font-size: 14px;
  margin-top: 10px;
  color: ${({ success }) => (success ? 'green' : 'red')};
`;

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', formData);
      setMessage('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      setMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <Container>
      <FormContainer>
        <h3>Login</h3>
        {message && <Message success={message.includes('successful')}>{message}</Message>}
        <form onSubmit={handleSubmit}>
          <Input type="email" name="email" placeholder="Email ID" value={formData.email} onChange={handleChange} required />
          <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <Button type="submit">Login</Button>
        </form>
        <a href="/register" className="register-link">Register now</a>
      </FormContainer>
    </Container>
  );
};

export default LoginForm;
