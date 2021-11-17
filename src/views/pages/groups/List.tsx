import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import '../../../styles/groups/groups.scss';
import DisplayStyles from '../../../styles/common/displayMode';
import { fetchGetErrorMessages, fetchGetUrl } from '../appSlice';
import { fetchAsyncGetGroups, selectGroups, selectGroupPages } from './groupSlice';
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
    // groups取得条件
    const [searchProps, setSearchProps] = useState('');
    // redux
    const dispatch: AppDispatch = useDispatch();
    const groups = useSelector(selectGroups);
    const groupPages = useSelector(selectGroupPages);

    /**
     * グループ一覧データの取得
     * @param key 
     * @returns 
     */
     const asyncGetData = async (key: string) => {
        const searchKey = getSearchSortProps(key);
        const groupsProps = {
            ...searchKey,
            page: null
        }
        
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
        setSearchProps(key);
        asyncGetData(key);
    }

    const selectCallback = (key: string) => {
        setSearchProps(key);
        asyncGetData(key);
    }

    /**
     * スクロールイベント(グループの取得)
     * @param page 
     * @returns 
     */
    const scrollGetData = async (page: number) => {
        const searchKey = getSearchSortProps(searchProps);
        const groupsProps = {
            ...searchKey,
            page: page
        }

        const groupsRes = await dispatch(fetchAsyncGetGroups(groupsProps));
        if(fetchAsyncGetGroups.fulfilled.match(groupsRes) && groupsRes.payload.error_message) {
            dispatch(fetchGetErrorMessages(groupsRes.payload.error_message));
        }
        return true;
    }

    return (
        <div id="group_list">

            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                <Grid container justify="center">
                    <Grid item sm={5} md={4} lg={3}>
                        <SearchText callback={searchCallback} label="グループ名で検索" />
                    </Grid>
                    <Grid item sm={2} md={2} lg={2}>
                        <SelectBox callback={selectCallback} label="並び替え" />
                    </Grid>
                </Grid>
                <Grid container justify="center" className="list_box">
                    <Grid item sm={7} md={6} lg={5}>
                        <Button className="groupcreate_button" onClick={() => history.push('/groups/register')}><GroupAddIcon className="groupcreate_icon" />グループを作成</Button>
                        <GroupListData data={groups} page={{current_page: groupPages.gi_currentpage, last_page: groupPages.gi_lastpage}} callback={scrollGetData} searchkey={searchProps} />
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
                        <GroupListData data={groups} page={{current_page: groupPages.gi_currentpage, last_page: groupPages.gi_lastpage}} callback={scrollGetData} searchkey={searchProps} />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default GroupList
