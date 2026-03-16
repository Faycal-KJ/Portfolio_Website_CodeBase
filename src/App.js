import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import TitanicDemo from './TitanicDemo';
import BitCoinDemo from './BitCoinDemo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/titanic-demo" element={<TitanicDemo />} />
        <Route path="/bitcoin-demo" element={<BitCoinDemo />} />
      </Routes>
    </Router>
  );
}

export default App;
