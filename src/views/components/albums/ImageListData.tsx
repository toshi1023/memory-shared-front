import React, { useState } from 'react';
import DisplayStyles from '../../../styles/common/displayMode';
import _ from 'lodash';
import ComponentStyles from '../../../styles/common/componentStyle';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import { Grid, Hidden } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { IMAGE_LIST_DATA } from '../../types/albumsTypes';
import houston from '../../../image/houston.jpg';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.scss'
import SwiperCore, { Navigation } from 'swiper';
SwiperCore.use([Navigation]);

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
const ImageListData: React.FC<IMAGE_LIST_DATA> = (props) => {
    const classes = useStyles();
    const componentStyles = ComponentStyles();
    const displayStyles = DisplayStyles();
    const [open, setOpen] = useState(false);
    const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
    
    const slideTo = (index: number) => {
        if (!swiperInstance) return;
        swiperInstance.slideTo(index);
    };

    return (
        <>
            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                <div className={classes.root}>
                    <ImageList rowHeight={180} className={classes.imageList} cols={3}>
                            {_.map(props.data, item => (
                                <ImageListItem key={item.id} onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
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
                            <ImageListItem key={item.id} onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
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
            
            {/* 画像拡大画面 */}
            <Modal
                className={componentStyles.modal}
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Grid container justify="center">
                        <CloseIcon className={componentStyles.closeIcon} style={{ color: '#fff' }} onClick={() => setOpen(false)} />
                        
                        {/* PC版 */}
                        <Hidden mdDown>
                            <Grid item lg={7}>
                                <Swiper
                                    spaceBetween={50}
                                    slidesPerView={1}
                                    initialSlide={1}
                                    loop={true}
                                    navigation
                                    onSlideChange={() => console.log('slide change')}
                                    onSwiper={(swiper) => setSwiperInstance(swiper)}
                                >
                                    {_.map(props.data, item => (
                                        <SwiperSlide key={item.id}>
                                            <img style={{ height: '90vh', width: 'auto' }} src={houston} alt={item.title} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Grid>
                        </Hidden>

                        {/* iPad & スマホ版 */}
                        <Hidden lgUp>
                            <Grid item xs={11}>
                                <Swiper
                                    spaceBetween={50}
                                    slidesPerView={1}
                                    initialSlide={1}
                                    loop={true}
                                    navigation
                                    onSlideChange={() => console.log('slide change')}
                                    onSwiper={(swiper) => setSwiperInstance(swiper)}
                                >
                                    {_.map(props.data, item => (
                                        <SwiperSlide key={item.id}>
                                            <img style={{ height: 'auto', width: '90vw' }} src={houston} alt={item.title} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Grid>
                        </Hidden>
                    </Grid>
                </Fade>
            </Modal>
        </>
    );
}

export default React.memo(ImageListData)
