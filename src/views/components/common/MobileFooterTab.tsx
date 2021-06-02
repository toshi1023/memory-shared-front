import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
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
      <Paper square className={classes.root}>
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
      </Paper>
    </div>
  );
}

export default MobileFooterTab