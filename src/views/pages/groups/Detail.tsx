import React, { useState } from 'react';
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
            <Grid container justify="center" spacing={1} className="card">
                <Grid item xs={11} sm={7} md={5}>
                    <GroupCard data={group} />
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
            <>
                <Grid container>
                    <Grid item xs className="title_space center">
                        <Typography className="title">
                            参加ユーザ
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container justify="center">
                    <Grid item xs={11}>
                        <UserListData data={user_list} />
                    </Grid>
                </Grid>
            </>
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
        <div id="user_detail">

            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                <Grid container justify="center" spacing={1} className="card">
                    <Grid item md>
                        {/* 広告用写真 */}
                    </Grid>
                    <Grid item sm={7} md={5}>
                        <GroupCard data={group} />
                        <AlbumListData data={album_list} />
                    </Grid>
                    <Hidden smDown>
                        <Grid item md className="title_space center">
                            <Typography className="title">
                                参加ユーザ
                            </Typography>
                            <UserListData data={user_list} />
                        </Grid>
                    </Hidden>
                </Grid>
                <Grid container>
                    <Hidden mdUp>
                        <Grid item sm className="title_space center">
                            <Typography className="title">
                                参加ユーザ
                            </Typography>
                        </Grid>
                    </Hidden>
                </Grid>
                <Grid container justify="center">
                    {/* mdサイズ以上は表示しない */}
                    <Hidden mdUp xsDown>
                        <Grid item sm={7}>
                            <UserListData data={user_list} />
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
                        renderMobileUserList()
                    :
                        renderMobileGroupCard()
                }

            </div>
        </div>
    )
}

export default GroupDetail
