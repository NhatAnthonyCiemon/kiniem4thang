import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { PHOTOS } from '../data/constants';

const Gallery: React.FC = () => {
    const [selectedPhoto, setSelectedPhoto] = useState<typeof PHOTOS[0] | null>(null);
    const [likedPhotos, setLikedPhotos] = useState<Set<number>>(new Set());

    const toggleLike = (id: number) => {
        setLikedPhotos((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(id)) {
                newSet.delete(id);
            } else {
                newSet.add(id);
            }
            return newSet;
        });
    };

    // Hide navbar when lightbox is open
    useEffect(() => {
        const navbar = document.querySelector('nav');
        if (navbar) {
            if (selectedPhoto) {
                navbar.style.display = 'none';
            } else {
                navbar.style.display = '';
            }
        }

        return () => {
            if (navbar) {
                navbar.style.display = '';
            }
        };
    }, [selectedPhoto]);

    return (
        <div className="container mx-auto px-3 sm:px-4 md:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8 sm:mb-12"
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                    📸 Album Kỷ Niệm
                </h1>
                <p className="text-gray-600 text-base sm:text-lg">Những khoảnh khắc đẹp của bọn mình tháng 2</p>
            </motion.div>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {PHOTOS.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -10 }}
                        className="glass rounded-2xl overflow-hidden cursor-pointer group"
                        onClick={() => setSelectedPhoto(photo)}
                    >
                        <div className="relative aspect-[4/3] bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center overflow-hidden">
                            <img
                                src={photo.placeholder}
                                alt={photo.title}
                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-all">
                                    <motion.div
                                        className="text-6xl"
                                        animate={{ rotate: [0, 10, -10, 0] }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {photo.emoji}
                                    </motion.div>
                                </div>
                            </div>

                            {/* Like Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLike(photo.id);
                                }}
                                className="absolute top-3 right-3 p-2 rounded-full glass-pink hover:scale-110 transition-transform"
                            >
                                <Heart
                                    size={20}
                                    className={likedPhotos.has(photo.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                                />
                            </button>
                        </div>

                        <div className="p-5">
                            <h3 className="font-bold text-lg mb-1 text-gray-800">{photo.title}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">{photo.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-0 md:p-4"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-4xl w-full h-full md:h-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedPhoto(null)}
                                className="absolute top-4 right-4 md:-top-12 md:right-0 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
                            >
                                <X size={32} />
                            </button>

                            <div className="glass rounded-none md:rounded-3xl overflow-hidden h-full md:h-auto">
                                <div className="relative h-full md:aspect-[4/3] bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                                    <img
                                        src={selectedPhoto.placeholder}
                                        alt={selectedPhoto.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                <div className="hidden md:block p-8">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-4xl">{selectedPhoto.emoji}</span>
                                                <h2 className="text-3xl font-bold text-gray-800">{selectedPhoto.title}</h2>
                                            </div>
                                            <p className="text-gray-500">{selectedPhoto.date}</p>
                                        </div>
                                        <button
                                            onClick={() => toggleLike(selectedPhoto.id)}
                                            className="p-3 rounded-full glass-pink hover:scale-110 transition-transform"
                                        >
                                            <Heart
                                                size={24}
                                                className={likedPhotos.has(selectedPhoto.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                                            />
                                        </button>
                                    </div>
                                    <p className="text-gray-700 text-lg leading-relaxed">{selectedPhoto.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
