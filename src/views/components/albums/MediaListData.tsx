import React from 'react';
import ComponentStyles from '../../../styles/common/componentStyle';
import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { MEDIA_LIST_DATA } from '../../types/albumsTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
  }),
);

/**
 * 写真や動画のデータ表示用関数
 * @param props 
 * @returns 
 */
const MediaListData: React.FC<MEDIA_LIST_DATA> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ImageList rowHeight={180} className={classes.imageList}>
                <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">December</ListSubheader>
                </ImageListItem>
                {_.map(props.data, item => (
                    <ImageListItem key={item.id}>
                        <img src={item.image_file} alt={item.title} />
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
    );
}

export default MediaListData
