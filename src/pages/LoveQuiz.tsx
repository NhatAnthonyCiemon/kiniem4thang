import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, RotateCcw } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/constants';

const LoveQuiz: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    const handleAnswer = (optionIndex: number) => {
        if (isAnswered) return;

        setSelectedAnswer(optionIndex);
        setIsAnswered(true);

        if (optionIndex === QUIZ_QUESTIONS[currentQuestion].answer) {
            setScore((prev) => prev + 1);
        }

        setTimeout(() => {
            if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
                setCurrentQuestion((prev) => prev + 1);
                setSelectedAnswer(null);
                setIsAnswered(false);
            } else {
                setShowResult(true);
            }
        }, 1500);
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setIsAnswered(false);
    };

    const getResultMessage = () => {
        const percentage = (score / QUIZ_QUESTIONS.length) * 100;
        if (percentage === 100) return { emoji: '🎉', message: 'Hoàn hảo! Anh hiểu em rất rõ!', color: 'from-green-500 to-emerald-500' };
        if (percentage >= 80) return { emoji: '😊', message: 'Tuyệt vời! Anh biết em khá nhiều!', color: 'from-blue-500 to-cyan-500' };
        if (percentage >= 60) return { emoji: '🤔', message: 'Khá ổn! Nhưng anh cần tìm hiểu em nhiều hơn!', color: 'from-yellow-500 to-orange-500' };
        return { emoji: '😅', message: 'Anh cần dành thêm thời gian để hiểu em hơn!', color: 'from-red-500 to-rose-500' };
    };

    if (showResult) {
        const result = getResultMessage();
        return (
            <div className="container mx-auto px-3 sm:px-4 md:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl mx-auto text-center"
                >
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: 3 }}
                        className="text-6xl sm:text-7xl md:text-9xl mb-4 sm:mb-6"
                    >
                        {result.emoji}
                    </motion.div>

                    <div className="glass p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl">
                        <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r ${result.color} bg-clip-text text-transparent`}>
                            {result.message}
                        </h2>

                        <div className="mb-6 sm:mb-8">
                            <div className="text-5xl sm:text-6xl font-bold text-gray-800 mb-2">
                                {score}/{QUIZ_QUESTIONS.length}
                            </div>
                            <p className="text-gray-600 text-base sm:text-lg">Số câu đúng</p>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 mb-6 sm:mb-8">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(score / QUIZ_QUESTIONS.length) * 100}%` }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className={`h-3 sm:h-4 rounded-full bg-gradient-to-r ${result.color}`}
                            />
                        </div>

                        <button
                            onClick={resetQuiz}
                            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium hover:shadow-lg transition-shadow flex items-center gap-2 mx-auto min-h-[48px] active:scale-98"
                        >
                            <RotateCcw size={18} />
                            Làm lại
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    const question = QUIZ_QUESTIONS[currentQuestion];

    return (
        <div className="container mx-auto px-3 sm:px-4 md:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6 sm:mb-8"
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                    ❓ Love Quiz
                </h1>
                <p className="text-gray-600 text-base sm:text-lg"></p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
                {/* Progress */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
                        <span>Câu {currentQuestion + 1}/{QUIZ_QUESTIONS.length}</span>
                        <span>Điểm: {score}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                        <motion.div
                            className="h-2 sm:h-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        className="glass p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl"
                    >
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 text-center">
                            {question.question}
                        </h2>

                        <div className="space-y-3 sm:space-y-4">
                            {question.options.map((option, index) => {
                                const isCorrect = index === question.answer;
                                const isSelected = index === selectedAnswer;
                                const showFeedback = isAnswered && isSelected;

                                return (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: isAnswered ? 1 : 1.02 }}
                                        whileTap={{ scale: isAnswered ? 1 : 0.98 }}
                                        onClick={() => handleAnswer(index)}
                                        disabled={isAnswered}
                                        className={`w-full px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-left font-medium transition-all min-h-[48px] text-sm sm:text-base ${showFeedback
                                                ? isCorrect
                                                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                                                    : 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
                                                : 'glass hover:bg-pink-50 border-2 border-pink-200 hover:border-pink-500'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{option}</span>
                                            {showFeedback && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                >
                                                    {isCorrect ? <Check size={20} /> : <X size={20} />}
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default LoveQuiz;
