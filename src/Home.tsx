// src/components/Home.js
import React from 'react';
import CameraView from './CameraView';
import LoginForm from './LoginForm';

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <CameraView />
      <LoginForm />
    </div>
  );
};

export default Home;
