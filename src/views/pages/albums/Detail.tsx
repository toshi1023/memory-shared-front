import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../../styles/albums/albums.scss';
import '../../../styles/common/common.scss';
import { useHistory, useParams } from "react-router-dom";
import { fetchGetErrorMessages } from '../appSlice';
import { fetchAsyncGetAlbum, selectAlbum, selectImage, selectVideo } from './albumSlice';
import { Grid, Typography, Hidden, Tabs, Tab, IconButton, Tooltip, Button, Menu, MenuItem } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';
import ComponentStyles from '../../../styles/common/componentStyle';
import MobileHeaderTab from '../../components/common/MobileHeaderTab';
import ImageListData from '../../components/albums/ImageListData';
import VideoListData from '../../components/albums/VideoListData';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import MovieIcon from '@material-ui/icons/Movie';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { AppDispatch } from '../../../stores/store';

import videoSrc from '../../../video/MemoryShareApp.mp4';
import media_list from '../../../data/media_list_data.json';

/**
 * アルバムの詳細ページ
 * @returns 
 */
const AlbumDetail: React.FC = () => {
    const displayStyles = DisplayStyles();
    const componentStyles = ComponentStyles();
    const history = useHistory();
    const { id, name, albumname, albumid } = useParams<{ id: string, name: string, albumname: string, albumid: string }>();
    // 画面切り替えを管理
    const [view, setView] = useState(0);
    // アルバム編集メニュー表示管理
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    // redux
    const dispatch: AppDispatch = useDispatch();
    const album = useSelector(selectAlbum);
    const image = useSelector(selectImage);
    const video = useSelector(selectVideo);

    useEffect(() => {
        const renderAlbumDetail = async () => {
            // アルバム詳細情報取得
            const albumRes = await dispatch(fetchAsyncGetAlbum({group_id: +id, album_id: +albumid}));
            if(fetchAsyncGetAlbum.fulfilled.match(albumRes) && albumRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(albumRes.payload.error_message));
                return;
            }
        }
        renderAlbumDetail();
    }, [dispatch]);

    // タブ用のラベルを設定
    const label = {
        label1: '写真',
        label2: '動画'
    }

    // MobileHeaderTab用のcallback関数を設定
    const callback = {
        function1: (value: number) => setView(value),
        function2: (value: number) => setView(value)
    }
    // PC & iPad用のタブ変更を管理
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setView(newValue);
    };

    // アルバム編集メニューの表示制御
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const videoData = [
        {
            id: 1,
            src: videoSrc,
            type: "video/mp4",
            title: 'test_video1'
        },
        {
            id: 2,
            src: videoSrc,
            type: "video/mp4",
            title: 'test_video2'
        },
        {
            id: 3,
            src: videoSrc,
            type: "video/mp4",
            title: 'test_video3'
        },
        {
            id: 4,
            src: videoSrc,
            type: "video/mp4",
            title: 'test_video4'
        },
        {
            id: 5,
            src: videoSrc,
            type: "video/mp4",
            title: 'test_video5'
        },
    ]

    return (
        <div id="album_detail">

            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                <Grid container justify="center">
                    <Grid item sm={10} md={8} lg={7} className="c_title_space">
                        <Typography className="c_title">
                          {albumname}
                        </Typography>
                    </Grid>
                    <Grid item sm={10} md={8} lg={7} className="pos_relative">
                        <Button 
                            className="edit_button pos_left pos_vertical_center" 
                            aria-controls="simple-menu" 
                            aria-haspopup="true" 
                            onClick={handleClick} 
                        >
                            アルバムを編集する
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => {
                                history.push(`/groups/${name}/${id}/albums/${albumname}/${albumid}/editer`);
                                handleClose();
                            }}>
                                <EditIcon />アルバム情報の編集
                            </MenuItem>
                            {
                                view ? 
                                    <MenuItem onClick={handleClose}>
                                        <DeleteIcon />動画の削除
                                    </MenuItem>
                                :
                                    <MenuItem onClick={handleClose}>
                                        <DeleteIcon />画像の削除
                                    </MenuItem>
                            }
                        </Menu>

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
                        {
                            view ? 
                                <Tooltip title="動画を投稿" classes={{ tooltip: componentStyles.tooltip }}>
                                    <IconButton className="ic_button desk pos_right"><MovieIcon /></IconButton>
                                </Tooltip>
                            :
                                <Tooltip title="写真を投稿" classes={{ tooltip: componentStyles.tooltip }}>
                                    <IconButton
                                        className="ic_button desk pos_right" 
                                        onClick={() => history.push(`/groups/${name}/${id}/albums/${albumname}/${albumid}/images/register`)}
                                    >
                                        <AddAPhotoIcon />
                                    </IconButton>
                                </Tooltip>
                        }
                    </Grid>
                    <Grid item sm={10} md={8} lg={7}>
                        {
                            view ? 
                                <VideoListData data={videoData} label ={label} callback={callback} />
                            :
                                <ImageListData data={image} label={label} callback={callback} />
                        }
                    </Grid>
                </Grid>
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
                        <Typography className="c_title mobile_title">
                            {albumname}
                        </Typography>
                    </Grid>
                    <Grid item xs={11} className="pos_relative">
                        <Button 
                            className="edit_button mobile pos_left" 
                            aria-controls="simple-menu" 
                            aria-haspopup="true" 
                            onClick={handleClick} 
                        >
                            アルバムを編集する
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => {
                                history.push(`/groups/${name}/${id}/albums/${albumname}/${albumid}/editer`);
                                handleClose();
                            }}>
                                <EditIcon />アルバム情報の編集
                            </MenuItem>
                            {
                                view ? 
                                    <MenuItem onClick={handleClose}>
                                        <DeleteIcon />動画の削除
                                    </MenuItem>
                                :
                                    <MenuItem onClick={handleClose}>
                                        <DeleteIcon />画像の削除
                                    </MenuItem>
                            }
                        </Menu>
                        {
                            view ? 
                                <IconButton className="ic_button mobile pos_right"><MovieIcon /></IconButton>
                            :    
                                <IconButton 
                                    className="ic_button mobile pos_right" 
                                    onClick={() => history.push(`/groups/${name}/${id}/albums/${albumname}/${albumid}/images/register`)}
                                >
                                    <AddAPhotoIcon />
                                </IconButton>
                        }
                    </Grid>
                    <Grid item xs={11}>
                        <div>
                            {
                                view ? 
                                    <VideoListData data={videoData} label ={label} callback={callback} />
                                :
                                    <ImageListData data={image} label={label} callback={callback} />
                            }
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default AlbumDetail
