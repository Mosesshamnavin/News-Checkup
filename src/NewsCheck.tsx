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
      const response: any = await axios.post(
        'http://localhost:3001/api/fact-check',
        formData,
      );
      console.log(response);
      setMessage(response);
    } catch (error) {
      setMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-900">
      <Card className="w-[400px] p-6 shadow-lg rounded-lg bg-gray-700 border border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">News Check</CardTitle>
          <CardDescription className="text-gray-400">{message}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="article" className="text-gray-300">
                  Article
                </Label>
                <Input
                  type="text"
                  name="article"
                  id="article"
                  placeholder="Enter article text..."
                  value={formData.article}
                  onChange={handleChange}
                  required
                  className="bg-gray-900 text-white border-gray-600"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-900">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};


export default NewsCheck;
