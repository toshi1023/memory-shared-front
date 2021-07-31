import React, { useState } from 'react';
import '../../../styles/home/home.scss';
import '../../../styles/common/common.scss';
import '../../../styles/groups/groups.scss';
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
            <Grid container justify="center">
                <Grid item xs={11} className="c_title_space center">
                    <Typography className="c_title">
                        {profile.name}さんのプロフィール
                    </Typography>
                </Grid>
                <Grid item xs={11}>
                    <UserCard data={profile} />
                </Grid>
                <Grid item xs={11} className="group_list">
                    <hr className="app_hr" />
                    <div className="c_title_space">
                        <Typography className="c_title">
                            参加歓迎中のグループ
                        </Typography>
                    </div>
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
            <Grid container justify="center">
                <Grid item xs={11} className="c_title_space center">
                    <Typography className="c_title">
                        参加中のグループ
                    </Typography>
                </Grid>
                <Grid item xs={11}>
                    <GroupListData data={group_list} />
                </Grid>
            </Grid>
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
                {/* PC版 */}
                <Hidden smDown>
                    <Grid container justify="center">
                        {/* Title */}
                        <Grid item md={6} className="c_title_space">
                            <Typography className="c_title">
                                {profile.name}さんのプロフィール
                            </Typography>
                        </Grid>
                        <Grid item md={3} className="c_title_space center">
                            <Typography className="c_title">
                                参加中のグループ
                            </Typography>
                        </Grid>
                        {/* Content */}
                        <Grid item md={6} className="c_content_space center">

                            <UserCard data={profile} />

                            <br />
                            <hr className="app_hr" />
                            <div className="c_title_space">
                                <Typography className="c_title">
                                    参加歓迎中のグループ
                                </Typography>
                            </div>
                            
                        </Grid>
                        <Grid item md={3} className="c_content_space center">
                            <GroupListData data={group_list} />
                        </Grid>
                    </Grid>
                </Hidden>
                {/* iPad版 */}
                <Hidden mdUp xsDown>
                    <Grid container justify="center">
                        {/* Title */}
                        <Grid item sm={7} className="c_title_space">
                            <Typography className="c_title">
                                {profile.name}さんのプロフィール
                            </Typography>
                        </Grid>
                        <Grid item sm={4} className="c_title_space center">
                            <Typography className="c_title">
                                参加中のグループ
                            </Typography>
                        </Grid>
                        {/* Content */}
                        <Grid item sm={7} className="c_content_space center">

                            <UserCard data={profile} />

                            <br />
                            <hr className="app_hr" />
                            <div className="c_title_space">
                                <Typography className="c_title">
                                    参加歓迎中のグループ
                                </Typography>
                            </div>

                        </Grid>
                        <Grid item sm={4} className="c_content_space center">
                            <GroupListData data={group_list} />
                        </Grid>
                    </Grid>
                </Hidden>
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
