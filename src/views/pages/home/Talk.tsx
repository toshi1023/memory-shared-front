import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchGetErrorMessages, fetchGetUrl } from '../appSlice';
import { fetchAsyncGetTalks, selectTalks, fetchAsyncPostTalks } from './homeSlice';
import { Grid, Typography, Hidden, Button, Box, Avatar, CardContent, IconButton, TextField } from '@material-ui/core';
import Pusher from 'pusher-js';
import ReplyIcon from '@material-ui/icons/Reply';
import _ from 'lodash';
import DateFormat from '../../../functions/dateFormat';
import { AppDispatch } from '../../../stores/store';
import { PUSHER_TALK_RES } from '../../types/homeTypes';

const appKey = process.env.REACT_APP_PUSHER_APP_KEY!;
const appCluster = process.env.REACT_APP_PUSHER_APP_CLUSTER!;
const appChannel = process.env.REACT_APP_PUSHER_APP_CHANNEL!;
const appEvent = process.env.REACT_APP_PUSHER_APP_EVENT!;

const Talk: React.FC = () => {
    const history = useHistory();
    const { id } = useParams<{id: string}>();
    const messageArea = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState('');
    // redux
    const dispatch: AppDispatch = useDispatch();
    const talks = useSelector(selectTalks);
    // pusher
    Pusher.logToConsole = true;

    useEffect(() => {
        // トーク履歴を取得
        const renderTalk = async () => {
            const talkRes = await dispatch(fetchAsyncGetTalks({id: +localStorage.loginId, user_id: +id}));
            if(fetchAsyncGetTalks.fulfilled.match(talkRes) && talkRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(talkRes.payload.error_message));
                return;
            }
            // スクロールが存在する場合、メッセージ表示部分のスクロールを最下層に初期値として設定
            if(messageArea.current !== null) {
                messageArea.current.scrollTop = messageArea.current?.clientHeight;
            }
            dispatch(fetchGetUrl(history.location.pathname));
        }        
        renderTalk();

        // pusher
        const pusher = new Pusher(appKey, {
            cluster: appCluster
        });
    
        const channel = pusher.subscribe(appChannel);
        channel.bind(appEvent, function(data: PUSHER_TALK_RES) {
            console.log(JSON.stringify(data));
        });
    }, [dispatch]);

    useEffect(() => {
        // スクロールが存在する場合、メッセージ表示部分のスクロールを最下層に初期値として設定
        if(messageArea.current !== null) {
            messageArea.current.scrollTop = messageArea.current?.clientHeight;
        }
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
    }

    return (
        <div id="talk">
            <Grid container justify="center">
                <Grid item xs={11} sm={8} md={7} className="message_area" ref={messageArea}>
                    {
                        _.map(talks, value => (
                            <div className="message_box">
                                {
                                    value.own_id === +localStorage.loginId ? 
                                        <Box component="div" key={value.id} m={1} borderRadius={16} className="right-box">
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
                </Grid>
                <Grid item xs={11} sm={8} md={7} className="message_field">
                    <TextField
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
