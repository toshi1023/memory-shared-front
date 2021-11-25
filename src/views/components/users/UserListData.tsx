import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import ComponentStyles from '../../../styles/common/componentStyle';
import { fetchCredStart, fetchCredEnd } from '../../pages/appSlice';
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
import Loading from '../common/Loading'; 
import InfiniteScroll  from "react-infinite-scroller";
import { AppDispatch } from '../../../stores/store';

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
    // scrollerの制御
    const [scroll, setScroll] = useState(true);
    const [page, setPage] = useState(1);
    // redux
    const dispatch: AppDispatch = useDispatch();

    // 検索もしくはソート条件の変動でカレントページをリセット
    useEffect(() => {
        console.log(props.searchkey)
        setPage(1);
        setScroll(true);
    }, [props.searchkey]);

    /**
     * 項目を読み込むときのコールバック
     */
    const loadMore = useCallback(async () => {
        // loadMoreの実行を停止
        setScroll(false);
        if(props.page.last_page === 1) {
            return;
        }
        // ページ数の更新
        const currentPage = page + 1;
        setPage(currentPage);
        // Loading開始
        await dispatch(fetchCredStart);
        
        // ユーザの取得
        const res = await props.callback(currentPage);
        if(res) {
            if(currentPage === props.page.last_page) return;
            setScroll(true);
        }
        // Loading終了
        await dispatch(fetchCredEnd);
    }, [page]);

    return (
        <List dense className={classes.root}>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}                   //項目を読み込む際に処理するコールバック関数
                initialLoad={false}
                threshold={700}
                hasMore={scroll}                      //読み込みを行うかどうかの判定
                loader={<Loading key={0} />}          // 記事取得中のロード画面
            >
                {_.map(props.data, value => {
                    const labelId = `user-list-${value.id}`;
                    return (
                        <ListItem key={value.id} button className={classes.listItem} onClick={() => history.push(`users/${value.name}/${value.id}`)}>
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
            </InfiniteScroll>
        </List>
    );
}

export default React.memo(UserListData)