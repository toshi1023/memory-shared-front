import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ComponentStyles from '../../../styles/common/componentStyle';
import { useHistory } from "react-router-dom";
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
import { GROUP_LIST_DATA } from '../../types/groupsTypes';
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
    // scrollerの制御
    const [scroll, setScroll] = useState(true);
    // redux
    const dispatch: AppDispatch = useDispatch();

    /**
     * 項目を読み込むときのコールバック
     * @param {*} page 
     */
    const loadMore = async (page: number) => {
        console.log(page);
        // loadMoreの実行を停止
        setScroll(false);
        // Loading開始
        await dispatch(fetchCredStart);
        
        // グループの取得
        const res = await props.callback(page);
        if(res) {
            if(page === props.page.last_page) return;
            setScroll(true);
        }
        // Loading終了
        await dispatch(fetchCredEnd);
    }

    return (
        <List dense className={classes.root}>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}    //項目を読み込む際に処理するコールバック関数
                initialLoad={false}
                threshold={700}
                hasMore={scroll}                      //読み込みを行うかどうかの判定
                loader={<Loading />}                  // 記事取得中のロード画面
            >
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
            </InfiniteScroll>
        </List>
    );
}

export default GroupListData