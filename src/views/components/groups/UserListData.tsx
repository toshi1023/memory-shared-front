import React from 'react';
import { useHistory } from "react-router-dom";
import '../../../styles/common/common.scss';
import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { USER_LIST_DATA } from '../../types/groupsTypes';

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
 * ユーザ一覧表示用関数
 * @param props 
 * @returns 
 */
const UserListData: React.FC<USER_LIST_DATA> = (props) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <>
            {
                props.host_user_id === +localStorage.loginId ? 
                    <>
                        <List dense className={classes.root}>
                            {_.map(props.subdata, value => {
                                const labelId = `user-list-${value.id}`;
                                return (
                                    <ListItem key={value.id} button className={classes.listItem} onClick={() => {
                                        value.id === +localStorage.loginId ? 
                                            history.push('/')
                                        :
                                            history.push(`/users/${value.user.name}/${value.id}`)
                                    }}>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={value.user.image_file}
                                                src={value.user.image_url}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={labelId} primary={value.user.name} />
                                    </ListItem>
                                );
                            })}
                        </List>
                        <br />
                        <hr className="app_hr" />
                        <div className="c_title_space">
                            <Typography className="c_title">
                                参加ユーザ
                            </Typography>
                        </div>
                    </>
                :
                    ''
            }

            <List dense className={classes.root}>
                {_.map(props.data, value => {
                    const labelId = `user-list-${value.id}`;
                    return (
                        <ListItem key={value.id} button className={classes.listItem} onClick={() => {
                            value.id === +localStorage.loginId ? 
                                history.push('/')
                            :
                                history.push(`/users/${value.name}/${value.id}`)
                        }}>
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
        </>
    );
}

export default UserListData