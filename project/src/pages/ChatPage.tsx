import { useState, useEffect, useRef } from 'react';
import { Search, Send, Phone, Video, MoreVertical, ChevronLeft, User } from 'lucide-react';

// Mock data for chat
const CONTACTS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    lastMessage: 'I can help you with graphic design basics tomorrow at 3pm.',
    timestamp: '1 hour ago',
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    lastMessage: 'Thanks for the Python tutorial! It was really helpful.',
    timestamp: '2 hours ago',
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: 'Emma Wilson',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    lastMessage: 'Let me know when you want to start the piano lessons.',
    timestamp: 'Yesterday',
    unread: 0,
    online: true,
  },
  {
    id: 4,
    name: 'David Rodriguez',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    lastMessage: 'I just sent you the Spanish practice materials.',
    timestamp: 'Yesterday',
    unread: 0,
    online: false,
  },
  {
    id: 5,
    name: 'Olivia Taylor',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg',
    lastMessage: 'Great yoga session today! Looking forward to learning coding from you.',
    timestamp: '2 days ago',
    unread: 0,
    online: true,
  },
];

// Mock messages for a conversation
const MESSAGES = [
  {
    id: 1,
    sender: 1, // Sarah
    text: 'Hi there! I noticed you&apos;re skilled in graphic design. I&apos;m looking to learn the basics.',
    timestamp: '2023-04-10T10:30:00',
    isOwn: false,
  },
  {
    id: 2,
    sender: 'me',
    text: 'Hey Sarah! Yes, I&apos;ve been doing graphic design for about 5 years now. I&apos;d be happy to teach you the fundamentals.',
    timestamp: '2023-04-10T10:32:00',
    isOwn: true,
  },
  {
    id: 3,
    sender: 1,
    text: 'That would be amazing! I&apos;m particularly interested in learning Illustrator and Photoshop. Do you use those tools?',
    timestamp: '2023-04-10T10:35:00',
    isOwn: false,
  },
  {
    id: 4,
    sender: 'me',
    text: 'Yes, I use both regularly! We can start with the basics of either one. Do you have any preference?',
    timestamp: '2023-04-10T10:38:00',
    isOwn: true,
  },
  {
    id: 5,
    sender: 1,
    text: 'I think Illustrator would be a good starting point for me. I&apos;m interested in creating vector graphics and logos.',
    timestamp: '2023-04-10T10:42:00',
    isOwn: false,
  },
  {
    id: 6,
    sender: 'me',
    text: 'Sounds good! Illustrator is perfect for vector work. When would you like to start? I&apos;m free most evenings and weekends.',
    timestamp: '2023-04-10T10:45:00',
    isOwn: true,
  },
  {
    id: 7,
    sender: 1,
    text: 'Weekends work best for me. How about this Saturday at 2pm? We could do a video call for the first session.',
    timestamp: '2023-04-10T10:50:00',
    isOwn: false,
  },
  {
    id: 8,
    sender: 'me',
    text: 'Saturday at 2pm works perfectly! I&apos;ll send you a list of things to prepare beforehand. Looking forward to it!',
    timestamp: '2023-04-10T10:52:00',
    isOwn: true,
  },
  {
    id: 9,
    sender: 1,
    text: 'Great! Thank you so much for offering to help. I&apos;m excited to learn from you.',
    timestamp: '2023-04-10T10:55:00',
    isOwn: false,
  },
  {
    id: 10,
    sender: 1,
    text: 'By the way, I noticed you wanted to learn Spanish. I&apos;m fluent and could help you with that in exchange!',
    timestamp: '2023-04-10T11:00:00',
    isOwn: false,
  },
  {
    id: 11,
    sender: 'me',
    text: 'That would be perfect! I&apos;ve been wanting to improve my Spanish for a while now. We can definitely arrange a skill swap.',
    timestamp: '2023-04-10T11:05:00',
    isOwn: true,
  },
  {
    id: 12,
    sender: 1,
    text: 'I can help you with graphic design basics tomorrow at 3pm. Does that work for you?',
    timestamp: '2023-04-10T15:30:00',
    isOwn: false,
  },
];

