import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy } from 'lucide-react';

type Player = '❤️' | '💙' | null;
type Board = Player[];

const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

const TicTacToe: React.FC = () => {
    const [board, setBoard] = useState<Board>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<'❤️' | '💙'>('❤️');
    const [winner, setWinner] = useState<Player>(null);
    const [winningLine, setWinningLine] = useState<number[]>([]);
    const [isDraw, setIsDraw] = useState(false);
    const [scores, setScores] = useState({ heart: 0, blue: 0, draws: 0 });

    useEffect(() => {
        const result = checkWinner(board);
        if (result.winner) {
            setWinner(result.winner);
            setWinningLine(result.line);

            // Update scores
            if (result.winner === '❤️') {
                setScores(prev => ({ ...prev, heart: prev.heart + 1 }));
            } else {
                setScores(prev => ({ ...prev, blue: prev.blue + 1 }));
            }
        } else if (board.every(cell => cell !== null)) {
            setIsDraw(true);
            setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
        }
    }, [board]);

    const checkWinner = (board: Board): { winner: Player; line: number[] } => {
        for (const combo of WINNING_COMBINATIONS) {
            const [a, b, c] = combo;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return { winner: board[a], line: combo };
            }
        }
        return { winner: null, line: [] };
    };

    const handleClick = (index: number) => {
        if (board[index] || winner || isDraw) return;

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === '❤️' ? '💙' : '❤️');
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer('❤️');
        setWinner(null);
        setWinningLine([]);
        setIsDraw(false);
    };

    const resetScores = () => {
        setScores({ heart: 0, blue: 0, draws: 0 });
        resetGame();
    };

    return (
        <div className="container mx-auto px-3 sm:px-4 md:px-6 pt-20 sm:pt-24 pb-8 sm:pb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-6 sm:mb-8"
            >
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-5xl sm:text-6xl mb-3 sm:mb-4"
                >
                    ❌⭕
                </motion.div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                    Tic Tac Toe Tình Yêu
                </h1>
                <p className="text-gray-600 text-base sm:text-lg">Ai thắng được trái tim của ai? 💕</p>
            </motion.div>

            <div className="max-w-2xl mx-auto">
                {/* Scores */}
                <div className="flex justify-center gap-3 sm:gap-6 mb-6 sm:mb-8 flex-wrap">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="glass px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-center min-w-[100px]"
                    >
                        <div className="text-3xl sm:text-4xl mb-1">❤️</div>
                        <div className="text-xl sm:text-2xl font-bold text-pink-500">{scores.heart}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Anh</div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="glass px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-center min-w-[100px]"
                    >
                        <div className="text-2xl sm:text-3xl mb-1">🤝</div>
                        <div className="text-xl sm:text-2xl font-bold text-gray-500">{scores.draws}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Hòa</div>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="glass px-4 sm:px-6 py-3 sm:py-4 rounded-xl text-center min-w-[100px]"
                    >
                        <div className="text-3xl sm:text-4xl mb-1">💙</div>
                        <div className="text-xl sm:text-2xl font-bold text-blue-500">{scores.blue}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Em</div>
                    </motion.div>
                </div>

                {/* Current Player */}
                {!winner && !isDraw && (
                    <motion.div
                        key={currentPlayer}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-6"
                    >
                        <p className="text-lg sm:text-xl text-gray-600 mb-2">Lượt của:</p>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="text-5xl sm:text-6xl"
                        >
                            {currentPlayer}
                        </motion.div>
                        <p className="text-sm sm:text-base text-gray-600 mt-2">
                            {currentPlayer === '❤️' ? 'Anh' : 'Em'}
                        </p>
                    </motion.div>
                )}

                {/* Game Board */}
                <div className="glass p-4 sm:p-8 rounded-2xl sm:rounded-3xl mb-6">
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto">
                        {board.map((cell, index) => (
                            <motion.button
                                key={index}
                                whileHover={!cell && !winner && !isDraw ? { scale: 1.05 } : {}}
                                whileTap={!cell && !winner && !isDraw ? { scale: 0.95 } : {}}
                                onClick={() => handleClick(index)}
                                className={`aspect-square rounded-xl sm:rounded-2xl text-4xl sm:text-5xl md:text-6xl font-bold transition-all ${cell
                                        ? winningLine.includes(index)
                                            ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-xl'
                                            : 'bg-white shadow-md'
                                        : 'glass hover:bg-pink-50 cursor-pointer'
                                    } ${!cell && !winner && !isDraw ? 'hover:shadow-lg' : ''
                                    }`}
                                disabled={!!cell || !!winner || isDraw}
                            >
                                <AnimatePresence>
                                    {cell && (
                                        <motion.span
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0, rotate: 180 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                        >
                                            {cell}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Result */}
                <AnimatePresence>
                    {(winner || isDraw) && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="text-center mb-6"
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                                transition={{ duration: 0.5, repeat: 3 }}
                                className="text-7xl sm:text-8xl mb-4"
                            >
                                {winner ? <Trophy className="inline-block text-yellow-500" size={80} /> : '🤝'}
                            </motion.div>

                            <div className="glass p-6 sm:p-8 rounded-2xl sm:rounded-3xl">
                                {winner ? (
                                    <>
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                                            {winner === '❤️' ? (
                                                <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                                                    ❤️ Anh thắng!
                                                </span>
                                            ) : (
                                                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                                                    💙 Em thắng!
                                                </span>
                                            )}
                                        </h2>
                                        <p className="text-gray-600 text-base sm:text-lg">
                                            {winner === '❤️'
                                                ? 'Anh chinh phục được trái tim em! 💕'
                                                : 'Em đã chinh phục trái tim anh! 💕'}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                                            🤝 Hòa!
                                        </h2>
                                        <p className="text-gray-600 text-base sm:text-lg">
                                            Cả hai đều là người chiến thắng trong tình yêu! 💕
                                        </p>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <button
                        onClick={resetGame}
                        className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2 min-h-[48px] active:scale-98"
                    >
                        <RotateCcw size={20} />
                        Chơi lại
                    </button>
                    <button
                        onClick={resetScores}
                        className="glass px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium hover:bg-pink-100 transition-all min-h-[48px] active:scale-98"
                    >
                        Reset điểm
                    </button>
                </div>

                {/* How to Play */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 glass p-6 rounded-2xl"
                >
                    <h3 className="text-xl font-bold mb-3 text-center text-gray-800">
                        Cách chơi:
                    </h3>
                    <div className="space-y-2 text-gray-600 text-sm sm:text-base">
                        <p>• ❤️ Anh chơi trái tim đỏ, 💙 Em chơi trái tim xanh</p>
                        <p>• Lần lượt chọn ô để đánh dấu</p>
                        <p>• Người nào tạo được 3 ô liên tiếp (ngang/dọc/chéo) sẽ thắng</p>
                        <p>• May mắn và chinh phục trái tim người mình yêu! 💝</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TicTacToe;
