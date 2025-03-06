"use client"; 
import React, { useState } from "react";
import useChatbot from "./HookChatbot";
import { MessageCircle, X } from "lucide-react";

const ChatbotComponent: React.FC = () => {
  const { messages, sendMessage } = useChatbot();
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSendMessage = () => {
    if (input.trim() === "") return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4">
      {isOpen ? (
        <div className="w-96 bg-white p-4 rounded-2xl shadow-2xl border border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-green-600">Chatbot</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-600 transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="h-72 overflow-y-auto border-t border-b border-gray-200 p-4 bg-gray-50 rounded-lg space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <span
                  className={`inline-block max-w-xs px-4 py-2 rounded-2xl text-sm ${
                    msg.sender === "user" ? "bg-green-200 text-green-800" : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex mt-4 space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              placeholder="Escribe un mensaje..."
            />
            <button
              onClick={handleSendMessage}
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors"
            >
              ➤
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white p-4 rounded-full shadow-xl hover:bg-green-700 transition-all"
        >
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
};

export default ChatbotComponent;
