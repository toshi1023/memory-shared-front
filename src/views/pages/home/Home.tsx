import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../../styles/common/common.scss';
import '../../../styles/home/home.scss';
import { fetchGetErrorMessages } from '../appSlice';
import { fetchAsyncGetProfile, selectProfile, fetchAsyncGetFamily, selectFamily } from './homeSlice';
import MyProfileCard from '../../components/home/MyProfileCard';
import MyGroupList from '../../components/home/MyGroupList';
import MyFamilyList from '../../components/home/MyFamilyList';
import MyTalkList from '../../components/home/MyTalkList';
import { Grid, Typography } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';
import MessageComponent from '../../components/common/MessageComponent';
import { AppDispatch } from '../../../stores/store';

import group_list from '../../../data/group_list_data.json';
import talk_list from '../../../data/talk_list_data.json';

const Home: React.FC = () => {
    const displayStyles = DisplayStyles();
    const [desc, setDesc] = useState(false);
    // redux
    const dispatch: AppDispatch = useDispatch();
    const profile = useSelector(selectProfile);
    const families = useSelector(selectFamily);

    useEffect(() => {
        const renderHome = async() => {
            // プロフィール情報を取得
            const profileRes = await dispatch(fetchAsyncGetProfile({ id: +localStorage.loginId }));
            if(fetchAsyncGetProfile.fulfilled.match(profileRes) && profileRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(profileRes.payload.error_message));
                return;
            }

            // ファミリー情報を取得
            const familyRes = await dispatch(fetchAsyncGetFamily({ id: +localStorage.loginId }));
            if(fetchAsyncGetFamily.fulfilled.match(familyRes) && familyRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(familyRes.payload.error_message));
                return;
            }
        }
        renderHome();
    }, [dispatch]);

    /**
     * ファミリーの説明表示制御
     */
    const handleOpenDescription = () => {
        setDesc(!desc);
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
                        <Typography className="description_label">
                            <span className="label_font" onClick={handleOpenDescription}>ファミリーとは?</span>
                        </Typography>
                        {
                            desc ? 
                                <Typography className="description">
                                    ファミリーとは同じグループに所属するユーザを指します。
                                    どんどんグループを作成してファミリーを増やしていきましょう。
                                </Typography>
                            :
                                ''
                        }
                        <MyFamilyList data={families} />
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
