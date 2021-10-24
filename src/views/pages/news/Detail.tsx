import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import '../../../styles/common/common.scss';
import '../../../styles/news/news.scss';
import { fetchGetErrorMessages, fetchGetUrl, fetchAsyncGetNreadCount } from '../appSlice';
import { fetchAsyncGetNews, selectNews, fetchAsyncGetGroupHistories, selectGroupHistories } from './newsSlice';
import NewsCard from '../../components/news/NewsCard';
import NewsListData from '../../components/news/NewsListData';
import GroupListData from '../../components/news/GroupListData';
import { Grid, Typography, Hidden } from '@material-ui/core';
import MobileHeaderTab from '../../components/common/MobileHeaderTab';
import DisplayStyles from '../../../styles/common/displayMode';
import { AppDispatch } from '../../../stores/store';

import group_list from '../../../data/group_list_data.json';

const NewsDetail: React.FC = () => {
    const history = useHistory();
    const displayStyles = DisplayStyles();
    // スマホ用の画面切り替えを管理
    const [view, setView] = useState(0);
    // redux
    const dispatch: AppDispatch = useDispatch();
    const news = useSelector(selectNews);
    const group_histories = useSelector(selectGroupHistories);

    useEffect(() => {
        const renderNewsDetail = async () => {
            // ニュース一覧情報取得
            const newsRes = await dispatch(fetchAsyncGetNews());
            if(fetchAsyncGetNews.fulfilled.match(newsRes) && newsRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(newsRes.payload.error_message));
                return;
            }
            // グループ情報取得
            const ghRes = await dispatch(fetchAsyncGetGroupHistories());
            if(fetchAsyncGetGroupHistories.fulfilled.match(ghRes) && ghRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(ghRes.payload.error_message));
                return;
            }
            // ニュース未読数の取得
            const nreadCountRes = await dispatch(fetchAsyncGetNreadCount());
            if(fetchAsyncGetNreadCount.fulfilled.match(nreadCountRes) && nreadCountRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(nreadCountRes.payload.error_message));
                return;
            }
            dispatch(fetchGetUrl(history.location.pathname));
        }
        renderNewsDetail();
    }, [dispatch]);

    // MobileHeaderTab用のラベルを設定
    const label = {
        label1: 'ニュース',
        label2: 'グループ申請状況'
    }

    // MobileHeaderTab用のcallback関数を設定
    const callback = {
        function1: (value: number) => setView(value),
        function2: (value: number) => setView(value)
    }

    /**
     * スマホ用NewsCard & NewsListDataの表示
     * @returns 
     */
     const renderMobileNews = () => {
        return (
            <Grid container justify="center">
                <Grid item xs={11} className="c_title_space center">
                    <Typography className="c_title">
                        {localStorage.loginName}さんへの通知内容
                    </Typography>
                </Grid>
                <Grid item xs={11}>
                    <NewsCard />
                </Grid>
                <Grid item xs={11} className="news_list">
                    <hr className="app_hr" />
                    <br />

                    <NewsListData data={news} />
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
                        申請中のグループ
                    </Typography>
                </Grid>
                <Grid item xs={11}>
                    <GroupListData data={group_histories} />
                </Grid>
            </Grid>
        );
    }

    return (
        <div id="news_detail">
            
            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                {/* PC版 */}
                <Hidden smDown>
                    <Grid container justify="center">
                        {/* Title */}
                        <Grid item md={5} className="c_title_space">
                            <Typography className="c_title">
                                {localStorage.loginName}さんへの通知内容
                            </Typography>
                        </Grid>
                        <Grid item md={3} className="c_title_space center">
                            <Typography className="c_title">
                                申請中のグループ
                            </Typography>
                        </Grid>
                        {/* Content */}
                        <Grid item md={5} className="c_content_space center">
                            <NewsCard />

                            <br />
                            <hr className="app_hr" />
                            <br />

                            <NewsListData data={news} />
                        </Grid>
                        <Grid item md={3} className="c_content_space center">
                            <GroupListData data={group_histories} />
                        </Grid>
                    </Grid>
                </Hidden>
                {/* iPad版 */}
                <Hidden mdUp xsDown>
                    <Grid container justify="center">
                        {/* Title */}
                        <Grid item sm={7} className="c_title_space">
                            <Typography className="c_title">
                                {localStorage.loginName}さんへの通知内容
                            </Typography>
                        </Grid>
                        <Grid item sm={4} className="c_title_space center">
                            <Typography className="c_title">
                                申請中のグループ
                            </Typography>
                        </Grid>
                        {/* Content */}
                        <Grid item sm={7} className="c_content_space center">
                            <NewsCard />

                            <br />
                            <hr className="app_hr" />
                            <br />

                            <NewsListData data={news} />
                        </Grid>
                        <Grid item sm={4} className="c_content_space center">
                            <GroupListData data={group_histories} />
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
                        renderMobileNews()
                }

            </div>

        </div>
    )
}

export default NewsDetail