import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';
import HomeIcon from '@material-ui/icons/Home';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import TapAndPlayIcon from '@material-ui/icons/TapAndPlay';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function a11yProps(index: any) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',/*←絶対位置*/
    bottom: 0 /*下に固定*/
  }
}));

/**
 * 主要メニューの表示用タブ(スマホ専用)
 * @returns 
 */
const MobileFooterTab: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >           
          <Tab label="ホーム" icon={<HomeIcon />} {...a11yProps(0)} />
          <Tab label="グループ" icon={<PeopleOutlineIcon />} {...a11yProps(1)} />
          <Tab label="ファミリー" icon={<PersonPinCircleIcon />} {...a11yProps(2)} />
          <Tab label="トーク" icon={<TapAndPlayIcon />} {...a11yProps(2)} />
        </Tabs>
      </AppBar>
    </div>
  );
}

export default MobileFooterTab