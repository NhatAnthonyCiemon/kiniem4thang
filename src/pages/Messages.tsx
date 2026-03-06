import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Trash2 } from 'lucide-react';
import { LOVE_MESSAGES } from '../data/constants';

interface Message {
  id: number;
  text: string;
  emoji: string;
  timestamp: Date;
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(
    LOVE_MESSAGES.map((msg, i) => ({
      id: i,
      text: msg,
      emoji: ['💕', '💗', '💖', '💝', '💘', '💞', '💓', '💌'][i % 8],
      timestamp: new Date(Date.now() - (LOVE_MESSAGES.length - i) * 86400000),
    }))
  );
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      text: newMessage,
      emoji: ['💕', '💗', '💖', '💝', '💘', '💞', '💓', '💌'][Math.floor(Math.random() * 8)],
      timestamp: new Date(),
    };

    setMessages([message, ...messages]);
    setNewMessage('');
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          💌 Lời Nhắn Tình Yêu
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">Những điều muốn nói với em</p>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        {/* Add Message Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-4 sm:p-6 rounded-2xl sm:rounded-3xl mb-6 sm:mb-8"
        >
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Viết lời nhắn yêu thương..."
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:outline-none transition-colors text-sm sm:text-base"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px] active:scale-98"
            >
              <Send size={18} />
              <span>Gửi</span>
            </button>
          </form>
        </motion.div>

        {/* Messages List */}
        <div className="space-y-3 sm:space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="glass p-4 sm:p-6 rounded-xl sm:rounded-2xl group hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  className="text-3xl sm:text-4xl flex-shrink-0"
                >
                  {message.emoji}
                </motion.div>

                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 text-base sm:text-lg leading-relaxed mb-1 sm:mb-2">
                    {message.text}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {message.timestamp.toLocaleDateString('vi-VN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                <button
                  onClick={() => deleteMessage(message.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-100 rounded-lg text-red-500 min-h-[40px] min-w-[40px] flex items-center justify-center"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">💭</div>
            <p className="text-gray-500 text-lg">Chưa có lời nhắn nào. Hãy viết điều gì đó!</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Messages;
