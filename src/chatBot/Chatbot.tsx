"use client"; 
import React, { useState, useEffect, useRef } from "react";
import useChatbot from "./HookChatbot";
import { MessageCircle, X, Send } from "lucide-react";

const ChatbotComponent: React.FC = () => {
  const { messages, sendMessage, isLoading } = useChatbot();
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

 
  const isMobile = () => {
    return typeof window !== 'undefined' && window.innerWidth < 768;
  };

 
  const getLatestExchange = () => {
    if (messages.length === 0) return [];
    
    
    if (messages[messages.length - 1].sender === "user") {
      return [messages[messages.length - 1]];
    }
    
   
    if (messages.length >= 2 && messages[messages.length - 1].sender === "bot") {
   
      for (let i = messages.length - 2; i >= 0; i--) {
        if (messages[i].sender === "user") {
          return [messages[i], messages[messages.length - 1]];
        }
      }
      
      return [messages[messages.length - 1]];
    }
    
    return [];
  };

  const latestExchange = getLatestExchange();

  
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (input.trim() === "" || isLoading) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  
  const formatTimestamp = (timestamp?: number): string => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ position: "fixed", bottom: "1rem", right: "1rem", zIndex: 50 }}>


      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-300 flex flex-col w-full sm:w-96 max-w-full" 
             style={{ 
               maxHeight: "80vh",
               position: isMobile() ? "fixed" : "relative",
               bottom: isMobile() ? "0" : "auto",
               right: isMobile() ? "0" : "auto",
               left: isMobile() ? "0" : "auto", 
               margin: isMobile() ? "10px" : "0",
               width: isMobile() ? "calc(100% - 20px)" : "24rem" // 24rem = w-96
             }}>
          
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <img src="/images/paloma2sinfondo.png" alt="Asistente Virtual" className=" h-7 rounded-full mr-2" />

            <h2 className="text-xl font-semibold text-green-600">Asistente Virtual</h2>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-gray-500 hover:text-red-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          
          <div className="flex-1 p-4 bg-gray-50 space-y-4" 
               style={{ maxHeight: "calc(80vh - 130px)", overflowY: "auto" }}>
            {latestExchange.length === 0 ? (
              <div className="text-center text-gray-500">
                ¡Hola! Soy el asistente virtual de Valle de Paz. ¿En qué puedo ayudarte hoy?
              </div>
            ) : (
              latestExchange.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
  <div className="flex flex-col max-w-[90%] sm:max-w-[80%]">
    <span
      className={`inline-block px-4 py-2 rounded-2xl text-sm shadow-md ${
        msg.sender === "user"
          ? "bg-green-200 text-green-800 font-semibold"
          : "bg-gray-200 text-gray-800 font-medium"
      }`}
    >
      {msg.text}
    </span>
    {msg.timestamp && (
      <span className="text-xs text-gray-500 mt-1 px-1">{formatTimestamp(msg.timestamp)}</span>
    )}
  </div>
</div>

              ))
            )}
            {isLoading && (
  <div className="flex justify-start">
    <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-2xl text-sm shadow-md flex items-center space-x-2">
      <span>Escribiendo</span>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
      </div>
    </div>
  </div>
)}

          </div>

          {/* Área de input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                placeholder={isLoading ? "Enviando..." : "Escribe un mensaje..."}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || input.trim() === ""}
                className={`p-3 rounded-full ${
                  isLoading || input.trim() === ""
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } text-white transition-colors flex-shrink-0`}
              >
                <Send size={20} />
              </button>
            </div>
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