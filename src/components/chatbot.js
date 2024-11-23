import React, { useState } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hello! How can I help you?" }]);
  const [userInput, setUserInput] = useState("");

  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    // 사용자 메시지 추가
    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);

    // Flask 서버에 요청
    const response = await fetch("http://127.0.0.1:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userInput }),
    });
    const data = await response.json();

    // 봇 응답 추가
    setMessages([...newMessages, { sender: "bot", text: data.reply }]);
    setUserInput("");
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", width: "300px", backgroundColor: "#f0f0f0", borderRadius: "10px", padding: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.3)" }}>
      <h4 style={{ margin: "0", padding: "10px 0", textAlign: "center", borderBottom: "1px solid #ddd" }}>Chatbot</h4>
      <div style={{ height: "200px", overflowY: "auto", marginBottom: "10px" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ textAlign: msg.sender === "bot" ? "left" : "right" }}>
            <p style={{ display: "inline-block", backgroundColor: msg.sender === "bot" ? "#e0e0e0" : "#007bff", color: msg.sender === "bot" ? "#000" : "#fff", padding: "5px 10px", borderRadius: "10px", margin: "5px 0" }}>
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        style={{ width: "75%", padding: "5px", marginRight: "5px" }}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage} style={{ width: "20%", padding: "5px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px" }}>Send</button>
    </div>
  );
}

export default Chatbot;
