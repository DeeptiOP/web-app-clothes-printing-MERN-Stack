import React, { useState } from "react";
import faqData from "./faq.json"; // <-- Import FAQ data

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "support", text: "Hi! Ask me about orders, returns, shipping, or payments." }
  ]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  //  Search for best matching FAQ answer
  const findFAQAnswer = (userMsg) => {
    const msg = userMsg.toLowerCase();
    const match = faqData.faq.find(f => msg.includes(f.question.toLowerCase().split(" ")[0]));
    return match ? match.answer : "I’m not sure about that. Our support team will assist you shortly.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);

    // Find FAQ-based answer
    const botReply = findFAQAnswer(input);

    // Clear input and send bot reply
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "support", text: botReply }]);
    }, 600);
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
        }}
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "300px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999
          }}
        >
          <div style={{ background: "#007bff", color: "#fff", padding: "10px", fontWeight: "bold", textAlign: "center" }}>
            Customer Support
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: "10px", overflowY: "auto", maxHeight: "250px" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ margin: "5px 0", textAlign: msg.sender === "user" ? "right" : "left" }}>
                <span
                  style={{
                    background: msg.sender === "user" ? "#007bff" : "#e5e5ea",
                    color: msg.sender === "user" ? "#fff" : "#000",
                    padding: "6px 10px",
                    borderRadius: "15px",
                    display: "inline-block",
                    maxWidth: "80%"
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              style={{ flex: 1, padding: "10px", border: "none", outline: "none" }}
            />
            <button
              onClick={sendMessage}
              style={{
                background: "#007bff",
                color: "#fff",
                border: "none",
                padding: "0 15px",
                cursor: "pointer"
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