const ChatPage = () => {
  const [selectedContact, setSelectedContact] = useState<typeof CONTACTS[0] | null>(null);
  const [messages, setMessages] = useState(MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(CONTACTS);
  const [isMobileViewExpanded, setIsMobileViewExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm) {
      const filtered = CONTACTS.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(CONTACTS);
    }
  }, [searchTerm]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: 'me',
      text: newMessage,
      timestamp: new Date().toISOString(),
      isOwn: true,
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
      <div className="max-w-7xl mx-auto">
        <div className="h-screen flex overflow-hidden bg-white dark:bg-gray-800 shadow-xl rounded-lg">
          {/* Contact List - Hidden on mobile when chat is expanded */}
          <div className={`w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 ${isMobileViewExpanded ? 'hidden md:block' : 'block'}`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Messages</h2>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
              </div>
            </div>
            
            <div className="overflow-y-auto h-[calc(100vh-136px)]">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${selectedContact?.id === contact.id ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                    onClick={() => {
                      setSelectedContact(contact);
                      setIsMobileViewExpanded(true);
                    }}
                  >
                    <div className="flex items-start">
                      <div className="relative">
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          className="h-12 w-12 rounded-full object-cover mr-4"
                        />
                        {contact.online && (
                          <span className="absolute bottom-0 right-3 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white dark:ring-gray-800"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {contact.name}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {contact.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {contact.lastMessage}
                        </p>
                      </div>
                      {contact.unread > 0 && (
                        <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-teal-600 text-white text-xs font-medium">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No contacts found
                </div>
              )}
            </div>
          </div>
          
          {/* Chat Area - Full screen on mobile when expanded */}
          <div className={`w-full md:w-2/3 ${!isMobileViewExpanded ? 'hidden md:block' : 'block'}`}>
            {selectedContact ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center">
                    <button 
                      className="md:hidden mr-2 text-gray-500 dark:text-gray-400"
                      onClick={() => setIsMobileViewExpanded(false)}
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <div className="relative">
                      <img
                        src={selectedContact.avatar}
                        alt={selectedContact.name}
                        className="h-10 w-10 rounded-full object-cover mr-3"
                      />
                      {selectedContact.online && (
                        <span className="absolute bottom-0 right-2 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white dark:ring-gray-800"></span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900 dark:text-white">
                        {selectedContact.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {selectedContact.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Phone size={20} />
                    </button>
                    <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Video size={20} />
                    </button>
                    <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="h-[calc(100vh-210px)] overflow-y-auto p-4 space-y-4" id="messages-container">
                  {messages.map((message, index) => {
                    // Show date separator if this is the first message or if the date changes
                    const showDateSeparator = index === 0 || 
                      formatMessageDate(message.timestamp) !== formatMessageDate(messages[index - 1].timestamp);
                    
                    return (
                      <div key={message.id}>
                        {showDateSeparator && (
                          <div className="flex justify-center my-4">
                            <div className="px-4 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-500 dark:text-gray-400">
                              {formatMessageDate(message.timestamp)}
                            </div>
                          </div>
                        )}
                        <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-sm md:max-w-md ${message.isOwn ? 'bg-teal-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'} rounded-lg px-4 py-2 shadow-sm`}>
                            <p>{message.text}</p>
                            <div className={`text-xs mt-1 ${message.isOwn ? 'text-teal-100' : 'text-gray-500 dark:text-gray-400'} text-right`}>
                              {formatMessageTime(message.timestamp)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <form onSubmit={handleSendMessage} className="flex items-center">
                    <input
                      type="text"
                      className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-md py-2 px-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-r-md"
                    >
                      <Send size={20} />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center p-6">
                <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                  <User size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm">
                  Choose a contact from the list to start chatting or search for someone specific.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;