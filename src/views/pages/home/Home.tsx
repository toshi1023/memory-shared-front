import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../../styles/common/common.scss';
import '../../../styles/home/home.scss';
import { fetchGetErrorMessages } from '../appSlice';
import { 
    fetchAsyncGetProfile, selectProfile, fetchAsyncGetFamily, selectFamily, 
    fetchAsyncGetParticipant, selectParticipant, fetchAsyncGetTalklist, selectTalklist 
} from './homeSlice';
import MyProfileCard from '../../components/home/MyProfileCard';
import MyGroupList from '../../components/home/MyGroupList';
import MyFamilyList from '../../components/home/MyFamilyList';
import MyTalkList from '../../components/home/MyTalkList';
import { Grid, Typography } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';
import { AppDispatch } from '../../../stores/store';

const Home: React.FC = () => {
    const displayStyles = DisplayStyles();
    const [desc, setDesc] = useState(false);
    // redux
    const dispatch: AppDispatch = useDispatch();
    const profile = useSelector(selectProfile);
    const families = useSelector(selectFamily);
    const participants = useSelector(selectParticipant);
    const talklists = useSelector(selectTalklist);

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
            
            // 参加中グループ情報を取得
            const participantRes = await dispatch(fetchAsyncGetParticipant({ id: +localStorage.loginId }));
            if(fetchAsyncGetParticipant.fulfilled.match(participantRes) && participantRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(participantRes.payload.error_message));
                return;
            }

            // トーク一覧情報を取得
            const talklistRes = await dispatch(fetchAsyncGetTalklist({ id: +localStorage.loginId }));
            if(fetchAsyncGetTalklist.fulfilled.match(talklistRes) && talklistRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(talklistRes.payload.error_message));
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
                        <MyGroupList data={participants} />
                    </Grid>
                    <Grid item sm={3} className="c_title_space center c_side_area">
                        <Typography className="c_title">
                            トーク
                        </Typography>
                        <MyTalkList data={talklists} />
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
