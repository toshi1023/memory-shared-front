import React from 'react';
import { useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Toolbar, Typography, Tooltip, Button, IconButton, Grid  } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DisplayStyles from '../../../styles/common/displayMode';
import MobileMenu from './MobileMenu';

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
      fontSize: '2rem'
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

  return (
    <div>
      <div className={classes.root}>

        {/* PC版 & iPad版 */}
        <Grid container className={displayStyles.sectionDesktop}>
          <Grid item sm={12}>
            <Toolbar>
              <Typography variant="h6" className={classes.title} onClick={() => history.push('/')}>
                MemoryShareApp
              </Typography>
              <Tooltip title="ホーム" classes={{tooltip: classes.tooltip}}>
                <Button color="inherit"><HomeIcon onClick={() => history.push('/')} /></Button>
              </Tooltip>
              <Tooltip title="ユーザ" classes={{tooltip: classes.tooltip}}>
                <Button color="inherit"><EmojiPeopleIcon onClick={() => history.push('/users')} /></Button>
              </Tooltip>
              <Tooltip title="グループ" classes={{tooltip: classes.tooltip}}>
                <Button color="inherit"><SupervisedUserCircleIcon /></Button>
              </Tooltip>
              <Tooltip title="お知らせ" classes={{tooltip: classes.tooltip}}>
                <Button color="inherit"><NotificationImportantIcon /></Button>
              </Tooltip>
              <Tooltip title="ログアウト" classes={{tooltip: classes.tooltip}}>
                <Button color="inherit"><ExitToAppIcon /></Button>
              </Tooltip>
            </Toolbar>
          </Grid>
        </Grid>

        {/* スマホ版 */}
        <Grid container className={displayStyles.sectionMobileAppBar}>
          <Grid item xs={12}>
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MobileMenu />
              </IconButton>
              <Typography variant="h6" className={classes.mobileTitle} onClick={() => history.push('/')}>
                MemoryShareApp
              </Typography>
            </Toolbar>
          </Grid>
        </Grid>

      </div>
    </div>
    
  );
}

export default AppMainBar