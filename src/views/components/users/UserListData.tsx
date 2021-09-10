import React from 'react';
import { useHistory } from "react-router-dom";
import ComponentStyles from '../../../styles/common/componentStyle';
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
    const componentStyles = ComponentStyles();
    const history = useHistory();

    return (
        <List dense className={classes.root}>
        {_.map(props.data, value => {
            const labelId = `user-list-${value.id}`;
            return (
                <ListItem key={value.id} button className={classes.listItem} onClick={() => history.push('users/test')}>
                    <ListItemAvatar>
                        <Avatar
                            alt={value.image_file}
                            src={value.image_url}
                        />
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={value.name} />
                    <ListItemSecondaryAction>
                        {
                            value.message_relations1 && value.message_relations1.length > 0 || value.message_relations2 && value.message_relations2.length > 0 ? 
                                <Chip label="トーク中" className={componentStyles.chip} color="primary" />
                            :
                                ''
                        }
                        {
                            value.families1 && value.families1.length > 0 || value.families2 && value.families2.length > 0 ? 
                                <Chip label="ファミリー" className={componentStyles.chip && componentStyles.yellow} />
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