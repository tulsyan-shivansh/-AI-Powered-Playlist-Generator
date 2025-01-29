import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import GeneratePlaylist from './pages/GeneratePlaylist';
import Playlist from './components/Playlist';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/generate-playlist" element={<GeneratePlaylist />} />
        <Route path="/playlist" element={<Playlist />} />
      </Routes>
    </Router>
  );
};

export default App;