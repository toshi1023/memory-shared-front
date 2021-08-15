import React, { useState } from 'react';
import '../../../styles/albums/albums.scss';
import '../../../styles/common/common.scss';
import { Grid, Typography, Hidden, Tabs, Tab, IconButton, Tooltip } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';
import ComponentStyles from '../../../styles/common/componentStyle';
import MobileHeaderTab from '../../components/common/MobileHeaderTab';
import ImageListData from '../../components/albums/ImageListData';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import VideoPlayer from "../../components/common/Video";

import videoSrc from '../../../video/MemoryShareApp.mp4';
import media_list from '../../../data/media_list_data.json';

/**
 * アルバムの詳細ページ
 * @returns 
 */
const AlbumDetail: React.FC = () => {
    const displayStyles = DisplayStyles();
    const componentStyles = ComponentStyles();
    // 画面切り替えを管理
    const [view, setView] = useState(0);

    // タブ用のラベルを設定
    const label = {
        label1: '写真',
        label2: '動画'
    }

    // videoオプション
    const videoJsOptions = {
        sources: [
           {
              src: videoSrc,
              type: "video/mp4"
           }
        ]
    };

    // MobileHeaderTab用のcallback関数を設定
    const callback = {
        function1: (value: number) => setView(value),
        function2: (value: number) => setView(value)
    }
    // PC & iPad用のタブ変更を管理
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setView(newValue);
    };

    return (
        <div id="album_detail">

            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                <Grid container justify="center">
                    <Grid item sm={7} className="c_title_space">
                        <Typography className="c_title">
                          album1
                        </Typography>
                    </Grid>
                    <Grid item sm={7} className="pos_relative">
                        <Tabs
                            className="desktop_tab"
                            value={view}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label={label.label1} />
                            <Tab label={label.label2} />
                        </Tabs>
                        <Tooltip title="写真/動画を投稿" classes={{ tooltip: componentStyles.tooltip }}>
                            <IconButton className="ic_button desk pos_right"><AddAPhotoIcon /></IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item sm={7}>
                        <ImageListData data={media_list} label={label} callback={callback} />
                    </Grid>
                </Grid>
                {/* テストで実装(後で削除予定) */}
                <VideoPlayer options={videoJsOptions} />
            </div>

            {/* スマホ版 */}
            <div className={displayStyles.sectionMobile}>
                <Grid container>
                    <Grid item xs={12}>
                        <MobileHeaderTab label={label} callback={callback} />
                    </Grid>
                </Grid>
                <Grid container justify="center">
                    <Grid item xs={11} className="c_title_space pos_relative">
                        <Typography className="c_title">
                            album1
                        </Typography>
                        <IconButton className="ic_button mobile pos_right"><AddAPhotoIcon /></IconButton>
                    </Grid>
                    <Grid item xs={11}>
                        <div>
                            <ImageListData data={media_list} label={label} callback={callback} />
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default AlbumDetail
