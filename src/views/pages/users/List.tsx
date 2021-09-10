import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../../../styles/users/users.scss';
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
            <Grid container justify="center">
                <Grid item xs={8} sm={5} md={3}>
                    <SearchText callback={searchCallback} label="ユーザ名で検索" />
                </Grid>
                <Grid item xs={4} sm={2} md={1}>
                    <SelectBox callback={selectCallback} label="並び替え" />
                </Grid>
            </Grid>
            <Grid container justify="center" className="list_box">
                <Grid item xs={11} sm={7} md={5}>
                    <UserListData data={users} />
                </Grid>
            </Grid>
        </div>
    )
}

export default UserList
