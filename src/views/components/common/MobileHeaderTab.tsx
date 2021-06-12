import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { MOBILE_HEADER_TAB } from '../../types/commonTypes';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
});

/**
 * 画面切り替えメニュー(スマホ専用)
 * @returns 
 */
const MobileHeaderTab: React.FC<MOBILE_HEADER_TAB> = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    if(newValue === 0) {
      props.callback.function1();
      return;
    }
    if(newValue === 1) {
      props.callback.function2();
      return;
    }
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab label={props.label.label1} />
        <Tab label={props.label.label2} />
      </Tabs>
    </Paper>
  );
}

export default MobileHeaderTab