import React from 'react';
import { Grid, Typography, Hidden, Button, Box, Avatar, CardContent } from '@material-ui/core';
import _ from 'lodash';

import talk_list from '../../../data/talk_list_data.json';

const Talk: React.FC = () => {
    return (
        <div id="talk">
            <Grid container>
                <Grid item xs={11} sm={8} md={7}>
                    {
                        _.map(talk_list, value => (
                            <Box component="div" key={value.id} m={1} borderRadius={16} className="left-box">
                                <Avatar
                                    src={value.image_file}
                                    className="avatar"
                                />
                                <CardContent>
                                    <Typography key={value.id} className="content">{value.content}</Typography>
                                </CardContent>
                            </Box>
                        ))
                    }
                </Grid>
            </Grid>
        </div>
    )
}

export default Talk
