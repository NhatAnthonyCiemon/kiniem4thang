import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Trophy } from 'lucide-react';

type Board = number[][];
type Direction = 'up' | 'down' | 'left' | 'right';

const Game2048 = () => {
    const [board, setBoard] = useState<Board>([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('2048-best-score');
        if (saved) setBestScore(parseInt(saved));
        initGame();
    }, []);

    const initGame = () => {
        const newBoard = Array(4).fill(null).map(() => Array(4).fill(0));
        addRandomTile(newBoard);
        addRandomTile(newBoard);
        setBoard(newBoard);
        setScore(0);
        setGameOver(false);
        setWon(false);
    };

    const addRandomTile = (currentBoard: Board) => {
        const emptyCells: [number, number][] = [];
        currentBoard.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell === 0) emptyCells.push([i, j]);
            });
        });
        if (emptyCells.length > 0) {
            const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            currentBoard[i][j] = Math.random() < 0.9 ? 2 : 4;
        }
    };

    const move = useCallback((direction: Direction) => {
        if (gameOver) return;

        const newBoard = board.map(row => [...row]);
        let moved = false;
        let newScore = score;

        const moveLeft = (row: number[]) => {
            const filtered = row.filter(x => x !== 0);
            const merged: number[] = [];
            let skip = false;

            for (let i = 0; i < filtered.length; i++) {
                if (skip) {
                    skip = false;
                    continue;
                }
                if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
                    merged.push(filtered[i] * 2);
                    newScore += filtered[i] * 2;
                    if (filtered[i] * 2 === 2048) setWon(true);
                    skip = true;
                    moved = true;
                } else {
                    merged.push(filtered[i]);
                }
            }

            while (merged.length < 4) merged.push(0);
            if (JSON.stringify(merged) !== JSON.stringify(row)) moved = true;
            return merged;
        };

        const transpose = (matrix: Board): Board =>
            matrix[0].map((_, i) => matrix.map(row => row[i]));

        if (direction === 'left') {
            for (let i = 0; i < 4; i++) {
                newBoard[i] = moveLeft(newBoard[i]);
            }
        } else if (direction === 'right') {
            for (let i = 0; i < 4; i++) {
                newBoard[i] = moveLeft([...newBoard[i]].reverse()).reverse();
            }
        } else if (direction === 'up') {
            const transposed = transpose(newBoard);
            for (let i = 0; i < 4; i++) {
                transposed[i] = moveLeft(transposed[i]);
            }
            setBoard(transpose(transposed));
            moved = true;
        } else if (direction === 'down') {
            const transposed = transpose(newBoard);
            for (let i = 0; i < 4; i++) {
                transposed[i] = moveLeft([...transposed[i]].reverse()).reverse();
            }
            setBoard(transpose(transposed));
            moved = true;
        }

        if (direction === 'left' || direction === 'right') {
            setBoard(newBoard);
        }

        if (moved) {
            addRandomTile(direction === 'up' || direction === 'down' ?
                (direction === 'up' ? transpose(transpose(newBoard).map(row => moveLeft(row))) :
                    transpose(transpose(newBoard).map(row => moveLeft([...row].reverse()).reverse()))) :
                newBoard);

            setScore(newScore);
            if (newScore > bestScore) {
                setBestScore(newScore);
                localStorage.setItem('2048-best-score', newScore.toString());
            }

            if (checkGameOver(newBoard)) {
                setGameOver(true);
            }
        }
    }, [board, score, bestScore, gameOver]);

    const checkGameOver = (currentBoard: Board): boolean => {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (currentBoard[i][j] === 0) return false;
                if (j < 3 && currentBoard[i][j] === currentBoard[i][j + 1]) return false;
                if (i < 3 && currentBoard[i][j] === currentBoard[i + 1][j]) return false;
            }
        }
        return true;
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
                const directionMap: Record<string, Direction> = {
                    ArrowUp: 'up',
                    ArrowDown: 'down',
                    ArrowLeft: 'left',
                    ArrowRight: 'right',
                };
                move(directionMap[e.key]);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [move]);

    useEffect(() => {
        let touchStartX = 0;
        let touchStartY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;

            if (Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 30) move('right');
                else if (diffX < -30) move('left');
            } else {
                if (diffY > 30) move('down');
                else if (diffY < -30) move('up');
            }
        };

        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchend', handleTouchEnd);

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [move]);

    const getTileColor = (value: number): string => {
        const colors: Record<number, string> = {
            2: 'bg-yellow-200 text-gray-800',
            4: 'bg-yellow-300 text-gray-800',
            8: 'bg-orange-400 text-white',
            16: 'bg-orange-500 text-white',
            32: 'bg-red-400 text-white',
            64: 'bg-red-500 text-white',
            128: 'bg-yellow-500 text-white',
            256: 'bg-yellow-600 text-white',
            512: 'bg-yellow-700 text-white',
            1024: 'bg-orange-600 text-white',
            2048: 'bg-orange-700 text-white',
        };
        return colors[value] || 'bg-gray-800 text-white';
    };

    return (
        <div className="h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 py-4 px-4 flex flex-col overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto w-full flex flex-col h-full"
            >
                <div className="text-center mb-4 flex-shrink-0">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">2048</h1>
                    <p className="text-white/90 text-xs md:text-sm">
                        Vuốt để di chuyển các ô. Ghép hai ô giống nhau để tạo 2048!
                    </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 md:p-4 mb-3 flex-1 flex flex-col min-h-0">
                    <div className="flex justify-between items-center mb-3 flex-shrink-0">
                        <div className="bg-white/20 rounded-lg px-3 py-1.5">
                            <div className="text-white/70 text-xs">Điểm</div>
                            <div className="text-white text-xl font-bold">{score}</div>
                        </div>
                        <div className="bg-white/20 rounded-lg px-3 py-1.5">
                            <div className="text-white/70 text-xs flex items-center gap-1">
                                <Trophy className="w-3 h-3" />
                                Cao nhất
                            </div>
                            <div className="text-white text-xl font-bold">{bestScore}</div>
                        </div>
                        <button
                            onClick={initGame}
                            className="bg-white/20 hover:bg-white/30 rounded-lg p-2.5 transition"
                        >
                            <RotateCcw className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    <div className="bg-amber-900/50 rounded-lg p-2 flex-1 flex items-center justify-center">
                        <div className="w-full aspect-square max-h-full">
                            <div className="grid grid-cols-4 gap-2 h-full w-full">
                                {board.map((row, i) =>
                                    row.map((cell, j) => (
                                        <AnimatePresence key={`${i}-${j}`}>
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className={`rounded-lg flex items-center justify-center font-bold text-base md:text-xl ${cell === 0 ? 'bg-amber-900/30' : getTileColor(cell)
                                                    }`}
                                            >
                                                {cell !== 0 && cell}
                                            </motion.div>
                                        </AnimatePresence>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {(gameOver || won) && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center mb-3 flex-shrink-0"
                    >
                        <h2 className="text-2xl font-bold text-white mb-2">
                            {won ? '🎉 Chiến thắng!' : '😢 Game Over!'}
                        </h2>
                        <p className="text-white/90 mb-3 text-sm">
                            Điểm của bạn: <strong>{score}</strong>
                        </p>
                        <button
                            onClick={initGame}
                            className="bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-lg font-semibold transition text-sm"
                        >
                            Chơi lại
                        </button>
                    </motion.div>
                )}

                <div className="text-center text-white/70 text-xs flex-shrink-0">
                    💡 Mẹo: Giữ ô có giá trị cao ở góc và xây dựng xung quanh nó!
                </div>
            </motion.div>
        </div>
    );
};

export default Game2048;
