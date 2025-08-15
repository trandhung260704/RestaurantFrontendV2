import React, { useState, useRef, useEffect } from 'react';
import './css/chatbot.css';
import { FaPaperPlane, FaRobot, FaUser, FaSpinner, FaRedo } from 'react-icons/fa';

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Xin chào! Tôi là trợ lý ảo của nhà hàng Eternity. Tôi có thể giúp gì cho bạn?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!sessionId) {
      setSessionId(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
  }, [sessionId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Tạo request body theo cấu trúc ChatRequest
      const requestBody = {
        sessionId: sessionId,
        message: inputMessage
      };

      console.log('Sending request to chatbot:', requestBody);

      const response = await fetch('http://localhost:8099/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        const botResponse = await response.text();
        console.log('Bot response:', botResponse);
        
        const botMessage = {
          id: Date.now() + 1,
          text: botResponse,
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const errorText = await response.text();
        console.error('Chatbot API error:', response.status, errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      let errorText = "Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại sau.";
      
      if (error.message.includes('Failed to fetch')) {
        errorText = "Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng.";
      } else if (error.message.includes('API Error')) {
        errorText = "Lỗi server. Vui lòng thử lại sau.";
      }
      
      const errorMessage = {
        id: Date.now() + 1,
        text: errorText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetSession = () => {
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(newSessionId);
    setMessages([
      {
        id: Date.now(),
        text: "Xin chào! Tôi là trợ lý ảo của nhà hàng Eternity. Tôi có thể giúp gì cho bạn?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="chatbot-title">
          <FaRobot className="chatbot-icon" />
          <h2>Trợ lý ảo Eternity</h2>
          <button 
            onClick={resetSession} 
            className="reset-button"
            title="Bắt đầu cuộc trò chuyện mới"
          >
            <FaRedo />
          </button>
        </div>
        <p className="chatbot-subtitle">Hỏi đáp về nhà hàng, menu và dịch vụ</p>
        {sessionId && (
          <div className="session-info">
            <small>Session: {sessionId.substring(0, 20)}...</small>
          </div>
        )}
      </div>

      <div className="chatbot-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-avatar">
              {message.sender === 'user' ? (
                <FaUser className="user-avatar-icon" />
              ) : (
                <FaRobot className="bot-avatar-icon" />
              )}
            </div>
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-time">
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message bot-message">
            <div className="message-avatar">
              <FaRobot className="bot-avatar-icon" />
            </div>
            <div className="message-content">
              <div className="message-text">
                <FaSpinner className="loading-spinner" />
                Đang nhập...
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input">
        <div className="input-container">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập tin nhắn của bạn..."
            disabled={isLoading}
            rows="1"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="send-button"
          >
            <FaPaperPlane />
          </button>
        </div>
        <div className="input-hint">
          Nhấn Enter để gửi, Shift + Enter để xuống dòng
        </div>
      </div>
    </div>
  );
} 