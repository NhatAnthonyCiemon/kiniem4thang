import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Zap, Shuffle } from 'lucide-react';

const TRUTHS = [
    "Điều gì về em khiến anh yêu nhất?",
    "Khoảnh khắc nào anh nhớ nhất về chúng mình?",
    "Em có thói quen nào anh thấy dễ thương?",
    "Anh mơ về tương lai của chúng mình như thế nào?",
    "Điều gì khiến anh cảm thấy may mắn khi có em?",
    "Món quà ý nghĩa nhất em từng tặng anh là gì?",
    "Anh muốn đi du lịch đâu cùng em nhất?",
    "Ấn tượng đầu tiên của anh đối với em?",
    "Điều gì về tính cách em khiến anh cảm thấy tuyệt vời nhất?"
];

const DARES = [
    "Hát một bài tình ca cho em nghe 🎤",
    "Viết một bài thơ ngắn về em 📝",
    "Làm 10 cái hít đất và nói 'Em yêu anh' mỗi lần 💪",
    "Nhảy một điệu nhảy vui nhộn 💃",
    "Gửi một tin nhắn ngọt ngào cho em ngay bây giờ 💌",
    "Đọc to câu nói 'Tôi là concho' ::) 📢",
    "Gửi một bức ảnh selfie với biểu cảm dễ thương cho em 🤳",
    "Tặng em 1 món quà bất ngờ 🎁",
    "Đăng story Facebook về em 📸",
    "Nói 'Anh yêu em' bằng 3 thứ tiếng khác nhau 🗣️"
];

