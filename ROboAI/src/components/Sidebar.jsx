import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { startChat } from './gemini';
import { useImage } from './ImageProvider';
import Spinner from './components';

function Sidebar() {
  const { capturedImage } = useImage();
  const [inputValue, setInputValue] = useState('');
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const responseRef = useRef(null);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    try {
      setIsLoading(true);
      const response = await startChat(inputValue, capturedImage);
      setResponses([...responses, 
        { type: 'user', text: inputValue }, 
        { type: 'bot', text: response }
      ]);
      setInputValue('');
    } catch (error) {
      setResponses([...responses, { 
        type: 'error', 
        text: 'Error: ' + error.message 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-96 bg-gray-900 text-white p-4 flex flex-col h-screen">
      <div className="mb-4 flex-grow overflow-auto" ref={responseRef}>
        {responses.map((response, index) => (
          <div 
            key={index} 
            className={`mb-4 p-3 rounded ${
              response.type === 'user' 
                ? 'bg-blue-600 ml-4' 
                : response.type === 'error'
                ? 'bg-red-500'
                : 'bg-gray-700 mr-4'
            }`}
          >
            <pre className="whitespace-pre-wrap break-words font-mono text-sm">
              {response.text}
            </pre>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-700 pt-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="flex-1 p-2 bg-gray-800 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
            placeholder="Write a prompt..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
            disabled={isLoading}
          />
          <button
            className={`p-2 bg-blue-600 rounded hover:bg-blue-700 transition-colors
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={handleSend}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : <FontAwesomeIcon icon={faPaperPlane} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;