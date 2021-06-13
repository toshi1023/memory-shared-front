import React, { useState } from 'react';
import '../../../styles/home/home.scss';
import UserCard from '../../components/users/UserCard';
import GroupListData from '../../components/users/GroupListData';
import MobileHeaderTab from '../../components/common/MobileHeaderTab';
import { Grid, Typography, Hidden } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';

import group_list from '../../../data/group_list_data.json';

const UserDetail: React.FC = () => {
    const displayStyles = DisplayStyles();
    // スマホ用の画面切り替えを管理
    const [view, setView] = useState(0);

    // MobileHeaderTab用のラベルを設定
    const label = {
        label1: 'ユーザ詳細',
        label2: 'グループ一覧'
    }

    // MobileHeaderTab用のcallback関数を設定
    const callback = {
        function1: (value: number) => setView(value),
        function2: (value: number) => setView(value)
    }

    /**
     * スマホ用UserCardの表示
     * @returns 
     */
    const renderMobileUserCard = () => {
        return (
            <Grid container justify="center" spacing={1} className="card">
                <Grid item xs={11} sm={7} md={5}>
                    <UserCard data={profile} />
                </Grid>
            </Grid>
        );
    }

    /**
     * スマホ用GroupListDataの表示
     * @returns 
     */
    const renderMobileGroupList = () => {
        return (
            <>
                <Grid container>
                    <Grid item xs className="title_space center">
                        <Typography className="title">
                            参加中のグループ
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justify="center">
                    <Grid item xs={11}>
                        <GroupListData data={group_list} />
                    </Grid>
                </Grid>
            </>
        );
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

            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                <Grid container justify="center" spacing={1} className="card">
                    <Grid item md>
                        {/* 広告用写真 */}
                    </Grid>
                    <Grid item sm={7} md={5}>
                        <UserCard data={profile} />
                    </Grid>
                    <Hidden smDown>
                        <Grid item md className="title_space center">
                            <Typography className="title">
                                参加中のグループ
                            </Typography>
                            <GroupListData data={group_list} />
                        </Grid>
                    </Hidden>
                </Grid>
                <Grid container>
                    <Hidden mdUp>
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

            {/* スマホ版 */}
            <div className={displayStyles.sectionMobile}>
                <Grid container>
                    <Grid item xs={12}>
                        <MobileHeaderTab label={label} callback={callback} />
                    </Grid>
                </Grid>

                {
                    view ?
                        renderMobileGroupList()
                    :
                        renderMobileUserCard()
                }

            </div>
        </div>
    )
}

export default UserDetail
