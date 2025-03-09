// src/components/RegistrationForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Button } from './components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';

const RegistrationForm = () => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    password: string;
    photo: any | null; // ✅ Ensure `photo` is a File or null
  }>({
    name: '',
    email: '',
    phone: '',
    password: '',
    photo: null,
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: any) => {
    setFormData({
      ...formData,
      photo: e.target.files[0],
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('password', formData.password);
    data.append('photo', formData.photo);

    try {
      const response = await axios.post(
        'http://localhost:3001/api/user',
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      //setMessage(response.data);
      navigate('/home');
    } catch (error) {
     // setMessage('Error registering your profile. Please try again.');
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="ml-14">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>{message}</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email ID"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="photo">Photo</Label>
                    <Input
                      type="file"
                      name="photo"
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="submit">Register</Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
