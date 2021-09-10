import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../../../styles/common/common.scss';
import '../../../styles/home/home.scss';
import { fetchGetErrorMessages, fetchGetUrl } from '../appSlice';
import { fetchAsyncGetTalklist, selectTalklist } from './homeSlice';
import PageNotFound from '../../components/common/PageNotFound';
import MyTalkList from '../../components/home/MyTalkList';
import { Grid, Typography } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';
import { AppDispatch } from '../../../stores/store';

const MobileMyTalk: React.FC = () => {
    const displayStyles = DisplayStyles();
    const history = useHistory();
    // redux
    const dispatch: AppDispatch = useDispatch();
    const talklists = useSelector(selectTalklist);

    useEffect(() => {
        const renderMyTalk = async() => {
            // トーク一覧情報を取得
            const talklistRes = await dispatch(fetchAsyncGetTalklist({ id: +localStorage.loginId }));
            if(fetchAsyncGetTalklist.fulfilled.match(talklistRes) && talklistRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(talklistRes.payload.error_message));
                return;
            }
            dispatch(fetchGetUrl(history.location.pathname));
        }
        renderMyTalk();
    }, [dispatch]);

    return (
        <div id="home">
            <div className={displayStyles.sectionDesktop}>
                <PageNotFound />
            </div>

            <div className={displayStyles.sectionMobile}>
                <Grid container justify="center">
                    <Grid item xs={10} className="c_title_space">
                        <Typography className="c_title">
                            トーク
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <MyTalkList data={talklists} />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default MobileMyTalk
