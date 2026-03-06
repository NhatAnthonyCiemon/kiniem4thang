import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

const LoveCalculator: React.FC = () => {
  const [name1, setName1] = useState('Nguyễn Thành Nhật');
  const [name2, setName2] = useState('Mạc Thị Thanh Chiều');
  const [result, setResult] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateLove = () => {
    setIsCalculating(true);
    setResult(null);

    // Animated calculation
    setTimeout(() => {
      // Simple "calculation" - always return high value for our couple!
      const hash = (name1 + name2).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const score = 95 + (hash % 5); // Always 95-99%
      setResult(score);
      setIsCalculating(false);
    }, 2000);
  };

  const getResultMessage = (score: number) => {
    if (score >= 95) return { emoji: '💕', message: 'Hoàn hảo! Hai người là định mệnh của nhau!', color: 'from-pink-500 to-rose-500' };
    if (score >= 80) return { emoji: '😍', message: 'Tuyệt vời! Tình yêu rất mạnh mẽ!', color: 'from-purple-500 to-pink-500' };
    if (score >= 60) return { emoji: '💗', message: 'Khá tốt! Cần thêm thời gian để hiểu nhau!', color: 'from-blue-500 to-purple-500' };
    return { emoji: '💙', message: 'Cần cố gắng thêm!', color: 'from-blue-500 to-cyan-500' };
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 sm:mb-8"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-5xl sm:text-6xl mb-3 sm:mb-4"
        >
          💝
        </motion.div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          Love Calculator
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">Tính độ hợp của hai người</p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <div className="glass p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl">
          {/* Input Fields */}
          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên người thứ nhất
              </label>
              <input
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:outline-none transition-colors text-lg"
                placeholder="Nhập tên..."
              />
            </div>

            <div className="flex justify-center">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white text-2xl"
              >
                💕
              </motion.div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên người thứ hai
              </label>
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border-2 border-pink-200 focus:border-pink-500 focus:outline-none transition-colors text-lg"
                placeholder="Nhập tên..."
              />
            </div>
          </div>

          {/* Calculate Button */}
          <button
            onClick={calculateLove}
            disabled={isCalculating || !name1 || !name2}
            className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isCalculating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles size={20} />
                </motion.div>
                Đang tính toán...
              </>
            ) : (
              <>
                <Heart size={20} />
                Tính độ hợp
              </>
            )}
          </button>

          {/* Result */}
          {result !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 text-center"
            >
              <div className="relative">
                {/* Circle Progress */}
                <svg className="w-36 h-36 sm:w-48 sm:h-48 mx-auto" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#FFE4E1"
                    strokeWidth="12"
                  />
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 90}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 90 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 90 * (1 - result / 100) }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    transform="rotate(-90 100 100)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#f43f5e" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-6xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text"
                    >
                      {result}%
                    </motion.div>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-6"
              >
                {(() => {
                  const msg = getResultMessage(result);
                  return (
                    <>
                      <div className="text-5xl mb-4">{msg.emoji}</div>
                      <p className={`text-2xl font-bold bg-gradient-to-r ${msg.color} bg-clip-text text-transparent`}>
                        {msg.message}
                      </p>
                    </>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoveCalculator;
