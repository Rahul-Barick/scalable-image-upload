import React from 'react';
import './App.css';
import Uploader from './components/uploader';
import DisplayImage from './components/displayImage';

function App() {
  return (
    <div className='App'>
      <Uploader />
      <hr/>
      <DisplayImage />
    </div>
  );
}

export default App;