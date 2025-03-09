// src/components/LoginForm.js
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
import Authorization from "./helpers/Authorization";

const NewsCheck = () => {
  const [message, setMessage] = React.useState('');
  const [formData, setFormData] = React.useState({
    article: '',
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
          const headers = Authorization.getHttpHeader();
    
      const response: any = await axios.post(
        'http://localhost:3001/api/fact-check',
        formData,
        { headers }
      );
      console.log(response);
      //setMessage(response);
    } catch (error) {
      setMessage('Failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="ml-14">
        <Card className="w-[350px] h-[420px]">
          <CardHeader>
            <CardTitle>News Check</CardTitle>
            <CardDescription>{message}</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="article">Article</Label>
                  <Input
                    type="article"
                    name="article"
                    id="article"
                    placeholder="Article"
                    value={formData.article}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit">Submit</Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default NewsCheck;
