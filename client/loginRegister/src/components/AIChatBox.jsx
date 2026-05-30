import React, { useState } from "react";
import Axios from "axios";

function AIChatBox() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi! I am your dental assistant. How can I help?" },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await Axios.post("http://localhost:4446/ai-chat", {
        message: input,
      });

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response.data.reply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "AI chat is not working right now." },
      ]);
    }
  };

  return (
    <div className="card shadow" style={chatBoxStyle}>
      <div className="card-header text-white" style={{ backgroundColor: "#0f7a3b" }}>
        AI AppointSync Chat
      </div>

      <div className="card-body" style={chatBodyStyle}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 text-${msg.sender === "user" ? "end" : "start"}`}
          >
            <span
              className="badge"
              style={{
                backgroundColor: msg.sender === "user" ? "#ff9800" : "#0f7a3b",
                color: "#fff",
                padding: "10px",
                whiteSpace: "normal",
                textAlign: "left",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="card-footer d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button
          className="btn"
          style={{ backgroundColor: "#ff9800", color: "#0f3d2e" }}
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

const chatBoxStyle = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  width: "330px",
  zIndex: 1000,
};

const chatBodyStyle = {
  height: "260px",
  overflowY: "auto",
  backgroundColor: "#f8f9fa",
};

export default AIChatBox;