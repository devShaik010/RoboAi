import React from 'react';

const VideoComponent = ({ videoRef, isStreaming }) => {
  return (
    <div className="flex-1 p-6 flex items-center justify-center">
      <div className="w-[800px] h-[500px] bg-black rounded-lg overflow-hidden relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-full object-cover"
        />
        {!isStreaming && (
          <div className="absolute inset-0 flex items-center justify-center text-white">
            No video stream
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoComponent;