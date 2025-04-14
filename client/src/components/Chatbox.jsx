import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiX, FiMessageSquare } from 'react-icons/fi';
import { RiRobot2Line, RiUserSmileLine } from 'react-icons/ri';

const chatDomain = 'https://b470-34-34-59-139.ngrok-free.app/chatbot/query';

const preprocessAnswer = (answer) => {
  return answer.replace("<|im_end|>", "");
}

const Chatbox = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Xin chào! Tôi có thể giúp gì cho bạn?",
      sender: "bot",
      timestamp: new Date().toISOString(),
      type: "text"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setShowChat(false);
      }
    };

    if (showChat) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendRequest = async (message, user_id) => {
    setIsTyping(true);
    try {
      const response = await fetch(chatDomain, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '92a67cda7ffc411c92b19e204f28b762'
        },
        body: JSON.stringify({
          question: message,
          user_id: user_id
        })
      });
      const data = await response.json();
      return data;
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
      type: "text"
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");

    const botResponse = await sendRequest(inputMessage, userInfo?.id);
    
    const newBotMessage = {
      id: messages.length + 2,
      text: preprocessAnswer(botResponse.answer),
      sender: "bot",
      timestamp: new Date().toISOString(),
      type: "text"
    }
    setMessages(prev => [...prev, newBotMessage]);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div ref={chatRef} className="fixed bottom-24 right-8 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowChat(!showChat)}
        className="bg-gradient-to-r from-violet-600 to-indigo-600 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <FiMessageSquare className="text-white text-2xl" />
      </motion.button>

      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 right-0 w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 relative">
              <div className="flex items-center space-x-4">
                <RiRobot2Line className="text-white text-3xl" />
                <div>
                  <h3 className="text-white text-lg font-semibold">AI Assistant</h3>
                  <p className="text-violet-200 text-sm">Luôn sẵn sàng hỗ trợ bạn</p>
                </div>
              </div>
              <button 
                onClick={() => setShowChat(false)}
                className="absolute top-6 right-6 text-white hover:text-violet-200 transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 h-[calc(100%-180px)] overflow-y-auto p-6 bg-gray-50">
              <div className="space-y-6">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex items-end space-x-2 max-w-[80%]`}>
                      {message.sender === "bot" && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                          <RiRobot2Line className="text-white text-sm" />
                        </div>
                      )}
                      <div className={`
                        ${message.sender === "user" 
                          ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                          : "bg-white text-gray-800"
                        }
                        rounded-2xl px-4 py-3 shadow-sm
                      `}>
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === "user" ? "text-violet-200" : "text-gray-400"}`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                          <RiUserSmileLine className="text-white text-sm" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center">
                      <RiRobot2Line className="text-white text-sm" />
                    </div>
                    <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-gray-100">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200 outline-none text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-3 rounded-xl hover:shadow-lg transition-all duration-200"
                >
                  <FiSend className="text-xl" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbox;