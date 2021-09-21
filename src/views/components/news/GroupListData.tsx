import React from 'react';
import { useHistory } from "react-router-dom";
import '../../../styles/common/common.scss';
import '../../../styles/news/news.scss';
import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { GROUP_LIST_DATA } from '../../types/newsTypes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        listItem: {
            margin: '10px 0 10px 0'
        },
    }),
);

/**
 * 参加申請・承認のグループ一覧表示用関数
 * @param props 
 * @returns 
 */
const GroupListData: React.FC<GROUP_LIST_DATA> = (props) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <>
            <List dense className={classes.root}>
                {_.map(props.data, value => {
                    const labelId = `user-list-${value.id}`;
                    return (
                        <>
                            {
                                value.status === 1 ? 
                                    <ListItem key={value.id} button className={classes.listItem} onClick={() => history.push(`/groups/${value.group.name}/${value.group.id}`)}>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={value.group.image_file}
                                                src={value.group.image_url}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={labelId} primary={value.group.name} />
                                    </ListItem>
                                :
                                    ''
                            }
                        </>
                    );
                })}
            </List>

            <br />
            <hr className="app_hr" />
            <div className="c_title_space">
                <Typography className="c_title">
                    承認済みのグループ
                </Typography>
            </div>

            <List dense className={classes.root}>
                {_.map(props.data, value => {
                    const labelId = `user-list-${value.id}`;
                    return (
                        <>
                            {
                                value.status === 2 ? 
                                    <ListItem key={value.id} button className={classes.listItem} onClick={() => history.push(`/groups/${value.group.name}/${value.group.id}`)}>
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={value.group.image_file}
                                                src={value.group.image_url}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText id={labelId} primary={value.group.name} />
                                    </ListItem>
                                :
                                    ''
                            }
                        </>
                    );
                })}
            </List>
        </>
    )
}

export default GroupListData
