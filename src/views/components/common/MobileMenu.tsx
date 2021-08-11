import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import { MOBILE_MENU_ICON } from '../../types/commonTypes';

const useStyles = makeStyles({
  list: {
    minWidth: 250,
  },
  drawerMenuIcon: {
      margin: '10px 15px 10px'
  }
});

/**
 * スマホ用メニューの設定
 * 
 * @param props 
 * @returns 
 */
const MobileMenu: React.FC<MOBILE_MENU_ICON> = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [state, setState] = useState(false);

    /**
     * drawerメニューの表示制御
     * @param open 
     * @returns 
     */
    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setState(open);
    };

    /**
     * ページ遷移
     * @param index 
     */
    const pageTransition = (index: number) => {
        if(index === 0) history.push('/users');
        if(index === 1) history.push('/groups');
        if(index === 2) history.push('/news/test');
    }

    /**
     * メニューのクリック
     * @param index 
     */
    const handleMenuClick = (index: number) => {
        if(index === 0) props.callback('user');
        if(index === 1) props.callback('group');
        if(index === 2) props.callback('news');
    }

    /**
     * メニューリスト生成
     * @returns 
     */
    const list = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <MenuIcon className={classes.drawerMenuIcon} onClick={toggleDrawer(false)} />
            <List>
                {['ユーザを探す', 'グループを探す', 'お知らせ'].map((text, index) => (
                    <ListItem 
                        button 
                        key={text}
                        onClick={() => pageTransition(index)}
                    >
                        <ListItemIcon>
                            {index === 0 ? <EmojiPeopleIcon /> : ''}
                            {index === 1 ? <SupervisedUserCircleIcon /> : ''}
                            {index === 2 ? <NotificationImportantIcon /> : ''}
                        </ListItemIcon>
                        <ListItemText primary={text} onClick={() => handleMenuClick(index)} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['ログアウト'].map((text) => (
                    <ListItem button key={text} onClick={() => window.location.href = '/login'}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <MenuIcon onClick={toggleDrawer(true)} />
            <Drawer open={state} onClose={toggleDrawer(false)}>
                {list()}
            </Drawer>
        </div>
    );
}

export default MobileMenu