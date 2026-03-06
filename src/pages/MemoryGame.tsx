import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy } from 'lucide-react';

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const MemoryGame: React.FC = () => {
  const emojis = ['💕', '💗', '💖', '💝', '💘', '💞', '💓', '💌'];
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && !isWon) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isWon]);

  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.isMatched)) {
      setIsWon(true);
      setIsPlaying(false);
    }
  }, [cards]);

  const initializeGame = () => {
    const cardPairs = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(cardPairs);
    setFlippedCards([]);
    setMoves(0);
    setIsWon(false);
    setTimeElapsed(0);
    setIsPlaying(false);
  };

  const handleCardClick = (id: number) => {
    if (!isPlaying) setIsPlaying(true);

    if (flippedCards.length === 2) return;

    const card = cards.find((c) => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = cards.map((c) =>
      c.id === id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);
      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards.find((c) => c.id === firstId);
      const secondCard = newCards.find((c) => c.id === secondId);

      if (firstCard?.emoji === secondCard?.emoji) {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isMatched: true }
                : c
            )
          );
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
          🎮 Memory Game
        </h1>
        <p className="text-gray-600 text-base sm:text-lg">Tìm những cặp trái tim giống nhau!</p>
      </motion.div>

      {/* Stats */}
      <div className="max-w-2xl mx-auto mb-6 sm:mb-8 flex justify-center gap-3 sm:gap-4 flex-wrap">
        <div className="glass px-4 sm:px-6 py-2 sm:py-3 rounded-xl">
          <p className="text-xs sm:text-sm text-gray-600">Nước đi</p>
          <p className="text-xl sm:text-2xl font-bold text-pink-500">{moves}</p>
        </div>
        <div className="glass px-4 sm:px-6 py-2 sm:py-3 rounded-xl">
          <p className="text-xs sm:text-sm text-gray-600">Thời gian</p>
          <p className="text-xl sm:text-2xl font-bold text-pink-500">
            {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
          </p>
        </div>
        <button
          onClick={initializeGame}
          className="glass px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-pink-100 transition-colors flex items-center gap-2 min-h-[44px] active:scale-95"
        >
          <RotateCcw size={18} />
          <span className="font-medium text-sm sm:text-base">Chơi lại</span>
        </button>
      </div>

      {/* Game Board */}
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="aspect-square cursor-pointer"
              onClick={() => handleCardClick(card.id)}
            >
              <div className="relative w-full h-full preserve-3d">
                <motion.div
                  animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 preserve-3d"
                >
                  {/* Back */}
                  <div
                    className={`absolute inset-0 glass rounded-xl sm:rounded-2xl flex items-center justify-center backface-hidden ${
                      card.isMatched ? 'opacity-0' : ''
                    }`}
                  >
                    <div className="text-3xl sm:text-4xl">❓</div>
                  </div>

                  {/* Front */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl sm:rounded-2xl flex items-center justify-center backface-hidden"
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <div className="text-4xl sm:text-5xl md:text-6xl">{card.emoji}</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Win Modal */}
      <AnimatePresence>
        {isWon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl max-w-md w-full text-center mx-4"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="text-6xl sm:text-7xl md:text-8xl mb-4"
              >
                🏆
              </motion.div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                Chiến thắng!
              </h2>
              <p className="text-gray-600 mb-2 text-sm sm:text-base">Số nước đi: {moves}</p>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                Thời gian: {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
              </p>
              <button
                onClick={initializeGame}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium hover:shadow-lg transition-shadow min-h-[48px] active:scale-98"
              >
                Chơi lại
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
};

export default MemoryGame;
