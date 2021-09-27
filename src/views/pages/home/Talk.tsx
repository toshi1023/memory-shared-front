import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchGetErrorMessages, fetchGetUrl } from '../appSlice';
import { fetchAsyncGetTalks, selectTalks } from './homeSlice';
import { Grid, Typography, Hidden, Button, Box, Avatar, CardContent, IconButton, TextField } from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply';
import _ from 'lodash';
import { AppDispatch } from '../../../stores/store';

const Talk: React.FC = () => {
    const history = useHistory();
    const { id } = useParams<{id: string}>();
    const messageArea = useRef<HTMLDivElement>(null);
    // redux
    const dispatch: AppDispatch = useDispatch();
    const talks = useSelector(selectTalks);

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
    }, [dispatch]);

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
                    />
                    <IconButton 
                        color="primary" 
                        aria-label="add"
                    >
                        <ReplyIcon className="reply_icon" />
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
}

export default Talk
