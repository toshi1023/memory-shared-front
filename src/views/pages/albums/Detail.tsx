import React from 'react';
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
            <Grid container justify="center" spacing={1} className="card">
                <Grid item xs={11} md={7}>
                    <div className="album_list">
                        <MediaListData data={media_list} />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default AlbumDetail
