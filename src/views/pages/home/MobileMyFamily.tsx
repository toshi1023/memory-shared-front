import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../../../styles/common/common.scss';
import '../../../styles/home/home.scss';
import { fetchGetErrorMessages, fetchGetUrl, fetchAsyncGetNreadCount } from '../appSlice';
import { fetchAsyncGetFamily, selectFamily, selectHomePage } from './homeSlice';
import PageNotFound from '../../components/common/PageNotFound';
import MyFamilyList from '../../components/home/MyFamilyList';
import { Grid, Typography } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';
import { AppDispatch } from '../../../stores/store';

const MobileMyFamily: React.FC = () => {
    const displayStyles = DisplayStyles();
    const history = useHistory();
    const [desc, setDesc] = useState(false);
    // redux
    const dispatch: AppDispatch = useDispatch();
    const families = useSelector(selectFamily);
    const homePage = useSelector(selectHomePage);
    // Ref
    const fRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const renderMyFamily = async() => {
            // ファミリー情報を取得
            const familyRes = await dispatch(fetchAsyncGetFamily({ id: +localStorage.loginId, page: null }));
            if(fetchAsyncGetFamily.fulfilled.match(familyRes) && familyRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(familyRes.payload.error_message));
                return;
            }
            // ニュース未読数の取得
            const nreadCountRes = await dispatch(fetchAsyncGetNreadCount());
            if(fetchAsyncGetNreadCount.fulfilled.match(nreadCountRes) && nreadCountRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(nreadCountRes.payload.error_message));
                return;
            }
            dispatch(fetchGetUrl(history.location.pathname));
        }
        renderMyFamily();
    }, [dispatch]);

    /**
     * ファミリーの説明表示制御
     */
    const handleOpenDescription = () => {
        setDesc(!desc);
    }

    /**
     * スクロールイベント(ファミリーの取得)
     * @param page 
     * @returns 
     */
     const scrollGetFamilyData = async (page: number) => {
        const familyRes = await dispatch(fetchAsyncGetFamily({ id: +localStorage.loginId, page: page }));
        if(fetchAsyncGetFamily.fulfilled.match(familyRes) && familyRes.payload.error_message) {
            dispatch(fetchGetErrorMessages(familyRes.payload.error_message));
        }
        return true;
    }

    return (
        <div id="home">
            <div className={displayStyles.sectionDesktop}>
                <PageNotFound />
            </div>

            <div className={displayStyles.sectionMobile}>
                <Grid container justify="center">
                    <Grid item xs={10} className="c_title_space">
                        <Typography className="c_title">
                            ファミリー
                        </Typography>
                        <Typography className="description_label mobile">
                            <span className="label_font" onClick={handleOpenDescription}>ファミリーとは?</span>
                        </Typography>
                        {
                            desc ? 
                                <Typography className="description">
                                    ファミリーとは同じグループに所属するユーザを指します。
                                    どんどんグループを作成してファミリーを増やしていきましょう。
                                </Typography>
                            :
                                ''
                        }
                    </Grid>
                    <Grid item xs={10}>
                        <MyFamilyList data={families} page={{current_page: homePage.f_currentpage, last_page: homePage.f_lastpage}} el={fRef} callback={scrollGetFamilyData} />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default MobileMyFamily
