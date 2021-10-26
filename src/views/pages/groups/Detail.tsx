import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import '../../../styles/common/common.scss';
import '../../../styles/groups/groups.scss';
import '../../../styles/home/home.scss';
import { fetchGetErrorMessages, fetchGetUrl } from '../appSlice';
import { 
    fetchAsyncGetGroup, selectGroup, fetchAsyncGetPusers, selectPusers, 
    fetchAsyncGetAlbums, selectAlbums, fetchAsyncGetGhUsers, selectGhusers 
} from './groupSlice';
import GroupCard from '../../components/groups/GroupCard';
import UserListData from '../../components/groups/UserListData';
import AlbumListData from '../../components/groups/AlbumListData';
import MobileHeaderTab from '../../components/common/MobileHeaderTab';
import { Grid, Typography, Hidden, Button } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import { AppDispatch } from '../../../stores/store';

const GroupDetail: React.FC = () => {
    const history = useHistory();
    const displayStyles = DisplayStyles();
    const { id } = useParams<{id: string}>();
    // スマホ用の画面切り替えを管理
    const [view, setView] = useState(0);
    // redux
    const dispatch: AppDispatch = useDispatch();
    const group = useSelector(selectGroup);
    const pusers = useSelector(selectPusers);
    const ghusers = useSelector(selectGhusers);
    const albums = useSelector(selectAlbums);

    useEffect(() => {
        const renderGroupDetail = async () => {
            // グループ詳細情報取得
            const groupRes = await dispatch(fetchAsyncGetGroup({id: +id}));
            if(fetchAsyncGetGroup.fulfilled.match(groupRes) && groupRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(groupRes.payload.error_message));
                return;
            }
            // 参加者情報取得
            const pusersRes = await dispatch(fetchAsyncGetPusers({id: +id}));
            if(fetchAsyncGetPusers.fulfilled.match(pusersRes) && pusersRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(pusersRes.payload.error_message));
                return;
            }
            // グループ履歴参加申請情報取得
            const ghusersRes = await dispatch(fetchAsyncGetGhUsers({group_id: +id, status: 1, sort_created_at: 'desc'}));
            if(fetchAsyncGetGhUsers.fulfilled.match(ghusersRes) && ghusersRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(ghusersRes.payload.error_message));
                return;
            }
            // アルバム情報取得
            const albumsRes = await dispatch(fetchAsyncGetAlbums({id: +id}));
            if(fetchAsyncGetAlbums.fulfilled.match(albumsRes) && albumsRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(albumsRes.payload.error_message));
                return;
            }
            dispatch(fetchGetUrl(history.location.pathname));
        }
        renderGroupDetail();
    }, [dispatch]);

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
                <Grid item xs={11} className="c_title_space center">
                    <Typography className="c_title">
                        {group.name}の詳細
                    </Typography>
                </Grid>
                <Grid item xs={11}>
                    <GroupCard data={group} />
                </Grid>
                <Grid item xs={11} className="album_list">
                    <hr className="app_hr" />
                    <div className="c_title_space">
                        <Typography className="c_title">
                            アルバム
                        </Typography>
                    </div>
                    <Button className="albumcreate_button mobile" onClick={() => history.push(`/groups/${group.name}/${group.id}/albums/register`)}><LibraryAddIcon className="albumcreate_icon" />アルバムを作成</Button>
                    <AlbumListData data={albums} />
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
                {
                    group.host_user_id === +localStorage.loginId ? 
                        <Grid item xs={11} className="c_title_space center">
                            <Typography className="c_title">
                                参加申請中ユーザ
                            </Typography>
                        </Grid>
                    :
                        <Grid item xs={11} className="c_title_space center">
                            <Typography className="c_title">
                                参加ユーザ
                            </Typography>
                        </Grid>
                }
                <Grid item xs={11}>
                    <UserListData data={pusers} subdata={ghusers} host_user_id={group.host_user_id} />
                </Grid>
            </Grid>
        );
    }

    return (
        <div id="group_detail">

            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                {/* PC版 */}
                <Hidden smDown>
                    <Grid container justify="center">
                        {/* Content */}
                        <Grid item md={6} className="c_content_space center">
                            <Typography className="c_title">
                                {group.name}の詳細
                            </Typography>

                            <GroupCard data={group} />
                            
                            <br />
                            <hr className="app_hr" />
                            <div className="c_title_space">
                                <Typography className="c_title">
                                    アルバム
                                </Typography>
                            </div>
                            <Button className="albumcreate_button" onClick={() => history.push(`/groups/${group.name}/${group.id}/albums/register`)}><LibraryAddIcon className="albumcreate_icon" />アルバムを作成</Button>
                            <AlbumListData data={albums} />
                        </Grid>
                        <Grid item md={3} className="c_content_space center c_side_area">
                            {
                                group.host_user_id === +localStorage.loginId ? 
                                    <Typography className="c_title">
                                        参加申請中ユーザ
                                    </Typography>
                                :
                                    <Typography className="c_title">
                                        参加ユーザ
                                    </Typography>
                            }
                            
                            <UserListData data={pusers} subdata={ghusers} host_user_id={group.host_user_id} />
                        </Grid>
                    </Grid>
                </Hidden>
                {/* iPad版 */}
                <Hidden mdUp xsDown>
                    <Grid container justify="center">
                        {/* Content */}
                        <Grid item sm={7} className="c_content_space center">
                            <Typography className="c_title">
                                {group.name}の詳細
                            </Typography>

                            <GroupCard data={group} />

                            <br />
                            <hr className="app_hr" />
                            <div className="c_title_space">
                                <Typography className="c_title">
                                    アルバム
                                </Typography>
                            </div>
                            <Button className="albumcreate_button ipad" onClick={() => history.push(`/groups/${group.name}/${group.id}/albums/register`)}><LibraryAddIcon className="albumcreate_icon" />アルバムを作成</Button>
                            <AlbumListData data={albums} />
                            
                        </Grid>
                        <Grid item sm={4} className="c_content_space center c_side_area">
                            {
                                group.host_user_id === +localStorage.loginId ? 
                                    <Typography className="c_title">
                                        参加申請中ユーザ
                                    </Typography>
                                :
                                    <Typography className="c_title">
                                        参加ユーザ
                                    </Typography>
                            }

                            <UserListData data={pusers} subdata={ghusers} host_user_id={group.host_user_id} />
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
