import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Image, Clock, Mail, Gamepad2, MessageSquare, Heart, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [isGamesOpen, setIsGamesOpen] = useState(false);

    const links = [
        { to: '/', icon: Home, label: 'Trang Chủ' },
        { to: '/gallery', icon: Image, label: 'Album' },
        { to: '/timeline', icon: Clock, label: 'Timeline' },
        { to: '/letter', icon: Mail, label: 'Thư Tình' },
    ];

    const gameLinks = [
        { to: '/memory-game', icon: '🧠', label: 'Memory Game' },
        { to: '/quiz', icon: '❓', label: 'Love Quiz' },
        { to: '/love-calculator', icon: '💝', label: 'Love Calculator' },
        { to: '/truth-or-dare', icon: '💭', label: 'Truth or Dare' },
    ];

    const isGameActive = gameLinks.some(game => location.pathname === game.to);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass safe-top">
            <div className="container mx-auto px-3 sm:px-4">
                <div className="flex items-center justify-between h-14 sm:h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group no-select" onClick={() => setIsOpen(false)}>
                        <motion.span
                            className="text-xl sm:text-2xl"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            💕
                        </motion.span>
                        <span className="font-bold text-base sm:text-xl bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                            4 Tháng Yêu
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {links.map((link) => {
                            const Icon = link.icon;
                            const isActive = location.pathname === link.to;
                            return (
                                <Link
                                    key={link.to}
                                    to={link.to}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${isActive
                                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                                        : 'hover:bg-pink-100 text-gray-700'
                                        }`}
                                >
                                    <Icon size={18} />
                                    <span className="text-sm font-medium">{link.label}</span>
                                </Link>
                            );
                        })}

                        {/* Games Dropdown */}
                        <div className="relative">
                            <button
                                onMouseEnter={() => setIsGamesOpen(true)}
                                onMouseLeave={() => setIsGamesOpen(false)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${isGameActive
                                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                                    : 'hover:bg-pink-100 text-gray-700'
                                    }`}
                            >
                                <Gamepad2 size={18} />
                                <span className="text-sm font-medium">Games</span>
                                <ChevronDown size={16} className={`transition-transform ${isGamesOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {isGamesOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        onMouseEnter={() => setIsGamesOpen(true)}
                                        onMouseLeave={() => setIsGamesOpen(false)}
                                        className="absolute top-full right-0 mt-2 w-48 glass rounded-xl shadow-2xl py-2 z-50"
                                    >
                                        {gameLinks.map((game) => {
                                            const isActive = location.pathname === game.to;
                                            return (
                                                <Link
                                                    key={game.to}
                                                    to={game.to}
                                                    className={`flex items-center space-x-3 px-4 py-2.5 transition-all ${isActive
                                                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                                                        : 'hover:bg-pink-50 text-gray-700'
                                                        }`}
                                                >
                                                    <span className="text-xl">{game.icon}</span>
                                                    <span className="text-sm font-medium">{game.label}</span>
                                                </Link>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 rounded-lg hover:bg-pink-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden pb-3 overflow-hidden"
                        >
                            <div className="max-h-[calc(100vh-5rem)] overflow-y-auto">
                                {links.map((link) => {
                                    const Icon = link.icon;
                                    const isActive = location.pathname === link.to;
                                    return (
                                        <Link
                                            key={link.to}
                                            to={link.to}
                                            onClick={() => setIsOpen(false)}
                                            className={`flex items-center space-x-3 px-4 py-3.5 rounded-lg mb-2 transition-all min-h-[48px] active:scale-98 ${isActive
                                                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                                                : 'hover:bg-pink-100 text-gray-700 active:bg-pink-200'
                                                }`}
                                        >
                                            <Icon size={20} />
                                            <span className="font-medium text-base">{link.label}</span>
                                        </Link>
                                    );
                                })}

                                {/* Games Section in Mobile */}
                                <div className="mt-2">
                                    <button
                                        onClick={() => setIsGamesOpen(!isGamesOpen)}
                                        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-lg mb-2 transition-all min-h-[48px] ${isGameActive
                                            ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                                            : 'hover:bg-pink-100 text-gray-700'
                                            }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Gamepad2 size={20} />
                                            <span className="font-medium text-base">Games</span>
                                        </div>
                                        <ChevronDown
                                            size={20}
                                            className={`transition-transform ${isGamesOpen ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    <AnimatePresence>
                                        {isGamesOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="overflow-hidden ml-4"
                                            >
                                                {gameLinks.map((game) => {
                                                    const isActive = location.pathname === game.to;
                                                    return (
                                                        <Link
                                                            key={game.to}
                                                            to={game.to}
                                                            onClick={() => {
                                                                setIsOpen(false);
                                                                setIsGamesOpen(false);
                                                            }}
                                                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-all min-h-[44px] active:scale-98 ${isActive
                                                                ? 'bg-pink-200 text-pink-900 font-semibold'
                                                                : 'hover:bg-pink-50 text-gray-700'
                                                                }`}
                                                        >
                                                            <span className="text-xl">{game.icon}</span>
                                                            <span className="text-sm font-medium">{game.label}</span>
                                                        </Link>
                                                    );
                                                })}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
