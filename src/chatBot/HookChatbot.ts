import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

// URL de la API en Render
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://cementerio-parque-api.onrender.com";

type MessageType = {
  text: string;
  sender: "user" | "bot";
  timestamp?: number;
};

const MESSAGES_STORAGE_KEY = "chatbot_messages";
const SESSION_ID_KEY = "chatbot_session_id";
const MAX_MESSAGES = 10;

const useChatbot = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Inicializar sessionId y cargar mensajes previos
  useEffect(() => {
    // Obtener o crear sessionId
    let id = localStorage.getItem(SESSION_ID_KEY);
    if (!id) {
      id = `session-${uuidv4()}`;
      localStorage.setItem(SESSION_ID_KEY, id);
    }
    setSessionId(id);

    // Cargar mensajes previos
    try {
      const storedMessages = localStorage.getItem(MESSAGES_STORAGE_KEY);
      if (storedMessages) {
        const parsedMessages = JSON.parse(storedMessages) as MessageType[];
        setMessages(parsedMessages.slice(-MAX_MESSAGES));
      }
    } catch (error) {
      console.error("Error cargando mensajes:", error);
      localStorage.removeItem(MESSAGES_STORAGE_KEY);
    }
  }, []);

  // Guardar mensajes en localStorage cuando cambian
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(
        MESSAGES_STORAGE_KEY,
        JSON.stringify(messages.slice(-MAX_MESSAGES))
      );
    }
  }, [messages]);

  const sendMessage = async (message: string) => {
    if (!sessionId || message.trim() === "") return;

    setIsLoading(true);

    // Añadir mensaje del usuario
    const userMessage: MessageType = {
      text: message,
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      console.log(`Enviando solicitud a ${API_URL}/dialogflow/send-message`);
      console.log("Datos enviados:", { sessionId, message });

      const response = await fetch(`${API_URL}/dialogflow/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionId,
          message: message,
        }),
      });

      const data = await response.json();
      console.log("Respuesta recibida:", data);

      if (!response.ok) {
        throw new Error(
          `Error ${response.status}: ${data.message || "Error desconocido"}`
        );
      }

      // Extraer el texto de respuesta del backend
      const botMessage: MessageType = {
        text: data.responseText || "Lo siento, no pude procesar tu mensaje.",
        sender: "bot",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error enviando mensaje:", error);

      const errorMessage: MessageType = {
        text: "Lo siento, hubo un error al procesar tu mensaje. Intenta de nuevo más tarde.",
        sender: "bot",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    localStorage.removeItem(MESSAGES_STORAGE_KEY);
  };

  return { messages, sendMessage, clearMessages, isLoading };
};

export default useChatbot;
