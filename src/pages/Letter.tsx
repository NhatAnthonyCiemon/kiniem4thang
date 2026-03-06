import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { COUPLE_INFO } from '../data/constants';

const Letter: React.FC = () => {
    return (
        <div className="container mx-auto px-3 sm:px-4 md:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8 sm:mb-12"
            >
                <motion.div
                    className="text-5xl sm:text-6xl mb-3 sm:mb-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    💌
                </motion.div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                    Thư Từ Trái Tim Anh
                </h1>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="max-w-3xl mx-auto glass p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl"
            >
                <div className="prose prose-lg max-w-none">
                    <p className="text-2xl font-semibold text-rose-600 mb-6 text-center">💖 Bé yêu của anh 💖</p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Thời gian trôi nhanh ghê, tụi mình đã quen nhau được 4 tháng rồi đó bé. Nghĩ lại những ngày
                        qua, có những khoảnh khắc vui vẻ, cũng có lúc buồn buồn, nhưng với anh thì tất cả đều quý giá
                        lắm, vì bất kể lúc nào cũng có bé bên cạnh. Anh cảm thấy may mắn vô cùng khi được ở cạnh bé.
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                        Anh mong hai ta sẽ còn bên nhau dài dài, cùng làm thật nhiều điều đáng nhớ và nắm chặt tay
                        nhau vượt qua những khó khăn sắp tới.
                    </p>

                    <motion.div
                        className="my-8 flex justify-center"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <div className="flex gap-2 text-4xl">
                            {['💗', '💗', '💗', '💗', '💗'].map((heart, i) => (
                                <motion.span
                                    key={i}
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                                >
                                    {heart}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>

                    <p className="text-gray-700 leading-relaxed mb-8 text-center text-xl">
                        <strong className="text-pink-600">Iuuuuuuuuu bé nhiều lắm luôn 😘 💓</strong>
                    </p>

                    <div className="border-t-2 border-pink-200 pt-6 text-center">
                        <p className="text-sm text-gray-500 italic">
                            {new Date().toLocaleDateString('vi-VN', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Letter;
