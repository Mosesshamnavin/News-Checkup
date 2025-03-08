import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import { Button } from './components/ui/button';

function CameraView() {
  const videoRef = useRef<any>(null);
  const canvasRef = useRef<any>(null);
  const [message, setMessage] = useState(
    "Checking if you're a registered user...",
  );

  useEffect(() => {
    startCamera();
    const timeoutId = setTimeout(() => {
      //captureImage();
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error('Error accessing camera: ', err));
  };

  const captureImage = () => {
    const context = canvasRef.current?.getContext('2d');
    if (!context) return;
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current?.width,
      canvasRef.current?.height,
    );
    const dataURL = canvasRef.current?.toDataURL('image/png');

    axios
      .post('http://localhost:3001/api/login/compare-face', { image: dataURL })
      .then((response) => {
        if (response.data.success) {
          setMessage('✅ You are a registered member. Redirecting...');
          setTimeout(() => {
            window.location.href = `/profile?name=${encodeURIComponent(response.data.name)}&email=${encodeURIComponent(response.data.email)}&phone_number=${encodeURIComponent(response.data.phone_number)}&designation=${encodeURIComponent(response.data.designation)}&photo=${encodeURIComponent(response.data.photo)}`;
          }, 3000);
        } else {
          setMessage('❌ You are not registered. Please sign up.');
        }
      })
      .catch((error) => {
        console.error('There was an error!', error);
        setMessage('⚠️ An error occurred while checking your profile.');
      });
  };

  return (
    <>
      <Card className="w-[350px]  h-[420px]">
        <div className="inline-block align-middle m-auto">
          <CardHeader>
            <CardTitle>Face Recognition Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="container">
              <div className="glass-card">
                <video ref={videoRef} autoPlay muted className="video-feed" />
                <canvas
                  ref={canvasRef}
                  style={{ display: 'none' }}
                  width="320"
                  height="240"
                ></canvas>
                <p className="status-message">{message}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-left">
            <Button onClick={captureImage} type="submit">
              Login
            </Button>
          </CardFooter>
        </div>
      </Card>
    </>
  );
}

export default CameraView;
