import React, { useEffect } from 'react';
import _ from 'lodash';
import ComponentStyles from '../../../styles/common/componentStyle';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import CloseIcon from '@material-ui/icons/Close';
import { Grid, Hidden } from '@material-ui/core';
import { MODAL_SWIPER_IMAGES } from '../../types/albumsTypes';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.scss'
import SwiperCore, { Navigation } from 'swiper';
SwiperCore.use([Navigation]);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        lgvImage: {
            height: '70vh',
            width: 'auto'
        },
        lgwImage: {
            height: '70vh',
            width: '100%'
        },
        smvImage: {
            height: '70vh',
            width: 'auto'
        },
        smwImage: {
            height: '40vh',
            width: '100%'
        },
        xsvImage: {
            height: '50vh',
            width: 'auto'
        },
        xswImage: {
            height: '25vh',
            width: '100%'
        },
        wideImage: {
            height: 'auto',
            width: '100%'
        }
    })
);

const ModalSwiperImages: React.FC<MODAL_SWIPER_IMAGES> = (props) => {
    const classes = useStyles();
    const componentStyles = ComponentStyles();

    useEffect(() => {
        const imageList = Array.from(document.getElementsByClassName('image'));
        const ipImageList = Array.from(document.getElementsByClassName('ipad_image'));
        const mbImageList = Array.from(document.getElementsByClassName('mobile_image'));
        console.log(imageList);
        // const img = Array.from(imageList)
        
        imageList.forEach((val) => {
            const image = val as HTMLImageElement;
            if(image.height > image.width) {
                image.style.height = '70vh';
                image.style.width = 'auto';
            } else {
                image.style.height = '70vh';
                image.style.width = '100%';
            }
        });
        ipImageList.forEach((val) => {
            const image = val as HTMLImageElement;
            if(image.height > image.width) {
                image.style.height = '70vh';
                image.style.width = 'auto';
            } else {
                image.style.height = '40vh';
                image.style.width = 'auto';
            }
        });
        mbImageList.forEach((val) => {
            const image = val as HTMLImageElement;
            if(image.height > image.width) {
                image.style.height = '70vh';
                image.style.width = 'auto';
            } else {
                image.style.height = '25vh';
                image.style.width = '100%';
            }
        });
        
    }, [props.open]);

    return (
        <div>
            {/* 画像拡大画面 */}
            <Modal
                className={componentStyles.modal}
                open={props.open}
                onClose={() => props.callback(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={props.open}>
                    <Grid container justify="center">
                        <CloseIcon className={componentStyles.closeIcon} style={{ color: '#fff' }} onClick={() => props.callback(false)} />
                        
                        {/* PC版 */}
                        <Hidden mdDown>
                            <Grid item lg={7}>
                                <Swiper
                                    spaceBetween={50}
                                    slidesPerView={1}
                                    initialSlide={props.index}
                                    slideToClickedSlide={true}
                                    loop={true}
                                    navigation
                                    autoHeight={true}
                                >
                                    {_.map(props.data, item => (
                                        <SwiperSlide key={item.id}>
                                            <img className={item.type === 1 ? classes.lgwImage : item.type === 2 ? classes.lgvImage : classes.wideImage} src={item.image_url} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Grid>
                        </Hidden>

                        {/* iPad & スマホ版 */}
                        <Hidden xsDown lgUp>
                            <Grid item sm={11} md={10}>
                                <Swiper
                                    spaceBetween={50}
                                    slidesPerView={1}
                                    initialSlide={props.index}
                                    slideToClickedSlide={true}
                                    loop={true}
                                    navigation
                                    autoHeight={true}
                                >
                                    {_.map(props.data, item => (
                                        <SwiperSlide key={item.id}>
                                            <img className={item.type === 1 ? classes.smwImage : item.type === 2 ? classes.smvImage : classes.wideImage} src={item.image_url} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Grid>
                        </Hidden>

                        <Hidden smUp>
                            <Grid item xs={11}>
                                <Swiper
                                    spaceBetween={50}
                                    slidesPerView={1}
                                    initialSlide={props.index}
                                    slideToClickedSlide={true}
                                    loop={true}
                                    navigation
                                    autoHeight={true}
                                >
                                    {_.map(props.data, item => (
                                        <SwiperSlide key={item.id}>
                                            <img className={item.type === 1 ? classes.xswImage : item.type === 2 ? classes.xsvImage : classes.wideImage} src={item.image_url} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Grid>
                        </Hidden>
                    </Grid>
                </Fade>
            </Modal>
        </div>
    )
}

export default ModalSwiperImages