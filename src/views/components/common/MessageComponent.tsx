import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { MESSEAGE_COMPONENT } from '../../types/commonTypes';

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  
const useStyles = makeStyles((theme) => ({
root: {
    width: '100%',
    '& > * + *': {
    marginTop: theme.spacing(2),
    },
},
message: {
    fontSize: '1.1rem',
},
infoFrame: {
    background: 'rgb(118, 243, 135)'
},
errorFrame: {
    background: 'rgb(245, 149, 149)'
}
}));

const MessageComponent: React.FC<MESSEAGE_COMPONENT> = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    // infoメッセージの格納
    // const infoMessage = useSelector(selectInfo)
    const infoMessage = '登録に成功しました';
    // errorメッセージの格納
    // const errorMessage = useSelector(selectError)
    const errorMessage = '登録に失敗しました';
    // snackBarの表示制御
    const handleClose = () => {
      // infoメッセージとerrorメッセージのリセット
    //   dispatch(fetchGetInfoMessages(''))
    //   dispatch(fetchGetErrorMessages(''))
    };

    return (
        <div className={classes.root}>
        {
          // infoメッセージの表示制御
          infoMessage ? 
            <Snackbar open={props.infoOpen} onClose={handleClose} autoHideDuration={6000}>
              <Alert onClose={handleClose} className={classes.infoFrame} severity="success">
                <Typography className={classes.message}>{infoMessage}</Typography>
              </Alert>
            </Snackbar>
          : ''
        }
        {
          // errorメッセージの表示制御
          errorMessage ? 
            <Snackbar open={props.errorOpen} onClose={handleClose} autoHideDuration={6000}>
              <Alert onClose={handleClose} className={classes.errorFrame} severity="error">
                <Typography className={classes.message}>{errorMessage}</Typography>
              </Alert>
            </Snackbar>
          : ''
        }
      </div>
    )
}

export default MessageComponent
