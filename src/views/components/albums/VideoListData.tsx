import React, { useState, useCallback } from 'react';
import DisplayStyles from '../../../styles/common/displayMode';
import ComponentStyles from '../../../styles/common/componentStyle';
import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { VIDEO_LIST_DATA } from '../../types/albumsTypes';
import VideoPlayer from "../../components/common/VideoPlayer";
import { Button, Checkbox } from '@material-ui/core';

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
    checkBox: {
        transform: "scale(1.4)",  // サイズ変更
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
    const componentStyles = ComponentStyles();
    // ページネーションの制御
    const [page, setPage] = useState(1);

    /**
     * データの取得(ページネーション処理)
     * @param page 
     */
    const handleGetData = async () => {
        const currentPage = page + 1;
        setPage(currentPage);
        await props.scrollCallback(currentPage);
    }

    const handleChange = (id: number) => {
        props.callback(id);
    }
    
    return (
        <>
            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                <div className={classes.root}>
                    {_.map(props.data, item => (
                        <>
                            <VideoPlayer 
                                options={{
                                    sources: [{
                                        src: item.video_url,
                                        type: item.type
                                    }],
                                }} 
                                id={item.id}
                            />
                            {
                                props.flg ? 
                                    <div>
                                        <Checkbox
                                            className={classes.checkBox}
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                            onChange={() => handleChange(item.id)}
                                        />
                                    </div>
                                :
                                    <div>
                                    </div>
                            }
                        </>
                    ))}
                </div>
                {
                    props.data.length === 0 || props.page.last_page === page ? 
                        ''
                    :
                        <Button className={componentStyles.submitButton} onClick={handleGetData}>もっと動画を見る</Button>
                }
            </div>

            {/* スマホ版 */}
            <div className={displayStyles.sectionMobileNoBottom}>
                <div className={classes.root}>
                    {_.map(props.data, item => (
                        <>
                            <VideoPlayer 
                                options={{
                                    sources: [{
                                        src: item.video_url,
                                        type: item.type
                                    }],
                                }} 
                                id={item.id}
                            />
                            {
                                props.flg ? 
                                    <div>
                                        <Checkbox
                                            inputProps={{ 'aria-label': 'primary checkbox' }}
                                            onChange={() => handleChange(item.id)}
                                        />
                                    </div>
                                :
                                    <div>
                                    </div>
                            }
                        </>
                    ))}
                </div>
                {
                    props.data.length === 0 || props.page.last_page === page ? 
                        ''
                    :
                        <Button className={componentStyles.submitButton} onClick={handleGetData}>もっと動画を見る</Button>
                }
            </div>
        </>
    );
}

export default React.memo(VideoListData)
