import React, { useEffect } from 'react';
import _ from 'lodash';
import ComponentStyles from '../../../styles/common/componentStyle';
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

const ModalSwiperImages: React.FC<MODAL_SWIPER_IMAGES> = (props) => {
    const componentStyles = ComponentStyles();

    useEffect(() => {
        const imageList = Array.from(document.getElementsByClassName('image'));
        const container = Array.from(document.getElementsByClassName('container'));
        //console.log(imageList);
        // const img = Array.from(imageList)
        let divH: number;
        let divW: number;
        container.forEach(val => {
            divH = val.clientHeight;
            divW = val.clientWidth;
        });
        
        imageList.forEach((val) => {
            const image = val as HTMLImageElement;
            if(image.width > image.height) {
                image.width = divW;
                image.height = image.height * (divW / image.width);
            } else {
                image.height = divH;
                image.width = image.width * (divH / image.height);
            }
            console.log(image)
            console.log(image.width)
            console.log(image.height)
            console.log(divW)
            console.log(divH)
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
                                            <div className="container" style={{ height: '90vh', width: 'auto' }}>
                                                <img className="image" src={item.image_url} />
                                            </div>
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
                                    initialSlide={props.index}
                                    slideToClickedSlide={true}
                                    loop={true}
                                    navigation
                                    autoHeight={true}
                                >
                                    {_.map(props.data, item => (
                                        <SwiperSlide key={item.id}>
                                            <div className="container" style={{ height: 'auto', width: '100vw' }}>
                                                <img className="image" src={item.image_url} />
                                            </div>
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