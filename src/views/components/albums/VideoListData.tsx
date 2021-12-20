import React from 'react';
import DisplayStyles from '../../../styles/common/displayMode';
import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { VIDEO_LIST_DATA } from '../../types/albumsTypes';
import VideoPlayer from "../../components/common/VideoPlayer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        padding: '10px'
    },
    imageList: {
        maxWidth: 800,
        maxHeight: 700,
    },
    mobileImageList: {
        maxWidth: 500,
        height: 550,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    }
  }),
);

/**
 * 写真や動画のデータ表示用関数
 * @param props 
 * @returns 
 */
const VideoListData: React.FC<VIDEO_LIST_DATA> = (props) => {
    const classes = useStyles();
    const displayStyles = DisplayStyles();

    return (
        <>
            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                <div className={classes.root}>
                    {_.map(props.data, item => (
                        <VideoPlayer 
                            options={{
                                sources: [{
                                    src: item.video_url,
                                    type: item.type
                                }],
                            }} 
                            key={item.id}
                        />
                    ))}
                </div>
            </div>

            {/* スマホ版 */}
            <div className={displayStyles.sectionMobileNoBottom}>
                <div className={classes.root}>
                    {_.map(props.data, item => (
                        <VideoPlayer 
                            options={{
                                sources: [{
                                    src: item.video_url,
                                    type: item.type
                                }],
                            }} 
                            key={item.id}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default React.memo(VideoListData)
