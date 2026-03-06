import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Calendar, Image, Clock, Gamepad2, MessageSquare } from 'lucide-react';
import { COUPLE_INFO } from '../data/constants';

const Home: React.FC = () => {
    const [daysTogether, setDaysTogether] = useState(0);
    const [timeUnits, setTimeUnits] = useState({
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            const diff = now.getTime() - COUPLE_INFO.startDate.getTime();

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            setDaysTogether(days);

            const months = Math.floor(days / 30);
            const remainingDays = days % 30;
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            setTimeUnits({ months, days: remainingDays, hours, minutes, seconds });
        };

        calculateTime();
        const interval = setInterval(calculateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            to: '/gallery',
            icon: Image,
            title: 'Album Ảnh',
            description: 'Những khoảnh khắc đẹp nhất',
            color: 'from-pink-500 to-rose-500',
            emoji: '📸',
        },
        {
            to: '/timeline',
            icon: Clock,
            title: 'Dòng Thời Gian',
            description: 'Hành trình của chúng ta',
            color: 'from-purple-500 to-pink-500',
            emoji: '⏰',
        },
        {
            to: '/memory-game',
            icon: Gamepad2,
            title: 'Mini Game',
            description: 'Trò chơi ghép hình vui nhộn',
            color: 'from-blue-500 to-purple-500',
            emoji: '🎮',
        },
        {
            to: '/quiz',
            icon: MessageSquare,
            title: 'Love Quiz',
            description: 'Làm tí quiz vui vui',
            color: 'from-rose-500 to-pink-500',
            emoji: '❓',
        },
        {
            to: '/love-calculator',
            icon: Heart,
            title: 'Love Calculator',
            description: 'Tính độ hợp nhau',
            color: 'from-red-500 to-rose-500',
            emoji: '💝',
        },
        {
            to: '/letter',
            icon: Heart,
            title: 'Thư Tình',
            description: 'Lời yêu thương dành cho em',
            color: 'from-red-500 to-pink-500',
            emoji: '💌',
        },
        {
            to: '/truth-or-dare',
            icon: MessageSquare,
            title: 'Truth or Dare',
            description: 'Thật hay thách',
            color: 'from-teal-500 to-cyan-500',
            emoji: '💭',
        },

    ];

    return (
        <div className="container mx-auto px-3 sm:px-4 md:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8 sm:mb-12"
            >
                <motion.div
                    className="text-6xl sm:text-7xl md:text-8xl mb-4 sm:mb-6"
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    💕
                </motion.div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-3 sm:mb-4 px-2 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 bg-clip-text text-transparent">
                    Kỷ Niệm 4 Tháng Yêu Nhau
                </h1>

                <div className="flex flex-col md:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8">
                    <motion.div
                        className="glass-pink px-6 sm:px-8 py-3 sm:py-4 rounded-2xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <p className="text-lg sm:text-xl md:text-2xl font-bold text-rose-600">{COUPLE_INFO.boy}</p>
                    </motion.div>

                    <motion.div
                        className="text-3xl sm:text-4xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        💗
                    </motion.div>

                    <motion.div
                        className="glass-pink px-6 sm:px-8 py-3 sm:py-4 rounded-2xl"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <p className="text-lg sm:text-xl md:text-2xl font-bold text-rose-600">{COUPLE_INFO.girl}</p>
                    </motion.div>
                </div>

                {/* Countdown */}
                <div className="glass p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl max-w-4xl mx-auto mb-6 sm:mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 flex-wrap">
                        <Calendar className="text-pink-500" size={20} />
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center">
                            Bắt đầu từ: {COUPLE_INFO.startDate.toLocaleDateString('vi-VN', {
                                hour: '2-digit',
                                minute: '2-digit',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </p>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                        {[
                            { label: 'Tháng', value: timeUnits.months },
                            { label: 'Ngày', value: timeUnits.days },
                            { label: 'Giờ', value: timeUnits.hours },
                            { label: 'Phút', value: timeUnits.minutes },
                            { label: 'Giây', value: timeUnits.seconds },
                        ].map((unit, index) => (
                            <motion.div
                                key={unit.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`bg-gradient-to-br from-pink-500 to-rose-500 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl text-white ${index >= 3 ? 'col-span-1 sm:col-span-1' : ''
                                    }`}
                            >
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">{unit.value}</div>
                                <div className="text-xs sm:text-sm font-medium opacity-90">{unit.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p
                        className="text-2xl sm:text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text mt-4 sm:mt-6"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {daysTogether} ngày bên nhau ❤️
                    </motion.p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <Link key={feature.to} to={feature.to}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="glass p-6 rounded-2xl hover:shadow-2xl transition-all cursor-pointer group"
                            >
                                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 mx-auto group-hover:rotate-12 transition-transform`}>
                                    <span className="text-3xl">{feature.emoji}</span>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Home;
