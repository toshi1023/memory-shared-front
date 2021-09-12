import React from 'react';
import ComponentStyles from '../../../styles/common/componentStyle';
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
    }),
);

/**
 * グループ一覧表示用関数
 * @param props 
 * @returns 
 */
const GroupListData: React.FC<GROUP_LIST_DATA> = (props) => {
    const classes = useStyles();
    const componentStyles = ComponentStyles();
    const history = useHistory();

    return (
        <List dense className={classes.root}>
        {_.map(props.data, value => {
            const labelId = `group-list-${value.id}`;
            return (
                <ListItem key={value.id} button className={classes.listItem} onClick={() => history.push(`groups/${value.name}/${value.id}`)}>
                    <ListItemAvatar>
                        <Avatar
                            alt={value.image_file}
                            src={value.image_url}
                        />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={value.name} />
                    <ListItemSecondaryAction>
                        {
                            value.host_user_id === +localStorage.loginId ? 
                                <Chip label="ホスト" className={componentStyles.chip} color="secondary" />
                            :
                                value.users && value.users[0] !== undefined && value.users[0].pivot.status === 2 ? 
                                    <Chip label="メンバー" className={componentStyles.chip && componentStyles.green} />
                                :
                                    ''
                        }
                        {
                            value.users && value.users[0] !== undefined && value.users[0].pivot.status === 1 ? 
                                <Chip label="申請中" className={componentStyles.chip && componentStyles.yellow} />
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

export default GroupListData