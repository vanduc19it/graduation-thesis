import React from 'react';
import axios from 'axios';
const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleUserMessage = async (message) => {
    try {
      const response = await axios.post('http://localhost:5000/chat', { message: message });
      const botMessage = createChatBotMessage(response.data.response);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));

    } catch (error) {
      console.error('Error sending request:', error);
      return 'Error occurred while processing your request.';
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleUserMessage,
          },
        });
      })}
    </div>
  );
};


export default ActionProvider;