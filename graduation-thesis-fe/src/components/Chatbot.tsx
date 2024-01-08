import config from '../app/chatbot/config.js';
import MessageParser from '../app/chatbot/MessageParser.jsx';
import ActionProvider from '../app/chatbot/ActionProvider.js';
import Chatbot from 'react-chatbot-kit';

const ChatBotComponent = () => {
  return (
    <div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        headerText='Chatbot'
        placeholderText='Input placeholder'
      />
    </div>
  );
};

export default ChatBotComponent