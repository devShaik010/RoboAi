import React, { useRef, useState, useEffect } from 'react';
import { useImage } from './ImageProvider';
import VideoComponent from './VideoComponent';
import ControlsComponent from './ControlsComponent';

const Dashboard = () => {
  const videoRef = useRef(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMicActive, setIsMicActive] = useState(false);
  const { setCapturedImage } = useImage();

  const startStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: isMicActive 
      });
      videoRef.current.srcObject = stream;
      setIsStreaming(true);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const stopStream = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  };

  const captureFrame = () => {
    if (videoRef.current && isStreaming) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0);
      canvas.toBlob((blob) => {
        const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
        setCapturedImage(file);
      }, 'image/jpeg', 0.95);
    }
  };

  return (
    <div className="flex-1 bg-black flex flex-col p-4">
      <div className="flex-grow bg-gray-900 rounded-lg overflow-hidden">
        <VideoComponent 
          videoRef={videoRef}
          isStreaming={isStreaming}
        />
      </div>
      <div className="mt-4">
        <ControlsComponent 
          isStreaming={isStreaming}
          isMicActive={isMicActive}
          startStream={startStream}
          stopStream={stopStream}
          setIsStreaming={setIsStreaming}
          setIsMicActive={setIsMicActive}
          captureFrame={captureFrame}
        />
      </div>
    </div>
  );
};

export default Dashboard;