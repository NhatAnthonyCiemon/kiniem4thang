import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE_EVENTS } from '../data/constants';

const Timeline: React.FC = () => {
    return (
        <div className="container mx-auto px-0 sm:px-4 md:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8 sm:mb-12 px-3 sm:px-0"
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                    ⏰ Dòng Thời Gian
                </h1>
                <p className="text-gray-600 text-base sm:text-lg">Hành trình tình yêu của chúng ta</p>
            </motion.div>

            <div className="pl-3 sm:pl-0 sm:max-w-4xl sm:mx-auto">
                {TIMELINE_EVENTS.map((event, index) => (
                    <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className={`flex items-start gap-3 sm:gap-6 mb-8 sm:mb-12 ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}
                    >
                        {/* Content */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex-1 glass p-4 sm:p-6 rounded-r-2xl sm:rounded-2xl"
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-3xl sm:text-4xl">{event.emoji}</span>
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">{event.title}</h3>
                                    <p className="text-xs sm:text-sm text-pink-500 font-medium">{event.date}</p>
                                </div>
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{event.description}</p>
                        </motion.div>

                        {/* Timeline Dot */}
                        <div className="relative flex-shrink-0 mt-2 mr-2 sm:mr-0">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg"
                            />
                            {index < TIMELINE_EVENTS.length - 1 && (
                                <div className="absolute top-5 sm:top-6 left-1/2 -translate-x-1/2 w-0.5 sm:w-1 h-8 sm:h-12 bg-gradient-to-b from-pink-500 to-rose-500" />
                            )}
                        </div>

                        {/* Spacer - hidden on mobile */}
                        <div className="hidden sm:block flex-1" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Timeline;
