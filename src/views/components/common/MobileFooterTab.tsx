import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles, Theme } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import TapAndPlayIcon from '@material-ui/icons/TapAndPlay';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    position: 'fixed',/*←絶対位置*/
    bottom: 0, /*下に固定*/
  }
}));

/**
 * 主要メニューの表示用タブ(スマホ専用)
 * @returns 
 */
const MobileFooterTab: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [value, setValue] = React.useState(0);

  /**
   * アクティブなタブの状態を切り替え
   * @param event 
   * @param newValue 
   */
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Home" value={1} icon={<HomeIcon />} onClick={() => history.push('/')} />
      <BottomNavigationAction label="Group" value={2} icon={<PeopleOutlineIcon />} onClick={() => history.push('/mobile/mygroup')} />
      <BottomNavigationAction label="Family" value={3} icon={<PersonPinCircleIcon onClick={() => history.push('/mobile/myfamily')} />} />
      <BottomNavigationAction label="Talk" value={4} icon={<TapAndPlayIcon />} onClick={() => history.push('/mobile/mytalk')} />
    </BottomNavigation>
  );
}

export default MobileFooterTab