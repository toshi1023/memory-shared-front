import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import '../../../styles/home/home.scss';
import '../../../styles/common/common.scss';
import '../../../styles/groups/groups.scss';
import { fetchGetErrorMessages, fetchGetUrl } from '../appSlice';
import { fetchAsyncGetUserInfo, selectUser, selectWgoups, selectPgoups } from './userSlice';
import UserCard from '../../components/users/UserCard';
import GroupListData from '../../components/users/GroupListData';
import WelcomeGroupListData from '../../components/users/WelcomGroupListData';
import MobileHeaderTab from '../../components/common/MobileHeaderTab';
import { Grid, Typography, Hidden } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';
import { AppDispatch } from '../../../stores/store';

const UserDetail: React.FC = () => {
    const displayStyles = DisplayStyles();
    const history = useHistory();
    const { id } = useParams<{id: string}>();
    // スマホ用の画面切り替えを管理
    const [view, setView] = useState(0);
    // redux
    const dispatch: AppDispatch = useDispatch();
    const user = useSelector(selectUser);
    const wgroups = useSelector(selectWgoups);
    const pgroups = useSelector(selectPgoups);

    useEffect(() => {
        const renderUserDetail = async () => {
            const userInfoRes = await dispatch(fetchAsyncGetUserInfo({id: +id}));
            if(fetchAsyncGetUserInfo.fulfilled.match(userInfoRes) && userInfoRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(userInfoRes.payload.error_message));
                return;
            }
            dispatch(fetchGetUrl(history.location.pathname));
        }
        renderUserDetail();
    }, [dispatch]);

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
                        {user.name}さんのプロフィール
                    </Typography>
                </Grid>
                <Grid item xs={11}>
                    <UserCard data={user} />
                </Grid>
                <Grid item xs={11} className="group_list">
                    <hr className="app_hr" />
                    <div className="c_title_space">
                        <Typography className="c_title">
                            参加歓迎中のグループ
                        </Typography>
                    </div>
                    
                    <WelcomeGroupListData data={wgroups} />
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
                    <GroupListData data={pgroups} />
                </Grid>
            </Grid>
        );
    }

    return (
        <div id="user_detail">

            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                {/* PC版 */}
                <Hidden smDown>
                    <Grid container justify="center">
                        {/* Content */}
                        <Grid item md={6} className="c_content_space center">
                            <Typography className="c_title">
                                {user.name}さんのプロフィール
                            </Typography>

                            <UserCard data={user} />

                            <br />
                            <hr className="app_hr" />
                            <div className="c_title_space">
                                <Typography className="c_title">
                                    参加歓迎中のグループ
                                </Typography>
                            </div>
                            
                            <WelcomeGroupListData data={wgroups} />
                        </Grid>
                        <Grid item md={3} className="c_content_space center c_side_area">
                            <Typography className="c_title">
                                参加中のグループ
                            </Typography>

                            <GroupListData data={pgroups} />
                        </Grid>
                    </Grid>
                </Hidden>
                {/* iPad版 */}
                <Hidden mdUp xsDown>
                    <Grid container justify="center">
                        {/* Content */}
                        <Grid item sm={7} className="c_content_space center">
                            <Typography className="c_title">
                                {user.name}さんのプロフィール
                            </Typography>

                            <UserCard data={user} />

                            <br />
                            <hr className="app_hr" />
                            <div className="c_title_space">
                                <Typography className="c_title">
                                    参加歓迎中のグループ
                                </Typography>
                            </div>

                            <WelcomeGroupListData data={wgroups} />
                        </Grid>
                        <Grid item sm={4} className="c_content_space center c_side_area">
                            <Typography className="c_title">
                                参加中のグループ
                            </Typography>

                            <GroupListData data={pgroups} />
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
