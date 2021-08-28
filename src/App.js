import React from 'react';
import Home from './components/Home/Home';
import './App.scss'
import imageData from './imageData';
import ImageRenderer from './ImageRenderer';

import './style.css';

export default function App() {
  return (
    <div>
      <h1>Lazy Load Images</h1>
      <Home />
    </div>
  );
}
