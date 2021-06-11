import React from 'react';
import '../../../styles/home/home.scss';
import UserCard from '../../components/users/UserCard';
import GroupListData from '../../components/users/GroupListData';
import { Grid, Typography, Hidden } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';

import group_list from '../../../data/group_list_data.json';

const UserDetail: React.FC = () => {
    const displayStyles = DisplayStyles();
    
    const profile = {
        id: 2,
        name: 'test',
        image_file: '',
        hobby: '映画鑑賞',
        gender: true,
        description: 'バスケと映画鑑賞が好きな会社員です。アクティブな付き合いをしたいです。',
        family_id: 1,
        talk_id: 1,
    }

    return (
        <div id="user_detail">
            <Grid container justify="center" className="card">
                <Grid item xs={11} sm={7} md={5}>
                    <UserCard data={profile} />
                </Grid>
            </Grid>
            <Grid container>
                <Hidden mdUp xsDown>
                    <Grid item sm className="title_space center">
                        <Typography className="title">
                            参加中のグループ
                        </Typography>
                    </Grid>
                </Hidden>
            </Grid>
            <Grid container justify="center">
                {/* mdサイズ以上は表示しない */}
                <Hidden mdUp xsDown>
                    <Grid item sm={7}>
                        <GroupListData data={group_list} />
                    </Grid>
                </Hidden>
            </Grid>
        </div>
    )
}

export default UserDetail
