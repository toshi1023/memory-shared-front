import React from 'react';
import DisplayStyles from '../../../styles/common/displayMode';
import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { MEDIA_LIST_DATA } from '../../types/albumsTypes';
import houston from '../../../image/houston.jpg';

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
const MediaListData: React.FC<MEDIA_LIST_DATA> = (props) => {
    const classes = useStyles();
    const displayStyles = DisplayStyles();

    return (
        <>
            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                <div className={classes.root}>
                    <ImageList rowHeight={180} className={classes.imageList} cols={3}>
                        {_.map(props.data, item => (
                            <ImageListItem key={item.id}>
                                <img src={houston} alt={item.title} />
                                {/* <img src={item.image_file} alt={item.title} /> */}
                                <ImageListItemBar
                                    title={item.title}
                                    actionIcon={
                                        <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            </div>

            {/* スマホ版 */}
            <div className={displayStyles.sectionMobile}>
                <div className={classes.root}>
                    <ImageList rowHeight={180} className={classes.mobileImageList}>
                        {_.map(props.data, item => (
                            <ImageListItem key={item.id}>
                                <img src={houston} alt={item.title} />
                                {/* <img src={item.image_file} alt={item.title} /> */}
                                <ImageListItemBar
                                    title={item.title}
                                    actionIcon={
                                        <IconButton aria-label={`info about ${item.title}`} className={classes.icon}>
                                            <InfoIcon />
                                        </IconButton>
                                    }
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            </div>
        </>
    );
}

export default MediaListData
