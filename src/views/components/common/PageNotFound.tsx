import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1
    },
    errorIcon: {
        height: theme.spacing(7),
        width: theme.spacing(7),
    }
}));

/**
 * 404エラーページ用関数
 * @returns 
 */
const PageNotFound: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ErrorIcon className={classes.errorIcon} />
            <Typography gutterBottom variant="h2" component="h4">
                404 ERROR !
            </Typography>
            <Typography gutterBottom variant="h5" component="h6">
                ページが見つかりません
            </Typography>
        </div>
    )
}

export default PageNotFound
