import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import DisplayStyles from '../../../styles/common/displayMode';
import _ from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import { IMAGE_LIST_DATA } from '../../types/albumsTypes';
import ModalSwiperImages from './ModalSwiperImages';
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
    // scrollerの制御
    const [scroll, setScroll] = useState(true);
    const [page, setPage] = useState(1);
    // redux
    const dispatch: AppDispatch = useDispatch();
    // Ref
    const iRef = useRef<HTMLUListElement>(null);

    // 削除を取りやめた場合は画像の選択状態を解除する
    useEffect(() => {
        const element = Array.from(document.getElementsByClassName('image_list'));
        element.map(el => {
            el.classList.remove(classes.visible);
        });
    }, [props.flg])

    /**
     * モーダル表示制御用関数
     * @param value 
     */
    const handleOpen = (value: boolean) => {
        setOpen(value);
    };

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
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={loadMore}                   //項目を読み込む際に処理するコールバック関数
                        initialLoad={false}
                        threshold={700}
                        hasMore={scroll}                      //読み込みを行うかどうかの判定
                        useWindow={false}
                        getScrollParent={() => iRef.current}
                    >
                        <ImageList ref={iRef} rowHeight={180} className={classes.imageList} cols={3}>
                                {_.map(props.data, (item, index) => (
                                    <ImageListItem 
                                        key={item.id} 
                                        className="image_list" 
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
                    </InfiniteScroll>
                </div>
            </div>

            {/* スマホ版 */}
            <div className={displayStyles.sectionMobileNoBottom}>
                <div className={classes.root}>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={loadMore}                   //項目を読み込む際に処理するコールバック関数
                        initialLoad={false}
                        threshold={700}
                        hasMore={scroll}                      //読み込みを行うかどうかの判定
                        useWindow={false}
                        getScrollParent={() => iRef.current}
                    >
                        <ImageList ref={iRef} rowHeight={180} className={classes.mobileImageList} cols={2}>
                            {_.map(props.data, (item, index) => (
                                <ImageListItem 
                                    key={item.id} 
                                    className="image_list" 
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
                                    <img style={{ padding: '2px 4px 4px 4px' }} src={item.image_url} alt={item.image_file} />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </InfiniteScroll>
                </div>
            </div>

            <ModalSwiperImages callback={handleOpen} data={props.data} open={open} index={slideIndex} />
        </>
    );
}

export default React.memo(ImageListData)
