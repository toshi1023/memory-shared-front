import React from 'react';
import { useHistory } from "react-router-dom";
import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { GROUP_LIST_DATA } from '../../types/groupsTypes';

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
        },
        green: {
            backgroundColor: 'rgb(105, 247, 148)',
            color: 'white'
        },
    }),
);

/**
 * ユーザ一覧表示用関数
 * @param props 
 * @returns 
 */
const UserListData: React.FC<GROUP_LIST_DATA> = (props) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <List dense className={classes.root}>
        {_.map(props.data, value => {
            const labelId = `user-list-${value.id}`;
            return (
                <ListItem key={value.id} button className={classes.listItem} onClick={() => history.push('users/test')}>
                    <ListItemAvatar>
                        <Avatar
                            alt={`Avatar n°${value.id + 1}`}
                            src={value.image_file}
                        />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={value.name} />
                    <ListItemSecondaryAction>
                        {
                            value.status_type === 'ホスト' ? 
                                <Chip label="ホスト" className={classes.chip} color="secondary" />
                            :
                                ''
                        }
                        {
                            value.status_type === 'メンバー' ? 
                                <Chip label="メンバー" className={classes.chip && classes.green} />
                            :
                                ''
                        }
                        {
                            value.status_type === '申請中' ? 
                                <Chip label="申請中" className={classes.chip && classes.yellow} />
                            :
                                ''
                        }
                        {
                            value.status_type === null ? 
                                <Button><Chip label="申請する" className={classes.chip} color="primary" /></Button>
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

export default UserListData