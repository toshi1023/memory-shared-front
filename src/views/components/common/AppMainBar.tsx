import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncLogout } from '../../pages/home/homeSlice';
import { fetchGetErrorMessages, selectNreadCount } from '../../pages/appSlice';
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Toolbar, Typography, Tooltip, Button, IconButton, Grid, Badge } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DisplayStyles from '../../../styles/common/displayMode';
import MobileMenu from './MobileMenu';
import { ICON_ACTIVE } from '../../types/commonTypes';
import { AppDispatch } from '../../../stores/store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: 'rgb(253, 200, 103)',
      boxShadow: '0 1px 5px gray'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: 'left',
      color: 'white',
      fontFamily: 'Merienda, cursive',
      fontSize: '2rem',
    },
    titleSpan: {
      '&:hover': {
        cursor: 'pointer'
      }
    },
    mobileTitle: {
      flexGrow: 1,
      textAlign: 'left',
      color: 'white',
      fontFamily: 'Merienda, cursive',
      fontSize: '1.6rem'
    },
    button: {
      color: 'white',
      fontFamily: 'Merienda, cursive',
      fontSize: '1.2rem'
    },
    tooltip: {
      fontSize: '1rem'
    }
  }),
);

/**
 * アプリで共有するNavBarを設定
 * @returns 
 */
const AppMainBar: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const displayStyles = DisplayStyles();
    const dispatch: AppDispatch = useDispatch();
    const nreadCount = useSelector(selectNreadCount);
    const [active, setActive] = useState<ICON_ACTIVE>({
        home: false,
        user: false,
        group: false,
        news: false
    });
    const user = localStorage.loginName;

    // アイコンの色を設定
    const activeColor = 'blue';
    const inActiveColor = 'black';

    /**
     * アイコンのアクティブ状態を変更
     * @param value 
     */
    const iconActive = (value: string) => {
        if(value === 'home') setActive({...active, home: true, user: false, group: false, news: false});
        if(value === 'user') setActive({...active, home: false, user: true, group: false, news: false});
        if(value === 'group') setActive({...active, home: false, user: false, group: true, news: false});
        if(value === 'news') setActive({...active, home: false, user: false, group: false, news: true});
    }

    /**
     * モバイル用のアイコン表示制御
     * @returns 
     */
    const renderMobileIcon = () => {
        return (
            <div>
              {
                active.user ? 
                  <EmojiPeopleIcon style={{ color: activeColor }} />
                : active.group ? 
                  <SupervisedUserCircleIcon style={{ color: activeColor }} />
                : active.news ? 
                  <NotificationImportantIcon style={{ color: activeColor }} />
                : 
                  <HomeIcon style={{ color: activeColor }} />
              }
            </div>
        );
    }

    return (
      <div>
        <div className={classes.root}>

          {/* PC版 & iPad版 */}
          <Grid container className={displayStyles.sectionDesktop}>
            <Grid item sm={12}>
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  <span className={classes.titleSpan} onClick={() => { 
                      history.push('/');
                      iconActive('home');
                  }}>MemoryShareApp</span>
                </Typography>
                <Tooltip title="ホーム" classes={{tooltip: classes.tooltip}}>
                  <Button color="inherit" onClick={() => {iconActive('home'); history.push('/');}}><HomeIcon style={active.home ? { color: activeColor } : { color: inActiveColor }} /></Button>
                </Tooltip>
                <Tooltip title="ユーザ" classes={{tooltip: classes.tooltip}}>
                  <Button color="inherit" onClick={() => {iconActive('user'); history.push('/users')}}><EmojiPeopleIcon style={active.user ? { color: activeColor } : { color: inActiveColor }} /></Button>
                </Tooltip>
                <Tooltip title="グループ" classes={{tooltip: classes.tooltip}}>
                  <Button color="inherit" onClick={() => {iconActive('group'); history.push('/groups')}}><SupervisedUserCircleIcon style={active.group ? { color: activeColor } : { color: inActiveColor }} /></Button>
                </Tooltip>
                <Tooltip title="お知らせ" classes={{tooltip: classes.tooltip}}>
                  <Button color="inherit" onClick={() => {iconActive('news'); history.push(`/news/${user}`)}}>
                    <Badge badgeContent={nreadCount} color="secondary">
                      <NotificationImportantIcon style={active.news ? { color: activeColor } : { color: inActiveColor }} />
                    </Badge>
                  </Button>
                </Tooltip>
                <Tooltip title="ログアウト" classes={{tooltip: classes.tooltip}}>
                  <Button color="inherit" onClick={async () => {
                    // ログアウト処理
                    const logoutRes = await dispatch(fetchAsyncLogout({id: +localStorage.loginId}));
                    if(fetchAsyncLogout.fulfilled.match(logoutRes)) {
                      logoutRes.payload.info_message ? 
                        window.location.href = '/login'
                      : 
                        dispatch(fetchGetErrorMessages(logoutRes.payload.error_message));
                    }
                  }}>
                    <ExitToAppIcon />
                  </Button>
                </Tooltip>
              </Toolbar>
            </Grid>
          </Grid>

          {/* スマホ版 */}
          <Grid container className={displayStyles.sectionMobileAppBar}>
            <Grid item xs={12}>
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MobileMenu callback={iconActive} />
                </IconButton>
                <Typography variant="h6" className={classes.mobileTitle} onClick={() => { 
                  history.push('/');
                  iconActive('home');
                }}>
                  MemoryShareApp
                </Typography>
                {renderMobileIcon()}
              </Toolbar>
            </Grid>
          </Grid>

        </div>
      </div>
      
    );
}

export default AppMainBar