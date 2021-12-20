import React, { useState } from 'react';
import DisplayStyles from '../../../styles/common/displayMode';
import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import { IMAGE_LIST_DATA } from '../../types/albumsTypes';
import ModalSwiperImages from './ModalSwiperImages';

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
    },
    visible: {
        backgroundColor: 'rgba(252, 26, 26, 0.7)'
    }
  }),
);

/**
 * 写真や動画のデータ表示用関数
 * @param props 
 * @returns 
 */
const ImageListData: React.FC<IMAGE_LIST_DATA> = (props) => {
    const classes = useStyles();
    const displayStyles = DisplayStyles();
    const [open, setOpen] = useState(false);
    const [slideIndex, setSlideIndex] = useState(0);

    /**
     * モーダル表示制御用関数
     * @param value 
     */
    const handleOpen = (value: boolean) => {
        setOpen(value);
    };

    return (
        <>
            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                <div className={classes.root}>
                    <ImageList rowHeight={180} className={classes.imageList} cols={3}>
                            {_.map(props.data, (item, index) => (
                                <ImageListItem 
                                    key={item.id} 
                                    onClick={(e) => {
                                        // 削除モードの場合は削除用コールバックを実行
                                        if(props.flg) {
                                            e.currentTarget.classList.toggle(classes.visible);
                                            props.callback(item.id);
                                            return;
                                        }
                                        // 削除モードで無い場合はモーダルを表示
                                        setSlideIndex(index);
                                        setOpen(true);
                                    }} 
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img src={item.image_url} alt={item.image_file} />
                                </ImageListItem>
                            ))}
                    </ImageList>
                </div>
            </div>

            {/* スマホ版 */}
            <div className={displayStyles.sectionMobileNoBottom}>
                <div className={classes.root}>
                    <ImageList rowHeight={180} className={classes.mobileImageList}>
                        {_.map(props.data, (item, index) => (
                            <ImageListItem 
                                key={item.id} 
                                onClick={(e) => {
                                    e.currentTarget.classList.toggle(classes.visible);
                                    // 削除モードの場合は削除用コールバックを実行
                                    if(props.flg) {
                                        props.callback(item.id);
                                        return;
                                    }
                                    // 削除モードで無い場合はモーダルを表示
                                    setSlideIndex(index);
                                    setOpen(true);
                                }} 
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={item.image_url} alt={item.image_file} />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </div>
            </div>

            <ModalSwiperImages callback={handleOpen} data={props.data} open={open} index={slideIndex} />
        </>
    );
}

export default React.memo(ImageListData)
