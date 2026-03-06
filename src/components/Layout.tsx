import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';
import Navbar from './Navbar';
import Particles from './Particles';

const Layout: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = 0.5;
            const handleEnded = () => setIsPlaying(false);
            audio.addEventListener('ended', handleEnded);
            return () => audio.removeEventListener('ended', handleEnded);
        }
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden">
            <Particles />
            <Navbar />
            <main className="relative z-10">
                <Outlet />
            </main>

            {/* Floating Music Player */}
            <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
                <AnimatePresence>
                    {showPlayer && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="glass px-4 py-3 rounded-2xl flex items-center gap-3 shadow-xl"
                        >
                            <motion.div
                                animate={isPlaying ? { rotate: 360 } : {}}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                className="text-2xl"
                            >
                                🎵
                            </motion.div>
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-600 font-medium">
                                    {isPlaying ? 'Đang phát...' : 'Nhạc nền'}
                                </span>
                                <span className="text-xs text-gray-500">Background Music</span>
                            </div>
                            <button
                                onClick={toggleMute}
                                className="w-8 h-8 rounded-full hover:bg-white/50 flex items-center justify-center transition-colors"
                            >
                                {isMuted ? (
                                    <VolumeX className="w-4 h-4 text-gray-700" />
                                ) : (
                                    <Volume2 className="w-4 h-4 text-gray-700" />
                                )}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Music Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                        togglePlay();
                        setShowPlayer(true);
                    }}
                    onMouseEnter={() => setShowPlayer(true)}
                    onMouseLeave={() => setShowPlayer(false)}
                    className="w-14 h-14 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 shadow-2xl flex items-center justify-center hover:shadow-pink-500/50 transition-shadow"
                >
                    <motion.div
                        animate={isPlaying ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.8, repeat: Infinity }}
                    >
                        <Music className="w-6 h-6 text-white" />
                    </motion.div>
                </motion.button>
            </div>

            <audio ref={audioRef} src="/music/bg.mp3" loop />
        </div>
    );
};

export default Layout;
