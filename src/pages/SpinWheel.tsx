import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, Sparkles } from 'lucide-react';

const WHEEL_ITEMS = [
    { id: 1, text: 'Một nụ hôn ngọt ngào 💋', color: 'from-pink-500 to-rose-500' },
    { id: 2, text: 'Ôm em 30 giây 🤗', color: 'from-purple-500 to-pink-500' },
    { id: 3, text: 'Nói "Anh yêu em" 3 lần 💕', color: 'from-red-500 to-pink-500' },
    { id: 4, text: 'Massage vai cho em 5 phút 💆', color: 'from-orange-500 to-red-500' },
    { id: 5, text: 'Hát một bài tình ca 🎤', color: 'from-yellow-500 to-orange-500' },
    { id: 6, text: 'Mua quà bất ngờ cho em 🎁', color: 'from-green-500 to-yellow-500' },
    { id: 7, text: 'Nấu ăn cho em 🍳', color: 'from-teal-500 to-green-500' },
    { id: 8, text: 'Selfie cùng nhau 🤳', color: 'from-blue-500 to-teal-500' },
];

const SpinWheel: React.FC = () => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState<typeof WHEEL_ITEMS[0] | null>(null);
    const [showResult, setShowResult] = useState(false);

    const spinWheel = () => {
        if (isSpinning) return;

        setIsSpinning(true);
        setShowResult(false);
        setResult(null);

        // Random rotation: 5-8 full spins + random angle
        const spins = 5 + Math.floor(Math.random() * 3);
        const randomAngle = Math.floor(Math.random() * 360);
        const totalRotation = rotation + spins * 360 + randomAngle;

        setRotation(totalRotation);

        // Calculate which item is selected (opposite to rotation)
        setTimeout(() => {
            const normalizedAngle = (360 - (totalRotation % 360)) % 360;
            const itemAngle = 360 / WHEEL_ITEMS.length;
            const selectedIndex = Math.floor(normalizedAngle / itemAngle) % WHEEL_ITEMS.length;

            setResult(WHEEL_ITEMS[selectedIndex]);
            setShowResult(true);
            setIsSpinning(false);
        }, 4000);
    };

    return (
        <div className="container mx-auto px-3 sm:px-4 md:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6 sm:mb-8"
            >
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-5xl sm:text-6xl mb-3 sm:mb-4"
                >
                    🎡
                </motion.div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                    Vòng Quay May Mắn
                </h1>
                <p className="text-gray-600 text-base sm:text-lg">Quay và xem anh phải làm gì cho em! 💝</p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
                {/* Wheel Container */}
                <div className="relative mb-8">
                    {/* Pointer */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-10">
                        <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-red-500 drop-shadow-lg" />
                    </div>

                    {/* Wheel */}
                    <div className="glass p-4 sm:p-8 rounded-3xl">
                        <motion.div
                            className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 mx-auto"
                            animate={{ rotate: rotation }}
                            transition={{ duration: 4, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            {/* Wheel SVG */}
                            <svg className="w-full h-full" viewBox="0 0 200 200">
                                <defs>
                                    {WHEEL_ITEMS.map((item, index) => (
                                        <linearGradient key={item.id} id={`gradient-${item.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor={`var(--color-${index * 2})`} />
                                            <stop offset="100%" stopColor={`var(--color-${index * 2 + 1})`} />
                                        </linearGradient>
                                    ))}
                                </defs>

                                {WHEEL_ITEMS.map((item, index) => {
                                    const angle = (360 / WHEEL_ITEMS.length) * index;
                                    const sliceAngle = 360 / WHEEL_ITEMS.length;

                                    return (
                                        <g key={item.id}>
                                            <path
                                                d={describeArc(100, 100, 95, angle, angle + sliceAngle)}
                                                fill={`url(#gradient-${item.id})`}
                                                stroke="white"
                                                strokeWidth="2"
                                            />
                                        </g>
                                    );
                                })}

                                {/* Center Circle */}
                                <circle cx="100" cy="100" r="20" fill="white" stroke="#ec4899" strokeWidth="3" />
                                <text x="100" y="106" textAnchor="middle" fontSize="24" fill="#ec4899">🎯</text>
                            </svg>
                        </motion.div>
                    </div>
                </div>

                {/* Spin Button */}
                <div className="text-center mb-8">
                    <button
                        onClick={spinWheel}
                        disabled={isSpinning}
                        className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto min-h-[56px] active:scale-98"
                    >
                        <motion.div
                            animate={isSpinning ? { rotate: 360 } : {}}
                            transition={{ duration: 1, repeat: isSpinning ? Infinity : 0, ease: 'linear' }}
                        >
                            <RotateCw size={24} />
                        </motion.div>
                        <span>{isSpinning ? 'Đang quay...' : 'QUAY NGAY!'}</span>
                        <Sparkles size={24} />
                    </button>
                </div>

                {/* Result Modal */}
                <AnimatePresence>
                    {showResult && result && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className={`glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-center bg-gradient-to-br ${result.color} bg-opacity-10`}
                        >
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 0.5, repeat: 2 }}
                                className="text-6xl sm:text-7xl mb-4"
                            >
                                🎉
                            </motion.div>
                            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
                                Kết quả!
                            </h2>
                            <div className={`text-xl sm:text-2xl font-bold py-4 px-6 rounded-xl bg-gradient-to-r ${result.color} text-white shadow-lg`}>
                                {result.text}
                            </div>
                            <p className="text-gray-600 mt-4 text-sm sm:text-base">
                                Anh phải thực hiện ngay nhé! 💖
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Items List */}
                <div className="mt-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 text-gray-800">
                        Các phần thưởng:
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {WHEEL_ITEMS.map((item) => (
                            <motion.div
                                key={item.id}
                                whileHover={{ scale: 1.02 }}
                                className={`glass p-4 rounded-xl bg-gradient-to-r ${item.color} bg-opacity-10 border-2 border-transparent hover:border-pink-300 transition-all`}
                            >
                                <p className="text-sm sm:text-base font-medium text-gray-800">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper function to draw arc paths for wheel slices
function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
        'M', x, y,
        'L', start.x, start.y,
        'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        'Z'
    ].join(' ');
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    };
}

export default SpinWheel;
