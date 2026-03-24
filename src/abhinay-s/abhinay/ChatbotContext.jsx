import React, { createContext, useContext, useState } from "react";

const ChatbotContext = createContext({ 
  showChatbot: false, 
  setShowChatbot: () => {},
  initialQuery: "",
  setInitialQuery: () => {}
});

export const ChatbotProvider = ({ children }) => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [initialQuery, setInitialQuery] = useState("");

  return (
    <ChatbotContext.Provider value={{ showChatbot, setShowChatbot, initialQuery, setInitialQuery }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = () => useContext(ChatbotContext);
