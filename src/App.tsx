import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import { selectInfoMessage, selectErrorMessage, selectUrl } from './views/pages/appSlice';
import useWindowDimensions from './functions/windowDimensions';
import { BrowserRouter, Route, Redirect, RouteProps, Switch } from 'react-router-dom';
import AppMainBar from './views/components/common/AppMainBar';
import MobileFooterTab from './views/components/common/MobileFooterTab';
import MessageComponent from './views/components/common/MessageComponent';
import Home from './views/pages/home/Home';
import MobileMyFamily from './views/pages/home/MobileMyFamily';
import MobileMyGroup from './views/pages/home/MobileMyGroup';
import MobileMyTalk from './views/pages/home/MobileMyTalk';
import Talk from './views/pages/home/Talk';
import UserList from './views/pages/users/List';
import UserDetail from './views/pages/users/Detail';
import UserRegister from './views/pages/users/Register';
import UserEditer from './views/pages/users/Editer';
import GroupList from './views/pages/groups/List';
import GroupDetail from './views/pages/groups/Detail';
import GroupRegister from './views/pages/groups/Register';
import GroupEditer from './views/pages/groups/Editer';
import PostRegister from './views/pages/groups/PostRegister';
import AlbumDetail from './views/pages/albums/Detail';
import AlbumRegister from './views/pages/albums/Register';
import AlbumEditer from './views/pages/albums/Editer';
import Login from './views/pages/home/Login';
import NewsDetail from './views/pages/news/Detail';

/**
 * スマホ画面の場合、フッターのメニュータブを表示
 * @returns 
 */
const renderMobileFooterTab = (url: string) => {
  if (window.innerWidth < 768) {
    return (
      <>
        {
          localStorage.loginId && url.substring(0, 5) !== '/talk' ? 
            <MobileFooterTab />
          :
            ''
        }
      </>
    )
  }
}

/**
 * PrivateRouteの実装
 * @param param0 
 * @returns 
 */
const PrivateRoute: React.FC<RouteProps> = ({...props}) => {
    const isAuthenticated = localStorage.loginId != null //認証されているかの判定
    if (isAuthenticated) {
      return <Route {...props}/>
    }else{
      return <Redirect to="/login"/>
    }
}

const App: React.FC = () => {
  const errorMessage = useSelector(selectErrorMessage);
  const infoMessage = useSelector(selectInfoMessage);
  const currentUrl = useSelector(selectUrl);
  const { width, height } = useWindowDimensions();
  
  // 画面サイズの変更でモバイルフッターの表示制御
  useEffect(() => {
    renderMobileFooterTab(currentUrl);
  }, [width]);
  
  // urlの変更でモバイルフッターの表示制御
  useEffect(() => {
    renderMobileFooterTab(currentUrl);
  }, [currentUrl]);
  
  return (
      <div className="App">
          {/* メッセージ表示 */}
          {
            infoMessage ? 
              <MessageComponent infoOpen={true} errorOpen={false} />
            :
              errorMessage ? 
                <MessageComponent infoOpen={false} errorOpen={true} />
              :
                ''
          }

          <BrowserRouter>
              {
                localStorage.loginId ? 
                  <AppMainBar />
                :
                  ''
              }
              <Switch>
                  {/* PC & 一部スマホページ */}
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={UserRegister} />
                  <PrivateRoute exact path="/" component={Home} />
                  <PrivateRoute exact path="/:name/editer" component={UserEditer} />
                  <PrivateRoute exact path="/talk/:name" component={Talk} />
                  <PrivateRoute exact path="/users" component={UserList} />
                  <PrivateRoute exact path="/users/:name/:id" component={UserDetail} />
                  <PrivateRoute exact path="/groups" component={GroupList} />
                  <PrivateRoute exact path="/groups/register" component={GroupRegister} />
                  <PrivateRoute exact path="/groups/:name/:id" component={GroupDetail} />
                  <PrivateRoute exact path="/groups/:name/editer" component={GroupEditer} />
                  <PrivateRoute exact path="/groups/:name/post/register" component={PostRegister} />
                  <PrivateRoute exact path="/groups/:name/albums/test" component={AlbumDetail} />
                  <PrivateRoute exact path="/groups/:name/albums/register" component={AlbumRegister} />
                  <PrivateRoute exact path="/groups/:name/albums/test/editer" component={AlbumEditer} />
                  <PrivateRoute exact path="/news/:name" component={NewsDetail} />

                  {/* スマホ用フッタータブとの連携ページ */}
                  <PrivateRoute exact path="/mobile/myfamily" component={MobileMyFamily} />
                  <PrivateRoute exact path="/mobile/mygroup" component={MobileMyGroup} />
                  <PrivateRoute exact path="/mobile/mytalk" component={MobileMyTalk} />
              </Switch>
              {renderMobileFooterTab(currentUrl)}
          </BrowserRouter>
      </div>
  );
}

export default App;
