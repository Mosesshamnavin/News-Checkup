import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import './CameraView.css';

function CameraView() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [message, setMessage] = useState("Checking if you're a registered user...");

  useEffect(() => {
    startCamera();
    const timeoutId = setTimeout(() => {
      captureImage();
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
      })
      .catch(err => console.error("Error accessing camera: ", err));
  };

  const captureImage = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const dataURL = canvasRef.current.toDataURL('image/png');

    axios.post('http://localhost:3001/api/login/compare-face', { image: dataURL })
      .then(response => {
        if (response.data.success) {
          setMessage("✅ You are a registered member. Redirecting...");
          setTimeout(() => {
            window.location.href = `/profile?name=${encodeURIComponent(response.data.name)}&email=${encodeURIComponent(response.data.email)}&phone_number=${encodeURIComponent(response.data.phone_number)}&designation=${encodeURIComponent(response.data.designation)}&photo=${encodeURIComponent(response.data.photo)}`;
          }, 3000);
        } else {
          setMessage("❌ You are not registered. Please sign up.");
        }
      })
      .catch(error => {
        console.error("There was an error!", error);
        setMessage("⚠️ An error occurred while checking your profile.");
      });
  };

  return (
    <div className="container">
      <div className="glass-card">
        <h2>🔍 Face Recognition Login</h2>
        <video ref={videoRef} autoPlay muted className="video-feed" />
        <canvas ref={canvasRef} style={{ display: 'none' }} width="320" height="240"></canvas>
        <p className="status-message">{message}</p>
      </div>
    </div>
  );
}

export default CameraView;
