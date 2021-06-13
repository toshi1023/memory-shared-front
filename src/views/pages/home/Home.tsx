import React from 'react';
import '../../../styles/home/home.scss';
import MyProfileCard from '../../components/home/MyProfileCard';
import MyGroupList from '../../components/home/MyGroupList';
import MyFamilyList from '../../components/home/MyFamilyList';
import MyTalkList from '../../components/home/MyTalkList';
import { Grid, Typography } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';

import group_list from '../../../data/group_list_data.json';
import family_list from '../../../data/family_list_data.json';
import talk_list from '../../../data/talk_list_data.json';

const Home: React.FC = () => {
    const displayStyles = DisplayStyles();
    
    const profile = {
        id: 1,
        name: 'test',
        email: 'test@xxx.co.jp',
        image_file: '',
        hobby: '映画鑑賞',
        gender: true,
        description: 'バスケと映画鑑賞が好きな会社員です。アクティブな付き合いをしたいです。'
    }

    return (
        <>
            <div id="home">

                {/* PC版 & iPad版 */}
                <div className={displayStyles.sectionDesktop}>
                    <Grid container>
                        <Grid item sm className="title_space center">
                            <Typography className="title">
                                ファミリー
                            </Typography>
                        </Grid>
                        <Grid item sm={6} className="title_space">
                            <Typography className="title">
                                プロフィール
                            </Typography>
                        </Grid>
                        <Grid item sm className="title_space center">
                            <Typography className="title">
                                トーク
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item sm={3}>
                            <MyFamilyList data={family_list} />
                        </Grid>
                        <Grid item sm={6}>
                            <MyProfileCard data={profile} />
                            <br />
                            <hr className="app_hr" />
                            <div className="title_space">
                                <Typography className="title">
                                    参加グループ一覧
                                </Typography>
                            </div>
                            <MyGroupList data={group_list} />
                        </Grid>
                        <Grid item sm={3}>
                            <MyTalkList data={talk_list} />
                        </Grid>
                    </Grid>
                </div>
            
                {/* スマホ版 */}
                <div className={displayStyles.sectionMobile}>
                    <Grid container justify="center">
                        <Grid item xs={11} className="title_space">
                            <Typography className="title">
                                プロフィール
                            </Typography>
                        </Grid>
                        <Grid item xs={11} className="mobile_profile">
                            <MyProfileCard data={profile} />
                        </Grid>
                    </Grid>
                </div>
                
            </div>
        </>
    )
}

export default Home
