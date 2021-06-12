import React from 'react';
import '../../../styles/home/home.scss';
import UserCard from '../../components/users/UserCard';
import GroupListData from '../../components/users/GroupListData';
import MobileHeaderTab from '../../components/common/MobileHeaderTab';
import { Grid, Typography, Hidden } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';

import group_list from '../../../data/group_list_data.json';

const UserDetail: React.FC = () => {
    const displayStyles = DisplayStyles();

    // MobileHeaderTab用のラベルを設定
    const label = {
        label1: 'ユーザ詳細',
        label2: 'グループ一覧'
    }

    // MobileHeaderTab用のcallback関数を設定
    const callback = {
        function1: () => console.log('function1'),
        function2: () => console.log('function2')
    }
    
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
            <Grid container>
                <Hidden mdUp smUp>
                    <Grid item xs={12}>
                        <MobileHeaderTab label={label} callback={callback} />
                    </Grid>
                </Hidden>
            </Grid>
            <Grid container justify="center" spacing={1} className="card">
                <Grid item md>
                    {/* 広告用写真 */}
                </Grid>
                <Grid item xs={11} sm={7} md={5}>
                    <UserCard data={profile} />
                </Grid>
                <Hidden xsDown smDown>
                    <Grid item md className="title_space center">
                        <Typography className="title">
                            参加中のグループ
                        </Typography>
                        <GroupListData data={group_list} />
                    </Grid>
                </Hidden>
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
