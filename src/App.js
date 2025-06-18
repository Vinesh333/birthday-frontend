import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import HomePage from './HomePage';
import AlbumPage from './AlbumPage';
import MemoryLetterPage from './MemoryLetterPage';
import CollagePage from './CollagePage';
import TinyClipsPage from './TinyClipsPage';
import HugPage from './HugPage'; // Import the new HugPage component
import AlbumLayout from './AlbumLayout';

export default function App() {
  return (
    <Routes>
      {/* ✅ AlbumLayout wraps all pages and includes the music player */}
      <Route element={<AlbumLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/album" element={<AlbumPage />} />
        <Route path="/memory-letter" element={<MemoryLetterPage />} />
        <Route path="/collage" element={<CollagePage />} />
        <Route path="/tiny-clips" element={<TinyClipsPage />} />
        <Route path="/hug-page" element={<HugPage />} /> {/* Added new route */}
      </Route>
    </Routes>
  );
}