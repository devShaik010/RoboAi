import { GoogleGenerativeAI } from "@google/generative-ai";


// Configuration
const API_KEY = "AIzaSyCUlzJMebCtvPS_F1DtGPdKCOJIRUzbUY0";
const MODEL_NAME = "models/gemini-2.0-flash-exp";

// Initialize AI
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

// Helper function for image processing
async function fileToGenerativePart(imageFile) {
    try {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result.split(',')[1];
                resolve({
                    inlineData: {
                        data: base64Data,
                        mimeType: imageFile.type
                    }
                });
            };
            reader.onerror = reject;
            reader.readAsDataURL(imageFile);
        });
    } catch (error) {
        console.error('Error processing image:', error.message);
        throw error;
    }
}

// Main chat function
async function generateResponse(prompt, imageFile = null) {
    const userPrompt = prompt;
    const mainPrompt = `you are a robotic ARM(servo motor based) controller you should give json response with x,y and z coordinates of each object with certain operation which is required to perform actions based on the given task :${userPrompt}. The json response should contain steps and each step should contains x,y and z coordinate with operation like move right left finally in last step the task completed:true`;
    
    try {
        let chatOptions = {
            history: [
                {
                    role: "user",
                    parts: [{ text: mainPrompt }]
                }
            ]
        };

        if (imageFile) {
            const imagePart = await fileToGenerativePart(imageFile);
            chatOptions.history[0].parts.push(imagePart);
        }

        const chat = model.startChat(chatOptions);
        const result = await chat.sendMessage(mainPrompt);
        return result.response.text();
    } catch (error) {
        console.error('Chat error:', error.message);
        throw error;
    }
}

// Modified startChat function to accept File object instead of file path
export async function startChat(prompt, imageFile = null) {
    try {
        const response = await generateResponse(prompt, imageFile);
        console.log('AI Response:', response);
        return response;
    } catch (error) {
        console.error('Error starting chat:', error.message);
        throw error;
    }
}