import React from 'react';
import '../../../styles/common/common.scss';
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
        <div id="home">

            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                <Grid container spacing={2}>
                    <Grid item sm={3} className="c_title_space center c_side_area">
                        <Typography className="c_title">
                            ファミリー
                        </Typography>
                        <MyFamilyList data={family_list} />
                    </Grid>
                    <Grid item sm={6} className="c_title_space">
                        <Typography className="c_title">
                            プロフィール
                        </Typography>
                        <MyProfileCard data={profile} />
                        <br />
                        <hr className="app_hr" />
                        <div className="c_title_space">
                            <Typography className="c_title">
                                参加グループ一覧
                            </Typography>
                        </div>
                        <MyGroupList data={group_list} />
                    </Grid>
                    <Grid item sm={3} className="c_title_space center c_side_area">
                        <Typography className="c_title">
                            トーク
                        </Typography>
                        <MyTalkList data={talk_list} />
                    </Grid>
                </Grid>
            </div>
        
            {/* スマホ版 */}
            <div className={displayStyles.sectionMobile}>
                <Grid container justify="center">
                    <Grid item xs={11} className="c_title_space">
                        <Typography className="c_title">
                            プロフィール
                        </Typography>
                    </Grid>
                    <Grid item xs={11} className="mobile_profile">
                        <MyProfileCard data={profile} />
                    </Grid>
                </Grid>
            </div>
            
        </div>
    )
}

export default Home
