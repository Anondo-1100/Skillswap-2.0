import { useState, useEffect, useRef
} from 'react';
import { Search, Send, MessageCircle, MoreVertical, ChevronLeft, Shield, Bold, Italic, Underline, Smile
} from 'lucide-react';
import EmojiPicker,
{ EmojiClickData
} from 'emoji-picker-react';
import { Link
} from 'react-router-dom';

// Mock admin contact
const ADMIN_CONTACT = {
  id: 'admin',
  name: 'Support Team',
  avatar: 'https: //ui-avatars.com/api/?name=Support+Team&background=0D9488&color=fff',
  role: 'Administrator',
  online: true,
};

// Mock messages between user and admin
const MESSAGES = [
  {
    id: 1,
    sender: 'admin',
    text: 'Hello! How can we help you today?',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 24 hours ago
    isOwn: false,
  }
];

const ChatPage = () => {
  const [messages, setMessages
  ] = useState(MESSAGES);
  const [newMessage, setNewMessage
  ] = useState('');
  const [showEmojiPicker, setShowEmojiPicker
  ] = useState(false);
  const [selectedStyles, setSelectedStyles
  ] = useState({
    bold: false,
    italic: false,
    underline: false,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change with smooth behavior
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth'
    });
  },
  [messages
  ]);

  useEffect(() => {
    // Scroll to top when component mounts with smooth behavior
    window.scrollTo({ top: 0, behavior: 'smooth'
    });
  },
  []);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage(prev => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const applyStyle = (style: 'bold' | 'italic' | 'underline') => {
    setSelectedStyles(prev => ({
      ...prev,
      [style
      ]: !prev[style
      ]
    }));
  };

  const getStyledMessage = (text: string) => {
    let styledText = text;
    if (selectedStyles.bold) styledText = `**${styledText
    }**`;
    if (selectedStyles.italic) styledText = `*${styledText
    }*`;
    if (selectedStyles.underline) styledText = `_${styledText
    }_`;
    return styledText;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      sender: 'user',
      text: getStyledMessage(newMessage),
      timestamp: new Date().toISOString(),
      isOwn: true,
    };

    setMessages([...messages, newMsg
    ]);
    setNewMessage('');
    setSelectedStyles({ bold: false, italic: false, underline: false
    });
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([],
    { hour: '2-digit', minute: '2-digit'
    });
  };

  const formatMessageDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mx-auto max-w-3xl">
        <div className="flex flex-col bg-white dark:bg-gray-800 shadow-xl rounded-lg h-screen">
          { /* Chat Header */}
          <div className="flex items-center p-4 border-b dark:border-gray-700">
            <Link 
              to={`/profile/${ADMIN_CONTACT.name.toLowerCase().replace(' ', '-')
    }`
  }
              className="flex items-center hover:text-teal-600 dark:hover:text-teal-400"
            >
              <img
                src={ADMIN_CONTACT.avatar
  }
                alt={ADMIN_CONTACT.name
  }
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">{ADMIN_CONTACT.name
  }</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{ADMIN_CONTACT.role
  }</p>
              </div>
            </Link>
          </div>

          { /* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" id="messages-container">
            {messages.map((message, index) => {
              const showDateSeparator = index === 0 ||
                formatMessageDate(message.timestamp) !== formatMessageDate(messages[index - 1
      ].timestamp);

              return (
                <div key={message.id
      }>
                  {showDateSeparator && (
                    <div className="flex justify-center my-4">
                      <div className="bg-gray-100 dark:bg-gray-700 px-4 py-1 rounded-full font-medium text-gray-500 dark:text-gray-400 text-xs">
                        {formatMessageDate(message.timestamp)
        }
                      </div>
                    </div>
                  )
      }
                  <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'
        }`
      }>
                    <div className={`max-w-sm md:max-w-md ${message.isOwn ? 'bg-teal-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
        } rounded-lg px-4 py-2 shadow-sm`
      }>
                      <p>{message.text
      }</p>
                      <div className={`text-xs mt-1 ${message.isOwn ? 'text-teal-100' : 'text-gray-500 dark:text-gray-400'
        } text-right`
      }>
                        {formatMessageTime(message.timestamp)
      }
                      </div>
                    </div>
                  </div>
                </div>
              );
    })
  }
            <div ref={messagesEndRef
  } />
          </div>

          { /* Message Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-2">
              <button
                type="button"
                onClick={() => applyStyle('bold')
  }
                className={`p-2 rounded ${selectedStyles.bold ? 'bg-gray-200 dark:bg-gray-600' : ''
    }`
  }
              >
                <Bold size={
    18
  } />
              </button>
              <button
                type="button"
                onClick={() => applyStyle('italic')
  }
                className={`p-2 rounded ${selectedStyles.italic ? 'bg-gray-200 dark:bg-gray-600' : ''
    }`
  }
              >
                <Italic size={
    18
  } />
              </button>
              <button
                type="button"
                onClick={() => applyStyle('underline')
  }
                className={`p-2 rounded ${selectedStyles.underline ? 'bg-gray-200 dark:bg-gray-600' : ''
    }`
  }
              >
                <Underline size={
    18
  } />
              </button>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)
  }
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded"
                >
                  <Smile size={
    18
  } />
                </button>
                {showEmojiPicker && (
                  <div className="absolute bottom-full right-0 mb-2">
                    <EmojiPicker onEmojiClick={handleEmojiClick
    } />
                  </div>
                )
  }
              </div>
            </div>
            <form onSubmit={handleSendMessage
  } className="flex items-center">
              <input
                type="text"
                className={`flex-1 border border-gray-300 dark:border-gray-600 rounded-l-md py-2 px-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 ${
                  selectedStyles.bold ? 'font-bold' : ''
    } ${selectedStyles.italic ? 'italic' : ''
    } ${
                  selectedStyles.underline ? 'underline' : ''
    }`
  }
                placeholder="Type a message to support..."
                value={newMessage
  }
                onChange={(e) => setNewMessage(e.target.value)
  }
              />
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-r-md text-white"
              >
                <Send size={
    20
  } />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;