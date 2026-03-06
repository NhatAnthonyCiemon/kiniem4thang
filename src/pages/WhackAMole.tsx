import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Trophy, Timer } from 'lucide-react';

type Mole = {
    id: number;
    active: boolean;
};

const WhackAMole = () => {
    const [moles, setMoles] = useState<Mole[]>(
        Array.from({ length: 9 }, (_, i) => ({ id: i, active: false }))
    );
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [bestScore, setBestScore] = useState(0);
    const [lastHit, setLastHit] = useState<number | null>(null);
    const [combo, setCombo] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem('whack-a-mole-best');
        if (saved) setBestScore(parseInt(saved));
    }, []);

    const startGame = () => {
        setScore(0);
        setTimeLeft(30);
        setGameStarted(true);
        setGameOver(false);
        setCombo(0);
        setMoles(moles.map(m => ({ ...m, active: false })));
    };

    useEffect(() => {
        if (!gameStarted || gameOver) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setGameOver(true);
                    setGameStarted(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [gameStarted, gameOver]);

    useEffect(() => {
        if (!gameStarted || gameOver) return;

        const moleInterval = setInterval(() => {
            const inactiveMoles = moles
                .map((m, i) => ({ ...m, index: i }))
                .filter(m => !m.active);

            if (inactiveMoles.length > 0) {
                const randomMole = inactiveMoles[Math.floor(Math.random() * inactiveMoles.length)];

                setMoles(prev =>
                    prev.map((m, i) =>
                        i === randomMole.index ? { ...m, active: true } : m
                    )
                );

                setTimeout(() => {
                    setMoles(prev =>
                        prev.map((m, i) =>
                            i === randomMole.index ? { ...m, active: false } : m
                        )
                    );
                    setCombo(0);
                }, 800 - Math.min(score * 10, 400));
            }
        }, 600 - Math.min(score * 5, 300));

        return () => clearInterval(moleInterval);
    }, [gameStarted, gameOver, moles, score]);

    const whackMole = useCallback((id: number) => {
        if (!gameStarted || gameOver) return;

        const mole = moles[id];
        if (mole.active) {
            setMoles(prev =>
                prev.map((m, i) =>
                    i === id ? { ...m, active: false } : m
                )
            );

            const newCombo = combo + 1;
            setCombo(newCombo);
            const points = 10 + (newCombo > 1 ? newCombo * 5 : 0);
            setScore(prev => {
                const newScore = prev + points;
                if (newScore > bestScore) {
                    setBestScore(newScore);
                    localStorage.setItem('whack-a-mole-best', newScore.toString());
                }
                return newScore;
            });
            setLastHit(id);
            setTimeout(() => setLastHit(null), 300);
        }
    }, [gameStarted, gameOver, moles, combo, bestScore]);

    return (
        <div className="h-screen bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 py-4 px-4 flex flex-col overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto w-full flex flex-col h-full"
            >
                <div className="text-center mb-4 flex-shrink-0">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                        🔨 Đập Chuột Chũi
                    </h1>
                    <p className="text-white/90 text-xs md:text-sm">
                        Chạm vào chuột chũi càng nhanh càng tốt!
                    </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 md:p-4 mb-3 flex-1 flex flex-col min-h-0">
                    <div className="flex justify-between items-center mb-3 gap-2 flex-shrink-0">
                        <div className="bg-white/20 rounded-lg px-2 md:px-3 py-1.5 flex-1">
                            <div className="text-white/70 text-xs flex items-center gap-1 justify-center">
                                <Trophy className="w-3 h-3" />
                                <span className="hidden md:inline">Điểm</span>
                            </div>
                            <div className="text-white text-lg md:text-xl font-bold text-center">{score}</div>
                        </div>

                        <div className="bg-white/20 rounded-lg px-2 md:px-3 py-1.5 flex-1">
                            <div className="text-white/70 text-xs flex items-center gap-1 justify-center">
                                <Timer className="w-3 h-3" />
                                <span className="hidden md:inline">Thời gian</span>
                            </div>
                            <div className="text-white text-lg md:text-xl font-bold text-center">{timeLeft}s</div>
                        </div>

                        <div className="bg-white/20 rounded-lg px-2 md:px-3 py-1.5 flex-1">
                            <div className="text-white/70 text-xs text-center">
                                <span className="hidden md:inline">Cao nhất</span>
                                <span className="md:hidden">Best</span>
                            </div>
                            <div className="text-white text-lg md:text-xl font-bold text-center">{bestScore}</div>
                        </div>
                    </div>

                    {combo > 1 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="text-center mb-3 flex-shrink-0"
                        >
                            <span className="bg-yellow-400 text-gray-900 px-3 py-1.5 rounded-full font-bold text-sm">
                                🔥 Combo x{combo}!
                            </span>
                        </motion.div>
                    )}

                    {!gameStarted && !gameOver && (
                        <div className="text-center py-8 flex-1 flex items-center justify-center">
                            <button
                                onClick={startGame}
                                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold text-lg flex items-center gap-3 mx-auto transition transform hover:scale-105"
                            >
                                <Play className="w-5 h-5" />
                                Bắt đầu chơi
                            </button>
                        </div>
                    )}

                    {gameStarted && (
                        <div className="grid grid-cols-3 gap-2 md:gap-3 max-w-lg mx-auto flex-1 content-center">
                            {moles.map((mole) => (
                                <motion.button
                                    key={mole.id}
                                    onClick={() => whackMole(mole.id)}
                                    className={`aspect-square rounded-2xl relative overflow-hidden transition-all ${lastHit === mole.id
                                        ? 'bg-yellow-400'
                                        : 'bg-amber-900/60'
                                        }`}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <div className="absolute inset-0 flex items-end justify-center pb-2">
                                        <div className="w-full h-3 bg-amber-950/60 rounded-full" />
                                    </div>

                                    <AnimatePresence>
                                        {mole.active && (
                                            <motion.div
                                                initial={{ y: 50, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                exit={{ y: 50, opacity: 0 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute inset-0 flex items-center justify-center"
                                            >
                                                <div className="text-4xl md:text-5xl">🐹</div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {lastHit === mole.id && (
                                        <motion.div
                                            initial={{ scale: 0, opacity: 1 }}
                                            animate={{ scale: 2, opacity: 0 }}
                                            className="absolute inset-0 flex items-center justify-center text-4xl"
                                        >
                                            💥
                                        </motion.div>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    )}

                    {gameOver && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-6 flex-1 flex flex-col items-center justify-center"
                        >
                            <h2 className="text-3xl font-bold text-white mb-2">
                                {score >= bestScore && score > 0 ? '🎉 Kỷ lục mới!' : '⏰ Hết giờ!'}
                            </h2>
                            <p className="text-white/90 text-lg mb-4">
                                Điểm: <strong>{score}</strong>
                            </p>
                            <button
                                onClick={startGame}
                                className="bg-white/20 hover:bg-white/30 text-white px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 mx-auto transition text-sm"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Chơi lại
                            </button>
                        </motion.div>
                    )}
                </div>

                <div className="text-center text-white/70 text-xs space-y-0.5 flex-shrink-0">
                    <p>💡 Tạo combo liên tiếp để được điểm thưởng!</p>
                    <p>⚡ Game sẽ khó hơn khi điểm càng cao</p>
                </div>
            </motion.div>
        </div>
    );
};

export default WhackAMole;
