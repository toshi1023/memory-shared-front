import React from 'react';
import { Grid, Typography, Hidden, Button, Box, Avatar, CardContent, IconButton, TextField } from '@material-ui/core';
import ReplyIcon from '@material-ui/icons/Reply';
import _ from 'lodash';

import talk_list from '../../../data/talk_list_data.json';

const Talk: React.FC = () => {
    const loginId = 1;

    return (
        <div id="talk">
            <Grid container justify="center">
                <Grid item xs={11} sm={8} md={7} className="message_area">
                    {
                        _.map(talk_list, value => (
                            <div className="message_box">
                                {
                                    value.own_id === loginId ? 
                                        <Box component="div" key={value.id} m={1} borderRadius={16} className="right-box">
                                            <Avatar
                                                src={value.image_file}
                                                className="avatar"
                                            />
                                            <CardContent>
                                                <Typography key={value.id} className="content">{value.content}</Typography>
                                            </CardContent>
                                        </Box>
                                    :
                                        <Box component="div" key={value.id} m={1} borderRadius={16} className="left-box">
                                            <Avatar
                                                src={value.image_file}
                                                className="avatar"
                                            />
                                            <CardContent>
                                                <Typography key={value.id} className="content">{value.content}</Typography>
                                            </CardContent>
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
