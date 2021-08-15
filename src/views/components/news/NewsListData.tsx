import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';
import { NEWS_LIST_DATA } from '../../types/newsTypes';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

const NewsListData: React.FC<NEWS_LIST_DATA> = (props) => {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };
    
    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
            {_.map(props.data, value => {
                return (
                    <ListItem
                        button
                        selected={selectedIndex === 0}
                        onClick={(event) => handleListItemClick(event, 0)}
                    >
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary={<Typography color="textSecondary">{value.title}</Typography>} />
                    </ListItem>
                )
            })}
            </List>
        </div>
    )
}

export default NewsListData