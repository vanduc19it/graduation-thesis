import { createChatBotMessage } from 'react-chatbot-kit';
import BotAvatar from './BotAvatar';

const botName = 'Marketplace Assistant';

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}, how can I help you ?`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#ae4cff',
    },
    chatButton: {
      backgroundColor: '#ae4cff',
    },
  },
 
};

export default config;