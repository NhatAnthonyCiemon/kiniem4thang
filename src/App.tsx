import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Timeline from './pages/Timeline';
import Letter from './pages/Letter';
import MemoryGame from './pages/MemoryGame';
import LoveQuiz from './pages/LoveQuiz';
import LoveCalculator from './pages/LoveCalculator';
import TruthOrDare from './pages/TruthOrDare';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="gallery" element={<Gallery />} />
                    <Route path="timeline" element={<Timeline />} />
                    <Route path="letter" element={<Letter />} />
                    <Route path="memory-game" element={<MemoryGame />} />
                    <Route path="quiz" element={<LoveQuiz />} />
                    <Route path="love-calculator" element={<LoveCalculator />} />
                    <Route path="truth-or-dare" element={<TruthOrDare />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
