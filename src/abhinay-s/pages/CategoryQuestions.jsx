import React from "react";
import { useChatbot } from "../abhinay/ChatbotContext";

const CategoryQuestions = ({
  title = "Understanding Category franchise",
  data = [],
}) => {
  const { setInitialQuery, setShowChatbot } = useChatbot();

  // safety check
  if (!Array.isArray(data) || data.length === 0) return null;

  const handleQuestionClick = (question) => {
    // Set query in chatbot context and open it
    setInitialQuery(question);
    setShowChatbot(true);
  };

  return (
    <div className="border border-gray-200 rounded-[28px] px-8 py-8 bg-white shadow-sm h-fit">
      {/* Heading */}
      <h3 className="text-2xl font-bold mb-6 text-gray-900 leading-tight">
        {title}
      </h3>

      {/* Questions */}
      <ul className="space-y-4">
        {data.map((question, index) => (
          <li key={index}>
            <button
              onClick={() => handleQuestionClick(question)}
              className="text-[#3B82F6] hover:underline text-[15px] leading-relaxed block text-left w-full cursor-pointer transition"
            >
              {question}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryQuestions;
