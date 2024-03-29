import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchGetErrorMessages, fetchGetUrl, fetchAsyncGetToken, fetchCredStart, fetchCredEnd } from '../appSlice';
import { fetchAsyncGetTalks, selectTalks, fetchAsyncPostTalks, fetchWebsocketMessage, fetchAsyncDeleteMreads, selectHomePage } from './homeSlice';
import { Grid, Typography, Box, Avatar, IconButton, TextField } from '@material-ui/core';
import Pusher from 'pusher-js';
import ReplyIcon from '@material-ui/icons/Reply';
import _ from 'lodash';
import DateFormat from '../../../functions/dateFormat';
import { AppDispatch } from '../../../stores/store';
import { PUSHER_TALK_RES } from '../../types/homeTypes';
import Loading from '../../components/common/Loading'; 
import InfiniteScroll  from "react-infinite-scroller";

const appKey = process.env.REACT_APP_PUSHER_APP_KEY!;
const appCluster = process.env.REACT_APP_PUSHER_APP_CLUSTER!;
const appChannel = process.env.REACT_APP_PUSHER_APP_CHANNEL!;
const appEvent = process.env.REACT_APP_PUSHER_APP_EVENT!;

const Talk: React.FC = () => {
    const history = useHistory();
    const { id } = useParams<{id: string}>();
    const messageArea = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState('');
    // scrollerの制御
    const [scroll, setScroll] = useState(true);
    const [page, setPage] = useState(1);
    // redux
    const dispatch: AppDispatch = useDispatch();
    const talks = useSelector(selectTalks);
    const homePages = useSelector(selectHomePage);
    // pusher
    Pusher.logToConsole = true;

    /**
     * スクロールが存在する場合、メッセージ表示部分のスクロールを最下層に初期値として設定
     */
    const handleScrollBottom = () => {
        if(messageArea.current !== null) {
            messageArea.current.scrollTop = messageArea.current?.scrollHeight;
        }
    }

    useEffect(() => {
        // トーク履歴を取得
        const renderTalk = async () => {
            const talkRes = await dispatch(fetchAsyncGetTalks({id: +localStorage.loginId, user_id: +id, page: 1}));
            if(fetchAsyncGetTalks.fulfilled.match(talkRes) && talkRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(talkRes.payload.error_message));
                return;
            }
            handleScrollBottom();
            dispatch(fetchGetUrl(history.location.pathname));
        }        
        renderTalk();

        // pusher
        const pusher = new Pusher(appKey, {
            cluster: appCluster
        });
    
        const channel = pusher.subscribe(appChannel);
        channel.bind(appEvent, function(data: PUSHER_TALK_RES) {
            // 自身がuser_idで設定されたとき(受け手)のみPusherからメッセージを取得
            if (data.talk.user_id === +localStorage.loginId) dispatch(fetchWebsocketMessage(data));
            handleScrollBottom();
        });
    }, [dispatch]);

    useEffect(() => {
        // トークの未読数データを削除
        const deleteMreads = async () => {
            const mreadRes = await dispatch(fetchAsyncDeleteMreads({user_id: +id}));
            if(fetchAsyncDeleteMreads.fulfilled.match(mreadRes) && mreadRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(mreadRes.payload.error_message));
                return;
            }
        }
        deleteMreads();
    }, [talks]);

    // メッセージの値を更新
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
    }

    // メッセージ保存処理
    const handleSubmit = async () => {
        const rtalkRes = await dispatch(fetchAsyncPostTalks({own_id: +localStorage.loginId, user_id: +id, content: value}));
        if(fetchAsyncGetTalks.fulfilled.match(rtalkRes) && rtalkRes.payload.error_message) {
            dispatch(fetchGetErrorMessages(rtalkRes.payload.error_message));
            return;
        }
        // TextFieldの値を空にする
        setValue('');
        const talkInput = document.getElementById('talk_input') as HTMLTextAreaElement;
        if(talkInput !== null) {
            talkInput.value = '';
        }
        handleScrollBottom();
    }

    /**
     * 項目を読み込むときのコールバック
     */
    const loadMore = async () => {
        // loadMoreの実行を停止
        setScroll(false);
        if(homePages.ti_lastpage === 1) {
            return;
        }
        // ページ数の更新
        const currentPage = page + 1;
        setPage(currentPage);
        // Loading開始
        await dispatch(fetchCredStart);
        
        // トーク履歴の取得
        const talkRes = await dispatch(fetchAsyncGetTalks({id: +localStorage.loginId, user_id: +id, page: currentPage}));
        if(fetchAsyncGetTalks.fulfilled.match(talkRes) && talkRes.payload.error_message) {
            dispatch(fetchGetErrorMessages(talkRes.payload.error_message));
            return;
        }
        if(talkRes) {
            if(currentPage === homePages.ti_lastpage) return;
            setScroll(true);
        }
        // Loading終了
        await dispatch(fetchCredEnd);
    }

    return (
        <div id="talk">
            <Grid container justify="center">
                <Grid item xs={11} sm={8} md={7} className="message_area" ref={messageArea}>
                    <InfiniteScroll
                        isReverse={true}                      // イベント発火を上下逆に実行
                        pageStart={0}
                        loadMore={loadMore}                   // 項目を読み込む際に処理するコールバック関数
                        initialLoad={false}
                        threshold={700}
                        hasMore={scroll}                      // 読み込みを行うかどうかの判定
                        loader={<Loading key={0} />}          // 記事取得中のロード画面
                        useWindow={false}                     // 親要素のスクロールで発火する(windowサイズのスクロールは無視)
                    >
                        {
                            _.map(talks, value => (
                                <div className="message_box" key={value.id}>
                                    {
                                        value.own_id === +localStorage.loginId ? 
                                            <Box component="div" m={1} borderRadius={16} className="right-box">
                                                <div className="avatar_area">
                                                    <Avatar
                                                        src={value.own.image_url}
                                                        className="avatar"
                                                    />
                                                    <Typography className="avatar_name">
                                                        {value.own.name}
                                                    </Typography>
                                                </div>
                                                <div className="content_area">
                                                    <Typography key={value.id} className="content">{value.content}</Typography>
                                                </div>
                                                <Typography style={{ textAlign: 'right', marginRight: '1rem', color: '#fff', fontSize: '0.7rem' }}>{DateFormat(value.created_at, true)}</Typography>
                                            </Box>
                                        :
                                            <Box component="div" key={value.id} m={1} borderRadius={16} className="left-box">
                                                <div className="avatar_area">
                                                    <Avatar
                                                        src={value.own.image_url}
                                                        className="avatar"
                                                    />
                                                    <Typography className="avatar_name left">
                                                        {value.own.name}
                                                    </Typography>
                                                </div>
                                                <div className="content_area">
                                                    <Typography key={value.id} className="content">{value.content}</Typography>
                                                </div>
                                                <Typography style={{ textAlign: 'right', marginRight: '1rem', color: 'rgb(179, 165, 165)', fontSize: '0.7rem' }}>{DateFormat(value.created_at, true)}</Typography>
                                            </Box>
                                    }
                                </div>
                            ))
                        }
                    </InfiniteScroll>
                </Grid>
                <Grid item xs={11} sm={8} md={7} className="message_field">
                    <TextField
                        id="talk_input"
                        className="textfield"
                        name="message"
                        label="メッセージ"
                        variant="outlined"
                        multiline
                        onChange={(e) => handleChange(e)}
                    />
                    <IconButton 
                        color="primary" 
                        aria-label="add"
                        className="sendbutton"
                        onClick={handleSubmit}
                    >
                        <ReplyIcon className="reply_icon" />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
}

export default Talk
