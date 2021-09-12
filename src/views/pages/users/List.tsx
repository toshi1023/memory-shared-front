import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../../../styles/users/users.scss';
import DisplayStyles from '../../../styles/common/displayMode';
import { fetchGetErrorMessages, fetchGetUrl } from '../appSlice';
import { fetchAsyncGetUsers, selectUsers } from './userSlice';
import SearchText from '../../components/common/SearchText';
import SelectBox from '../../components/common/SelectBox';
import UserListData from '../../components/users/UserListData';
import { Grid, Typography } from '@material-ui/core';
import getSearchSortProps from '../../../functions/getSearchSortProps';
import { AppDispatch } from '../../../stores/store';

const UserList: React.FC = () => {
    const history = useHistory();
    const displayStyles = DisplayStyles();
    // users取得条件
    const [searchProps, setSearchProps] = useState('');
    // redux
    const dispatch: AppDispatch = useDispatch();
    const users = useSelector(selectUsers);

    /**
     * ユーザ一覧データの取得
     * @param key 
     * @returns 
     */
    const asyncGetData = async (key: string) => {
        const usersProps = getSearchSortProps(key);
        
        const usersRes = await dispatch(fetchAsyncGetUsers(usersProps));
        if(fetchAsyncGetUsers.fulfilled.match(usersRes) && usersRes.payload.error_message) {
            dispatch(fetchGetErrorMessages(usersRes.payload.error_message));
            return;
        }
    }

    useEffect(() => {
        const renderUserList = () => {
            asyncGetData('new');
            dispatch(fetchGetUrl(history.location.pathname));
        }
        renderUserList();
    }, [dispatch]);

    /**
     * 検索用コールバック関数
     * @param key 
     */
    const searchCallback = async (key: string) => {
        setSearchProps(key);
        asyncGetData(key);
    }

    /**
     * ソート用コールバック関数
     * @param key 
     */
    const selectCallback = async (key: string) => {
        asyncGetData(key);
    }

    return (
        <div id="user_list">

            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                <Grid container justify="center">
                    <Grid item sm={5} md={4} lg={3}>
                        <SearchText callback={searchCallback} label="ユーザ名で検索" />
                    </Grid>
                    <Grid item sm={2} md={2} lg={2}>
                        <SelectBox callback={selectCallback} label="並び替え" />
                    </Grid>
                </Grid>
                <Grid container justify="center" className="list_box">
                    <Grid item sm={7} md={6} lg={5}>
                        <UserListData data={users} />
                    </Grid>
                </Grid>
            </div>

            {/* スマホ版 */}
            <div className={displayStyles.sectionMobile}>
                <Grid container justify="center">
                    <Grid item xs={8}>
                        <SearchText callback={searchCallback} label="ユーザ名で検索" />
                    </Grid>
                    <Grid item xs={4}>
                        <SelectBox callback={selectCallback} label="並び替え" />
                    </Grid>
                </Grid>
                <Grid container justify="center" className="list_box">
                    <Grid item xs={11}>
                        <UserListData data={users} />
                    </Grid>
                </Grid>
            </div>

        </div>
    )
}

export default UserList
