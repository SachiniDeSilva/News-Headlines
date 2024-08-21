// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeadlineList from './components/HeadlineList';
import HeadlineDetail from './components/HeadlineDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeadlineList />} />
        <Route path="/headline/:id" element={<HeadlineDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
