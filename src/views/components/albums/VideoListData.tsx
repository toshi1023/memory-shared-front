import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import DisplayStyles from '../../../styles/common/displayMode';
import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { VIDEO_LIST_DATA } from '../../types/albumsTypes';
import VideoPlayer from "../../components/common/VideoPlayer";
import Loading from '../common/Loading'; 
import InfiniteScroll  from "react-infinite-scroller";
import { fetchCredStart, fetchCredEnd } from '../../pages/appSlice';
import { AppDispatch } from '../../../stores/store';

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
    // scrollerの制御
    const [scroll, setScroll] = useState(true);
    const [page, setPage] = useState(1);
    // redux
    const dispatch: AppDispatch = useDispatch();

    /**
     * 項目を読み込むときのコールバック
     */
    const loadMore = useCallback(async () => {
        if(scroll) {
            // loadMoreの実行を停止
            setScroll(false);
            if(props.page.last_page === 1 || page === props.page.last_page) {
                return;
            }
            // ページ数の更新
            const currentPage = page + 1;
            setPage(currentPage);
            // Loading開始
            await dispatch(fetchCredStart);
            
            // ファミリーの取得
            const res = await props.scrollCallback(currentPage);
            if(res) {
                if(currentPage === props.page.last_page) return;
                setScroll(true);
            }
            // Loading終了
            await dispatch(fetchCredEnd);
        }
    }, [page]);

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
