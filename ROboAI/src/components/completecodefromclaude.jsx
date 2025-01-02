import React, { useState } from 'react';
import { Mic, MicOff, Video, VideoOff } from 'lucide-react';

const VideoChatUI = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat Section */}
      <div className="w-1/3 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Chat with Gemini</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {/* Chat messages would go here */}
        </div>
        <div className="p-4 border-t border-gray-200">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Type your message..."
            rows="3"
          />
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full">
            Send Message
          </button>
        </div>
      </div>

      {/* Video Section */}
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex-1 bg-black rounded-lg overflow-hidden relative">
          {isVideoOn && (
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
            />
          )}
          {!isVideoOn && (
            <div className="w-full h-full flex items-center justify-center text-white">
              Camera is off
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-center gap-4">
          <button
            onClick={() => setIsVideoOn(!isVideoOn)}
            className="p-3 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
          </button>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoChatUI;

// abrar once check this code