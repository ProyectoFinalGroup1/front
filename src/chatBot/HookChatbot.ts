import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const useChatbot = () => {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);

  const sendMessage = async (message: string) => {
    const userMessage: { text: string; sender: "user" | "bot" } = { text: message, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch(`${API_URL}/dialogflow/send-message`, {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      const botMessage: { text: string; sender: "user" | "bot" } = { text: data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Error enviando mensaje:", error);
    }
  };

  return { messages, sendMessage };
};

export default useChatbot;
