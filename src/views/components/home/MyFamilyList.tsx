import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import { FAMILY_LIST } from '../../types/homeTypes';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Avatar, IconButton, Grid, Typography } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import Loading from '../common/Loading'; 
import InfiniteScroll  from "react-infinite-scroller";
import { fetchCredStart, fetchCredEnd } from '../../pages/appSlice';
import { AppDispatch } from '../../../stores/store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    userList: {
        marginRight: '5px',
        marginLeft: '5px',
        '&:hover': {
            background: "rgb(209, 208, 208)",
        }
    },
    userName: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconBackGround: {
        backgroundColor: 'rgb(126, 170, 252)',
        color: 'white',
        '&:hover': {
            cursor: 'pointer'
        }
    }
  }),
);

const MyFamilyList: React.FC<FAMILY_LIST> = (props) => {
    const classes = useStyles();
    const history = useHistory();
    // scrollerの制御
    const [scroll, setScroll] = useState(true);
    const [page, setPage] = useState(1);
    // redux
    const dispatch: AppDispatch = useDispatch();

    /**
     * 項目を読み込むときのコールバック
     */
    const loadMore = useCallback(async () => {
        if(scroll) {
            // loadMoreの実行を停止
            setScroll(false);
            if(props.page.last_page === 1 || page === props.page.last_page) {
                return;
            }
            // ページ数の更新
            const currentPage = page + 1;
            setPage(currentPage);
            // Loading開始
            await dispatch(fetchCredStart);
            
            // ファミリーの取得
            const res = await props.callback(currentPage);
            if(res) {
                if(currentPage === props.page.last_page) return;
                setScroll(true);
            }
            // Loading終了
            await dispatch(fetchCredEnd);
        }
    }, [page]);

    return (
        <div>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadMore}                   //項目を読み込む際に処理するコールバック関数
                initialLoad={false}
                threshold={700}
                hasMore={scroll}                      //読み込みを行うかどうかの判定
                loader={<Loading key={0} />}          // 記事取得中のロード画面
                useWindow={false}
                getScrollParent={() => props.el.current}
            >
                {_.map(props.data, value => (
                        <Grid container justify="center" alignItems="center" className={classes.userList} key={value.id}>
                            <Grid item xs={9} className={classes.avatar} onClick={() => history.push(`/users/${value.name}/${value.id}`)}>
                                <Avatar alt={value.image_file} src={value.image_url} />
                                <Typography color="textSecondary" className={classes.userName}>
                                    {value.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <IconButton className={classes.iconBackGround} onClick={() => history.push(`/talk/${value.name}/${value.id}`)}>
                                    <MailIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                ))}
            </InfiniteScroll>
        </div>
    )
}

export default React.memo(MyFamilyList)
