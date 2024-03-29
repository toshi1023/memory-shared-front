import React from 'react';
import { useHistory } from "react-router-dom";
import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { GROUP_LIST_DATA } from '../../types/usersTypes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        listItem: {
            margin: '10px 0 10px 0'
        }
    }),
);

/**
 * グループ一覧表示用関数
 * @param props 
 * @returns 
 */
const GroupListData: React.FC<GROUP_LIST_DATA> = (props) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <List dense className={classes.root}>
        {_.map(props.data, value => {
            const labelId = `user-list-${value.id}`;
            return (
                <ListItem key={value.id} button className={classes.listItem} onClick={() => history.push(`/groups/${value.name}/${value.id}`)}>
                    <ListItemAvatar>
                        <Avatar
                            alt={value.image_file}
                            src={value.image_url}
                        />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={value.name} />
                </ListItem>
            );
        })}
        </List>
    );
}

export default GroupListData