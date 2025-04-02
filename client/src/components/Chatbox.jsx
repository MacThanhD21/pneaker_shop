import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const chatDomain = 'https://b470-34-34-59-139.ngrok-free.app/chatbot/query';


const slideUpAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const preprocessAnswer = (answer) => {
  
    // Process the message
    const response = answer.replace("<|im_end|>", "");

    return response;
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
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

  // Xử lý click outside
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

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendRequest = async (message, user_id) => await fetch(chatDomain, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': '92a67cda7ffc411c92b19e204f28b762'
    },
    body: JSON.stringify({
      question: message,
      user_id: user_id
    })
  })
    .then(response => response.json())
  // Xử lý gửi tin nhắn
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

    const botResponse = await sendRequest(inputMessage, userInfo.id);
    
    const newMessaege = {
      id: messages.length + 1,
      text: preprocessAnswer(botResponse.answer),
      sender: "bot",
      timestamp: new Date().toISOString(),
      type: "text"
    }
    setMessages(prev => [...prev, newMessaege]);
  };

  
  // Tạo phản hồi từ bot
  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("giày") || lowerMessage.includes("sneaker")) {
      return {
        id: messages.length + 2,
        sender: "bot",
        timestamp: new Date().toISOString(),
        type: "product",
        products: [
          {
            id: 1,
            name: "Yeezy Boost 700",
            price: "2,500,000đ",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop"
          },
          {
            id: 2,
            name: "Nike Air Max 270",
            price: "1,800,000đ",
            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop"
          }
        ]
      };
    }

    if (lowerMessage.includes("giờ") || lowerMessage.includes("thời gian")) {
      return {
        id: messages.length + 2,
        text: "Chúng tôi mở cửa từ 9:00 - 22:00 các ngày trong tuần.",
        sender: "bot",
        timestamp: new Date().toISOString(),
        type: "text"
      };
    }

    if (lowerMessage.includes("địa chỉ") || lowerMessage.includes("cửa hàng")) {
      return {
        id: messages.length + 2,
        text: "Cửa hàng chính của chúng tôi nằm tại 123 Đường ABC, Quận 1, TP.HCM.",
        sender: "bot",
        timestamp: new Date().toISOString(),
        type: "text"
      };
    }

    return {
      id: messages.length + 2,
      text: "Xin lỗi, tôi không hiểu câu hỏi của bạn. Bạn có thể hỏi về sản phẩm, giờ mở cửa hoặc địa chỉ cửa hàng.",
      sender: "bot",
      timestamp: new Date().toISOString(),
      type: "text"
    };
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div ref={chatRef}>
      <ChatButton onClick={() => setShowChat(!showChat)}>
        <ChatIcon>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 11.5C21 16.1944 17.1944 20 12.5 20C7.80558 20 4 16.1944 4 11.5C4 6.80558 7.80558 3 12.5 3C17.1944 3 21 6.80558 21 11.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 11.5H17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 7.5H17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 15.5H13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ChatIcon>
      </ChatButton>

      {showChat && (
        <ChatDialog>
          <ChatHeader>
            <ChatTitle>Chat với chúng tôi</ChatTitle>
            <CloseButton onClick={() => setShowChat(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </CloseButton>
          </ChatHeader>
          <ChatContent>
            <MessagesContainer>
              {messages.map((message) => (
                <ChatMessage key={message.id} isUser={message.sender === "user"}>
                  {message.type === "text" ? (
                    <>
                      <MessageText isUser={message.sender === "user"}>
                        {message.text}
                      </MessageText>
                      <MessageTime>{formatTime(message.timestamp)}</MessageTime>
                    </>
                  ) : message.type === "product" ? (
                    <ProductList>
                      {message.products.map((product) => (
                        <ProductItem key={product.id} to={`/shop/${product.id}`}>
                          <ProductImage src={product.image} alt={product.name} />
                          <ProductInfo>
                            <ProductName>{product.name}</ProductName>
                            <ProductPrice>{product.price}</ProductPrice>
                          </ProductInfo>
                        </ProductItem>
                      ))}
                    </ProductList>
                  ) : null}
                </ChatMessage>
              ))}
              <div ref={messagesEndRef} />
            </MessagesContainer>
            <ChatInput onSubmit={handleSendMessage}>
              <Input
                placeholder="Nhập tin nhắn..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <SendButton type="submit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </SendButton>
            </ChatInput>
          </ChatContent>
        </ChatDialog>
      )}
    </div>
  );
};

export default Chatbox;

const ChatButton = styled.button`
  position: fixed;
  bottom: 6rem;
  right: 2rem;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: white;
  border: 1px solid #ddd;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    border-color: #333;
  }

  ${mobile({
  bottom: '4.5rem',
  right: '1.5rem',
  width: '50px',
  height: '50px'
})}
`;

const ChatIcon = styled.span`
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
  }

  ${mobile({
  svg: {
    width: '20px',
    height: '20px'
  }
})}
`;

const ChatDialog = styled.div`
  position: fixed;
  bottom: 6rem;
  right: 7rem;
  width: 400px;
  height: 570px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${slideUpAnimation} 0.3s ease-out;
  z-index: 999;

  ${mobile({
  width: '90%',
  right: '5%',
  bottom: '7.5rem'
})}
`;

const ChatHeader = styled.div`
  padding: 1.5rem;
  background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%);
    pointer-events: none;
  }
`;

const ChatTitle = styled.h3`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.5s ease-out;

  &::before {
    content: '💬';
    font-size: 1.6rem;
    animation: ${bounceAnimation} 2s infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: white;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: rotate(90deg);
  }
`;

const ChatContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #f8f9fa;
  overflow: hidden;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 0;
`;

const ChatMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  max-width: 80%;
  margin-left: ${props => props.isUser ? 'auto' : '0'};
`;

const MessageText = styled.p`
  background: ${props => props.isUser ? '#FF6B6B' : 'white'};
  color: ${props => props.isUser ? 'white' : '#333'};
  padding: 1rem;
  border-radius: 15px;
  margin: 0;
  font-size: 0.95rem;
  white-space: pre-wrap;  // This preserves newlines
  word-wrap: break-word;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  word-wrap: break-word;
`;

const MessageTime = styled.span`
  font-size: 0.8rem;
  color: #6c757d;
  margin-top: 0.5rem;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const ProductItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  background: white;
  border-radius: 10px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h4`
  margin: 0;
  font-size: 0.9rem;
  color: #333;
`;

const ProductPrice = styled.p`
  margin: 0.3rem 0 0;
  font-size: 0.85rem;
  color: #FF6B6B;
  font-weight: 600;
`;

const ChatInput = styled.form`
  padding: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  background: white;
  border-top: 1px solid #eee;
  flex-shrink: 0;
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem;
  border: 1px solid #e9ecef;
  border-radius: 10px;
  font-size: 0.95rem;
  outline: none;
  transition: all 0.3s ease;
  cursor: text;

  &:focus {
    border-color: #FF6B6B;
    box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
  }
`;

const SendButton = styled.button`
  background: linear-gradient(135deg, #FF6B6B, #FF8E8E);
  color: white;
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
`;