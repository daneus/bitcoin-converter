import './Styles/App.scss';
import React from 'react';
import Converter from './Components/Converter';

function App() {
  return (
    <div className="page">
      <div className='content-container'>
        <div className='title-container'>
          <span className='title-content'>Bitcoin Converter</span>
        </div>
        <Converter />
        <div className='pseudo-footer'>The exchange rate updates <strong>every time a conversion is made.</strong></div>
      </div>
    </div>
  );
}

export default App;