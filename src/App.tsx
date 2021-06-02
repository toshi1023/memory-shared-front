import React, { useState, useEffect } from 'react';
import './App.css';
import useWindowDimensions from './functions/WindowDimensions';
import AppMainBar from './views/components/common/AppMainBar';
import MobileFooterTab from './views/components/common/MobileFooterTab';
import Home from './views/pages/home/Home';

/**
 * スマホ画面の場合、フッターのメニュータブを表示
 * @returns 
 */
const renderMobileFooterTab = () => {
  if (window.innerWidth < 768) {
    return (
      <MobileFooterTab />
    )
  }
}

function App() {
  const { width, height } = useWindowDimensions();
  
  // 画面サイズの変更でモバイルフッターの表示制御
  useEffect(() => {
    renderMobileFooterTab();
  }, [width]);

  return (
    <div className="App">
      <AppMainBar />
      <Home />
      {renderMobileFooterTab()}
    </div>
  );
}

export default App;
