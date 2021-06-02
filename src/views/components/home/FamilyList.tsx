import React from 'react';
import _ from 'lodash';
import { FAMILY_LIST, GROUP_LIST } from '../../types/homeTypes';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Avatar, Grid, Typography } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    userList: {
        marginRight: '5px',
        marginLeft: '5px',
        '&:hover': {
            background: "rgb(209, 208, 208)",
        }
    },
    userName: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconBackGround: {
        backgroundColor: 'rgb(126, 170, 252)'
    }
  }),
);

const FamilyList: React.FC<FAMILY_LIST> = (props) => {
    const classes = useStyles();

    return (
        <div>
            {_.map(props.data, value => (
                <Grid container justify="center" alignItems="center" className={classes.userList} key={value.id}>
                    <Grid item sm={9} className={classes.avatar}>
                        <Avatar alt="Remy Sharp" src={value.image_file} />
                        <Typography color="textSecondary" className={classes.userName}>
                            {value.name}
                        </Typography>
                    </Grid>
                    <Grid item sm={3}>
                        <Avatar className={classes.iconBackGround}><MailIcon /></Avatar>
                    </Grid>
                </Grid>
            ))}
        </div>
    )
}

export default FamilyList
