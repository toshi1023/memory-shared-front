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
import UserList from './views/pages/users/List';
import UserDetail from './views/pages/users/Detail';
import UserRegister from './views/pages/users/Register';
import UserEditer from './views/pages/users/Editer';
import GroupList from './views/pages/groups/List';
import GroupDetail from './views/pages/groups/Detail';
import GroupRegister from './views/pages/groups/Register';
import GroupEditer from './views/pages/groups/Editer';
import AlbumDetail from './views/pages/albums/Detail';
import AlbumRegister from './views/pages/albums/Register';
import AlbumEditer from './views/pages/albums/Editer';
import Login from './views/pages/home/Login';
import NewsDetail from './views/pages/news/Detail';

/**
 * スマホ画面の場合、フッターのメニュータブを表示
 * @returns 
 */
const renderMobileFooterTab = () => {
  if (window.innerWidth < 768) {
    return (
      <>
        {
          window.location.pathname !== "/login" && window.location.pathname !== "/register" ? 
            <MobileFooterTab />
          :
            ''
        }
      </>
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
              {
                window.location.pathname === "/login" || window.location.pathname === "/register" ? 
                  ''
                :
                  <AppMainBar />
              }
              <Switch>
                  {/* PC & 一部スマホページ */}
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={UserRegister} />
                  <Route exact path="/" component={Home} />
                  <Route exact path="/test/editer" component={UserEditer} />
                  <Route exact path="/users" component={UserList} />
                  <Route exact path="/users/test" component={UserDetail} />
                  <Route exact path="/groups" component={GroupList} />
                  <Route exact path="/groups/register" component={GroupRegister} />
                  <Route exact path="/groups/test" component={GroupDetail} />
                  <Route exact path="/groups/register/test/editer" component={GroupEditer} />
                  <Route exact path="/groups/test/albums/test" component={AlbumDetail} />
                  <Route exact path="/groups/test/albums/register" component={AlbumRegister} />
                  <Route exact path="/groups/test/albums/test/editer" component={AlbumEditer} />
                  <Route exact path="/news/test" component={NewsDetail} />

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
