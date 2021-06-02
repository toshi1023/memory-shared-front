import React from 'react';
import _ from 'lodash';
import { GROUP_LIST } from '../../types/homeTypes';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Avatar, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    groupList: {
        marginLeft: '5px',
        '&:hover': {
            background: "rgb(209, 208, 208)",
        }
    },
    infomation: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    participants: {
        color: 'rgb(245, 176, 111)'
    },
    unit: {
        fontSize: '0.3rem',
        color: 'rgb(139, 139, 139)'
    }
  }),
);


/**
 * 参加グループ一覧の表示用関数
 */
const GroupList: React.FC<GROUP_LIST> = (props) => {
    const classes = useStyles();
    
    return (
        <div>
            {_.map(props.data, value => (
                <Grid container justify="center" className={classes.groupList} key={value.id}>
                    <Grid item sm={2} className={classes.avatar}>
                        <Avatar alt="Remy Sharp" src={value.image_file} />
                    </Grid>
                    <Grid item sm={6} className={classes.infomation}>
                        <Typography color="textSecondary">
                            {value.name}
                        </Typography>
                    </Grid>
                    <Grid item sm={4} className={classes.infomation}>
                        <Typography className={classes.participants}>
                            {value.participants}
                        </Typography>
                        <span className={classes.unit}>人参加中</span>
                    </Grid>
                </Grid>
            ))}
        </div>
    )
}

export default GroupList