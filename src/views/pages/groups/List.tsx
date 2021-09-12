import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import '../../../styles/groups/groups.scss';
import DisplayStyles from '../../../styles/common/displayMode';
import { fetchGetErrorMessages, fetchGetUrl } from '../appSlice';
import { fetchAsyncGetGroups, selectGroups } from './groupSlice';
import SearchText from '../../components/common/SearchText';
import SelectBox from '../../components/common/SelectBox';
import GroupListData from '../../components/groups/GroupListData';
import { Grid, Button, Typography } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import getSearchSortProps from '../../../functions/getSearchSortProps';
import { AppDispatch } from '../../../stores/store';

const GroupList: React.FC = () => {
    const history = useHistory();
    const displayStyles = DisplayStyles();
    // redux
    const dispatch: AppDispatch = useDispatch();
    const groups = useSelector(selectGroups);

    /**
     * グループ一覧データの取得
     * @param key 
     * @returns 
     */
     const asyncGetData = async (key: string) => {
        const groupsProps = getSearchSortProps(key);
        
        const groupsRes = await dispatch(fetchAsyncGetGroups(groupsProps));
        if(fetchAsyncGetGroups.fulfilled.match(groupsRes) && groupsRes.payload.error_message) {
            dispatch(fetchGetErrorMessages(groupsRes.payload.error_message));
            return;
        }
    }

    useEffect(() => {
        const renderGroupList = () => {
            asyncGetData('new');
            dispatch(fetchGetUrl(history.location.pathname));
        }
        renderGroupList();
    }, [dispatch]);

    /**
     * 検索用コールバック関数
     * @param key 
     */
    const searchCallback = (key: string) => {
        console.log(key);
    }

    const selectCallback = (key: string) => {
        console.log(key);
    }

    return (
        <div id="group_list">

            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                <Grid container justify="center">
                    <Grid item sm={4} md={2}>
                        <SearchText callback={searchCallback} label="グループ名で検索" />
                    </Grid>
                    <Grid item sm={2} md={2}>
                        <SelectBox callback={selectCallback} label="並び替え" />
                    </Grid>
                </Grid>
                <Grid container justify="center" className="list_box">
                    <Grid item sm={7} md={5}>
                        <Button className="groupcreate_button" onClick={() => history.push('/groups/register')}><GroupAddIcon className="groupcreate_icon" />グループを作成</Button>
                        <GroupListData data={groups} />
                    </Grid>
                </Grid>
            </div>

            {/* スマホ版 */}
            <div className={displayStyles.sectionMobile}>
                <Grid container justify="center">
                    <Grid item xs={8}>
                        <SearchText callback={searchCallback} label="グループ名で検索" />
                    </Grid>
                    <Grid item xs={4}>
                        <SelectBox callback={selectCallback} label="並び替え" />
                    </Grid>
                </Grid>
                <Grid container justify="center" className="list_box">
                    <Grid item xs={11}>
                        <Button className="groupcreate_button mobile" onClick={() => history.push('/groups/register')}><GroupAddIcon className="groupcreate_icon" />グループを作成</Button>
                        <GroupListData data={groups} />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default GroupList
