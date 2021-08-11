import React, { useState } from 'react';
import '../../../styles/common/common.scss';
import '../../../styles/news/news.scss';
import NewsCard from '../../components/news/NewsCard';
import NewsListData from '../../components/news/NewsListData';
import GroupListData from '../../components/news/GroupListData';
import { Grid, Typography, Hidden } from '@material-ui/core';
import MobileHeaderTab from '../../components/common/MobileHeaderTab';
import DisplayStyles from '../../../styles/common/displayMode';

import news_list from '../../../data/news_list_data.json';
import group_list from '../../../data/group_list_data.json';

const NewsDetail: React.FC = () => {
    const displayStyles = DisplayStyles();
    // スマホ用の画面切り替えを管理
    const [view, setView] = useState(0);

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

    const news = {
        id: 1,
        title: '本日よりオープン！',
        content: 'プライベートな画像・動画共有サイトをオープンしました！'
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
                                {profile.name}さんへの通知
                            </Typography>
                        </Grid>
                        <Grid item md={3} className="c_title_space center">
                            <Typography className="c_title">
                                申請中のグループ
                            </Typography>
                        </Grid>
                        {/* Content */}
                        <Grid item md={5} className="c_content_space center">
                            <NewsCard data={news} />

                            <br />
                            <hr className="app_hr" />
                            <br />

                            <NewsListData data={news_list} />
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
                                {profile.name}さんへの通知
                            </Typography>
                        </Grid>
                        <Grid item sm={4} className="c_title_space center">
                            <Typography className="c_title">
                                申請中のグループ
                            </Typography>
                        </Grid>
                        {/* Content */}
                        <Grid item sm={7} className="c_content_space center">
                            <NewsCard data={news} />

                            <br />
                            <hr className="app_hr" />
                            <br />

                            <NewsListData data={news_list} />
                        </Grid>
                        <Grid item sm={4} className="c_content_space center">
                            <GroupListData data={group_list} />
                        </Grid>
                    </Grid>
                </Hidden>
            </div>

        </div>
    )
}

export default NewsDetail