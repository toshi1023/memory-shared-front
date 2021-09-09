import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../../styles/common/common.scss';
import '../../../styles/home/home.scss';
import { fetchGetErrorMessages } from '../appSlice';
import { fetchAsyncGetParticipant, selectParticipant } from './homeSlice';
import PageNotFound from '../../components/common/PageNotFound';
import MyGroupList from '../../components/home/MyGroupList';
import { Grid, Typography } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';
import { AppDispatch } from '../../../stores/store';


/**
 * スマホ用参加中グループ一覧ページ画面
 * @returns 
 */
const MobileMyGroup: React.FC = () => {
    const displayStyles = DisplayStyles();
    // redux
    const dispatch: AppDispatch = useDispatch();
    const participants = useSelector(selectParticipant);

    useEffect(() => {
        const renderMyFamily = async() => {
            // 参加中グループ情報を取得
            const participantRes = await dispatch(fetchAsyncGetParticipant({ id: +localStorage.loginId }));
            if(fetchAsyncGetParticipant.fulfilled.match(participantRes) && participantRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(participantRes.payload.error_message));
                return;
            }
        }
        renderMyFamily();
    }, [dispatch]);

    return (
        <div id="home">
            <div className={displayStyles.sectionDesktop}>
                <PageNotFound />
            </div>

            <div className={displayStyles.sectionMobile}>
                <Grid container justify="center">
                    <Grid item xs={11} className="c_title_space">
                        <Typography className="c_title">
                            参加グループ一覧
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <MyGroupList data={participants} />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default MobileMyGroup
