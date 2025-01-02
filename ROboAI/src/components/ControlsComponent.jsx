import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faVideoSlash, faPlay, faPause, faMicrophone, faMicrophoneSlash, faCamera } from '@fortawesome/free-solid-svg-icons';

const ControlsComponent = ({ 
  isStreaming, 
  isMicActive, 
  startStream, 
  stopStream, 
  setIsStreaming, 
  setIsMicActive,
  captureFrame 
}) => {
  return (
    <div className="h-24 bg-white border-t rounded border-gray-200 flex items-center justify-center space-x-4">
      <button
        onClick={isStreaming ? stopStream : startStream}
        className="p-4 rounded-full hover:bg-gray-100"
      >
        <FontAwesomeIcon 
          icon={isStreaming ? faVideoSlash : faVideo}
          className="text-2xl text-gray-700"
        />
      </button>

      <button
        onClick={() => setIsStreaming(!isStreaming)}
        className="p-4 rounded-full hover:bg-gray-100"
      >
        <FontAwesomeIcon 
          icon={isStreaming ? faPause : faPlay}
          className="text-2xl text-gray-700"
        />
      </button>

      <button
        onClick={() => setIsMicActive(!isMicActive)}
        className="p-4 rounded-full hover:bg-gray-100"
      >
        <FontAwesomeIcon 
          icon={isMicActive ? faMicrophone : faMicrophoneSlash}
          className="text-2xl text-gray-700"
        />
      </button>

      <button
        onClick={captureFrame}
        disabled={!isStreaming}
        className={`p-4 rounded-full hover:bg-gray-100 ${!isStreaming ? 'opacity-50' : ''}`}
      >
        <FontAwesomeIcon 
          icon={faCamera}
          className="text-2xl text-gray-700"
        />
      </button>
    </div>
  );
};

export default ControlsComponent;