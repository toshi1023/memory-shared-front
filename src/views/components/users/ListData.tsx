import React from 'react';
import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { USER_LIST_DATA } from '../../types/usersTypes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        listItem: {
            margin: '10px 0 10px 0'
        },
        chip: {
            fontSize: '0.5rem',
        },
        yellow: {
            backgroundColor: 'rgb(213, 247, 119)',
            color: 'white'
        }
    }),
);

/**
 * ユーザ一覧表示用関数
 * @param props 
 * @returns 
 */
const ListData: React.FC<USER_LIST_DATA> = (props) => {
    const classes = useStyles();

    return (
        <List dense className={classes.root}>
        {_.map(props.data, value => {
            const labelId = `user-list-${value.id}`;
            return (
            <ListItem key={value.id} button className={classes.listItem}>
                <ListItemAvatar>
                    <Avatar
                        alt={`Avatar n°${value.id + 1}`}
                        src={value.image_file}
                    />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={value.name} />
                <ListItemSecondaryAction>
                    {
                        value.talk_id ? 
                            <Chip label="トーク中" className={classes.chip} color="primary" />
                        :
                            ''
                    }
                    {
                        value.family_id ? 
                            <Chip label="ファミリー" className={classes.chip && classes.yellow} />
                        :
                            ''
                    }
                </ListItemSecondaryAction>
            </ListItem>
            );
        })}
        </List>
    );
}

export default ListData