const TruthOrDare: React.FC = () => {
    const [mode, setMode] = useState<'truth' | 'dare' | null>(null);
    const [currentItem, setCurrentItem] = useState<string>('');
    const [isRevealing, setIsRevealing] = useState(false);
    const [usedTruths, setUsedTruths] = useState<Set<number>>(new Set());
    const [usedDares, setUsedDares] = useState<Set<number>>(new Set());

    const selectMode = (selectedMode: 'truth' | 'dare') => {
        setMode(selectedMode);
        setIsRevealing(true);

        const items = selectedMode === 'truth' ? TRUTHS : DARES;
        const usedItems = selectedMode === 'truth' ? usedTruths : usedDares;

        // Get available items
        let availableIndices = items.map((_, i) => i).filter(i => !usedItems.has(i));

        // Reset if all items used
        if (availableIndices.length === 0) {
            if (selectedMode === 'truth') {
                setUsedTruths(new Set());
            } else {
                setUsedDares(new Set());
            }
            availableIndices = items.map((_, i) => i);
        }

        // Random selection
        const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];

        // Mark as used
        if (selectedMode === 'truth') {
            setUsedTruths(new Set([...usedTruths, randomIndex]));
        } else {
            setUsedDares(new Set([...usedDares, randomIndex]));
        }

        setTimeout(() => {
            setCurrentItem(items[randomIndex]);
            setIsRevealing(false);
        }, 1000);
    };

    const reset = () => {
        setMode(null);
        setCurrentItem('');
        setIsRevealing(false);
    };

    return (
        <div className="container mx-auto px-3 sm:px-4 md:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6 sm:mb-8"
            >
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-5xl sm:text-6xl mb-3 sm:mb-4"
                >
                    💭
                </motion.div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                    Truth or Dare
                </h1>
                <p className="text-gray-600 text-base sm:text-lg">Chọn Thật hay Thách và xem điều gì sẽ xảy ra! 😊</p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
                {!mode ? (
                    // Mode Selection
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => selectMode('truth')}
                            className="glass p-8 sm:p-12 rounded-2xl sm:rounded-3xl hover:shadow-2xl transition-all group"
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-6xl sm:text-7xl mb-4"
                            >
                                💬
                            </motion.div>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                                THẬT
                            </h2>
                            <p className="text-gray-600 text-sm sm:text-base">
                                Trả lời một câu hỏi chân thật về cảm xúc
                            </p>
                            <div className="mt-4 flex items-center justify-center gap-2 text-blue-500">
                                <MessageCircle size={20} />
                                <span className="font-medium">Chọn ngay</span>
                            </div>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => selectMode('dare')}
                            className="glass p-8 sm:p-12 rounded-2xl sm:rounded-3xl hover:shadow-2xl transition-all group"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="text-6xl sm:text-7xl mb-4"
                            >
                                ⚡
                            </motion.div>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                                THÁCH
                            </h2>
                            <p className="text-gray-600 text-sm sm:text-base">
                                Thực hiện một thử thách thú vị
                            </p>
                            <div className="mt-4 flex items-center justify-center gap-2 text-orange-500">
                                <Zap size={20} />
                                <span className="font-medium">Chọn ngay</span>
                            </div>
                        </motion.button>
                    </div>
                ) : (
                    // Result Display
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center"
                        >
                            {isRevealing ? (
                                <motion.div
                                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                                    transition={{ rotate: { duration: 1, repeat: Infinity }, scale: { duration: 0.5, repeat: Infinity } }}
                                    className="text-8xl sm:text-9xl mb-8"
                                >
                                    {mode === 'truth' ? '💬' : '⚡'}
                                </motion.div>
                            ) : (
                                <>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className={`glass p-8 sm:p-12 rounded-2xl sm:rounded-3xl mb-6 ${mode === 'truth'
                                            ? 'bg-gradient-to-br from-blue-50 to-cyan-50'
                                            : 'bg-gradient-to-br from-orange-50 to-red-50'
                                            }`}
                                    >
                                        <div className="text-6xl sm:text-7xl mb-6">
                                            {mode === 'truth' ? '💬' : '⚡'}
                                        </div>

                                        <h2 className={`text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-r ${mode === 'truth'
                                            ? 'from-blue-500 to-cyan-500'
                                            : 'from-orange-500 to-red-500'
                                            } bg-clip-text text-transparent`}>
                                            {mode === 'truth' ? 'THẬT' : 'THÁCH'}
                                        </h2>

                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="bg-white p-6 sm:p-8 rounded-xl shadow-lg"
                                        >
                                            <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-800 leading-relaxed">
                                                {currentItem}
                                            </p>
                                        </motion.div>

                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                            className="text-gray-600 mt-6 text-sm sm:text-base"
                                        >
                                            {mode === 'truth'
                                                ? 'Hãy trả lời thật lòng nhé! 💕'
                                                : 'Thực hiện thử thách ngay! 🔥'}
                                        </motion.p>
                                    </motion.div>

                                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                                        <button
                                            onClick={() => selectMode(mode)}
                                            className={`bg-gradient-to-r ${mode === 'truth'
                                                ? 'from-blue-500 to-cyan-500'
                                                : 'from-orange-500 to-red-500'
                                                } text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 min-h-[48px] active:scale-98`}
                                        >
                                            <Shuffle size={20} />
                                            Câu khác
                                        </button>
                                        <button
                                            onClick={reset}
                                            className="glass px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium hover:bg-pink-100 transition-all min-h-[48px] active:scale-98"
                                        >
                                            Chọn lại
                                        </button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                )}

                {/* Instructions */}
                {!mode && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 glass p-6 rounded-2xl"
                    >
                        <h3 className="text-xl font-bold mb-3 text-center text-gray-800">
                            Cách chơi:
                        </h3>
                        <div className="space-y-2 text-gray-600 text-sm sm:text-base">
                            <p>• <span className="font-medium text-blue-500">THẬT</span>: Trả lời một câu hỏi về cảm xúc, suy nghĩ</p>
                            <p>• <span className="font-medium text-orange-500">THÁCH</span>: Thực hiện một thử thách vui nhộn</p>
                            <p>• Hãy chân thật và tận hưởng khoảnh khắc này! 💝</p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default TruthOrDare;
