import React from 'react';
import '../../../styles/albums/albums.scss';
import '../../../styles/common/common.scss';
import { Grid, Typography, Hidden } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';
import MediaListData from '../../components/albums/MediaListData';

import media_list from '../../../data/media_list_data.json';

/**
 * アルバムの詳細ページ
 * @returns 
 */
const AlbumDetail: React.FC = () => {
    return (
        <div id="album_detail">
            <Grid container justify="center">
                <Grid item xs={11} md={7} className="c_title_space">
                    <Typography className="c_title">
                        album1
                    </Typography>
                </Grid>
                <Grid item xs={11} md={7}>
                    <div>
                        <MediaListData data={media_list} />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default AlbumDetail
