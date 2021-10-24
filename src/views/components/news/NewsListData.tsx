import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { fetchGetErrorMessages, fetchAsyncGetNreadCount } from '../../pages/appSlice';
import { fetchGetNewsInfo, fetchAsyncDeleteNreads } from '../../pages/news/newsSlice';
import _ from 'lodash';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MailIcon from '@material-ui/icons/Mail';
import DraftsIcon from '@material-ui/icons/Drafts';
import { NEWS_LIST_DATA, NEWS_REDUCER, DELETE_NREADS_PROPS } from '../../types/newsTypes';
import { AppDispatch } from '../../../stores/store';

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
    // redux
    const dispatch: AppDispatch = useDispatch();

    /**
     * 未読データ削除処理
     */
    const handleListItemClick = async (props: DELETE_NREADS_PROPS) => {
        const dnreadsRes = await dispatch(fetchAsyncDeleteNreads(props));
        if(fetchAsyncDeleteNreads.fulfilled.match(dnreadsRes) && dnreadsRes.payload.error_message) {
            dispatch(fetchGetErrorMessages(dnreadsRes.payload.error_message));
            return;
        }
        // ニュース未読数の取得
        const nreadCountRes = await dispatch(fetchAsyncGetNreadCount());
        if(fetchAsyncGetNreadCount.fulfilled.match(nreadCountRes) && nreadCountRes.payload.error_message) {
            dispatch(fetchGetErrorMessages(nreadCountRes.payload.error_message));
            return;
        }
    }

    /**
     * クリックしたニュースの詳細情報を取得
     * @param value 
     */
    const getNewsInfo = (value: NEWS_REDUCER) => {
        dispatch(fetchGetNewsInfo(value));
    }
    
    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
            {_.map(props.data, value => {
                return (
                    <>
                        {
                            value.read_user_id ? 
                                <ListItem
                                    button
                                    selected={false}
                                    onClick={() => {
                                        handleListItemClick({
                                            id: value.news_id,
                                            news_user_id: value.user_id,
                                            user_id: value.read_user_id
                                        });
                                        getNewsInfo(value);
                                    }}
                                    key={`${value.user_id}${value.news_id}`}
                                >
                                    <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={<Typography color="textSecondary">{value.title}</Typography>} />
                                </ListItem>
                            :
                                <ListItem
                                    button
                                    selected={true}
                                    onClick={() => {
                                        handleListItemClick({
                                            id: value.news_id,
                                            news_user_id: value.user_id,
                                            user_id: value.read_user_id
                                        });
                                        getNewsInfo(value);
                                    }}
                                    key={`${value.user_id}${value.news_id}`}
                                >
                                    <ListItemIcon>
                                        <DraftsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={<Typography color="textSecondary">{value.title}</Typography>} />
                                </ListItem>
                        }
                    </>
                )
            })}
            </List>
        </div>
    )
}

export default NewsListData