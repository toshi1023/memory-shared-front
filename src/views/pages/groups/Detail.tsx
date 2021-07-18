import React, { useState } from 'react';
import '../../../styles/common/common.scss';
import '../../../styles/groups/groups.scss';
import '../../../styles/home/home.scss';
import GroupCard from '../../components/groups/GroupCard';
import UserListData from '../../components/groups/UserListData';
import AlbumListData from '../../components/groups/AlbumListData';
import MobileHeaderTab from '../../components/common/MobileHeaderTab';
import { Grid, Typography, Hidden } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';

import user_list from '../../../data/user_list_data.json';
import album_list from '../../../data/album_list_data.json';

const GroupDetail: React.FC = () => {
    const displayStyles = DisplayStyles();
    // スマホ用の画面切り替えを管理
    const [view, setView] = useState(0);

    // MobileHeaderTab用のラベルを設定
    const label = {
        label1: 'グループ詳細',
        label2: 'ユーザ一覧'
    }

    // MobileHeaderTab用のcallback関数を設定
    const callback = {
        function1: (value: number) => setView(value),
        function2: (value: number) => setView(value)
    }

    /**
     * スマホ用GroupCardの表示
     * @returns 
     */
    const renderMobileGroupCard = () => {
        return (
            <Grid container justify="center">
                <Grid item xs={11} className="title_space center">
                    <Typography className="title">
                        {group.name}の詳細
                    </Typography>
                </Grid>
                <Grid item xs={11}>
                    <GroupCard data={group} />
                </Grid>
                <Grid item xs={11} className="album_list">
                    <hr className="app_hr" />
                    <div className="title_space">
                        <Typography className="title">
                            アルバム
                        </Typography>
                    </div>
                    <AlbumListData data={album_list} />
                </Grid>
            </Grid>
        );
    }

    /**
     * スマホ用UserListDataの表示
     * @returns 
     */
    const renderMobileUserList = () => {
        return (
            <Grid container justify="center">
                <Grid item xs={11} className="title_space center">
                    <Typography className="title">
                        参加ユーザ
                    </Typography>
                </Grid>
                <Grid item xs={11}>
                    <UserListData data={user_list} />
                </Grid>
            </Grid>
        );
    }
    
    const group = {
        id: 2,
        name: 'test',
        image_file: '',
        participants: 4,
        album_count: 6,
        private_flg: true,
        status_type: 'ホスト',
        description: '梅田カフェ巡り！ほっと一息つけるカフェタイムを楽しみにでかけるグループです！'
    }

    return (
        <div id="group_detail">

            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                {/* PC版 */}
                <Hidden smDown>
                    <Grid container justify="center">
                        {/* Title */}
                        <Grid item md={6} className="title_space center">
                            <Typography className="title">
                                {group.name}の詳細
                            </Typography>
                        </Grid>
                        <Grid item md={3} className="title_space center">
                            <Typography className="title">
                                参加ユーザ
                            </Typography>
                        </Grid>
                        {/* Content */}
                        <Grid item md={6} className="content_space center">
                            <GroupCard data={group} />
                            <br />
                            <hr className="app_hr" />
                            <div className="title_space">
                                <Typography className="title">
                                    アルバム
                                </Typography>
                            </div>
                            <AlbumListData data={album_list} />
                        </Grid>
                        <Grid item md={3} className="content_space center">
                            <UserListData data={user_list} />
                        </Grid>
                    </Grid>
                </Hidden>
                {/* iPad版 */}
                <Hidden mdUp xsDown>
                    <Grid container justify="center">
                        {/* Title */}
                        <Grid item sm={7} className="title_space center">
                            <Typography className="title">
                                {group.name}の詳細
                            </Typography>
                        </Grid>
                        <Grid item sm={4} className="title_space center">
                            <Typography className="title">
                                参加ユーザ
                            </Typography>
                        </Grid>
                        {/* Content */}
                        <Grid item sm={7} className="content_space center">
                            <GroupCard data={group} />
                            <br />
                            <hr className="app_hr" />
                            <div className="title_space">
                                <Typography className="title">
                                    アルバム
                                </Typography>
                            </div>
                            <AlbumListData data={album_list} />
                        </Grid>
                        <Grid item sm={4} className="content_space center">
                            <UserListData data={user_list} />
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
                        renderMobileUserList()
                    :
                        renderMobileGroupCard()
                }

            </div>
        </div>
    )
}

export default GroupDetail
