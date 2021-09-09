import React from 'react';
import { useHistory } from "react-router-dom";
import _ from 'lodash';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Grid, Typography } from '@material-ui/core';
import { TALK_LIST } from '../../types/homeTypes';
import noimage from '../../../image/no-image2.jpg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
      fontSize: 12
    },
    talklist: {
        '&:hover': {
            background: "rgb(209, 208, 208)",
            cursor: 'pointer'
        }
    }
  }),
);

const MyTalkList: React.FC<TALK_LIST> = (props) => {
    const history = useHistory();
    const classes = useStyles();

    return (
        <div>
            {_.map(props.data, value => (
                <Grid container justify="center" key={value.id}>
                    <Grid item xs={12} sm={11}>
                        <List className={classes.root}>
                            <ListItem alignItems="flex-start" className={classes.talklist} onClick={() => history.push('/test/talk/test2')}>
                                <ListItemAvatar>
                                    <Avatar alt={value.other ? value.other.image_file : ''} src={value.other ? value.other.image_url : ''} />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={value.other ? value.other.name : ''}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textSecondary"
                                            >
                                                {value.content}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </List>
                    </Grid>
                </Grid>
            ))}
        </div>
    );
}

export default MyTalkList