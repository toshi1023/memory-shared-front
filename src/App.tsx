import React, { useState, useEffect } from 'react';
import './App.css';
import useWindowDimensions from './functions/WindowDimensions';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AppMainBar from './views/components/common/AppMainBar';
import MobileFooterTab from './views/components/common/MobileFooterTab';
import Home from './views/pages/home/Home';
import MobileMyFamily from './views/pages/home/MobileMyFamily';
import MobileMyGroup from './views/pages/home/MobileMyGroup';
import MobileMyTalk from './views/pages/home/MobileMyTalk';
import UserList from './views/pages/users/list';

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
      <BrowserRouter>
        <AppMainBar />
        <Switch>
          {/* PC & 一部スマホページ */}
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={UserList} />

          {/* スマホ用フッタータブとの連携ページ */}
          <Route exact path="/mobile/myfamily" component={MobileMyFamily} />
          <Route exact path="/mobile/mygroup" component={MobileMyGroup} />
          <Route exact path="/mobile/mytalk" component={MobileMyTalk} />
        </Switch>
        {renderMobileFooterTab()}
      </BrowserRouter>
    </div>
  );
}

export default App;
