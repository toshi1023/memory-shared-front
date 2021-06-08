import React from 'react';
import '../../../styles/users/users.scss';
import SearchText from '../../components/common/SearchText';
import SelectBox from '../../components/common/SelectBox';
import UserListData from '../../components/users/UserListData';
import { Grid, Typography } from '@material-ui/core';

import user_list from '../../../data/user_list_data.json';


const UserList: React.FC = () => {

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
        <div id="user_list">
            <Grid container justify="center">
                <Grid item xs={8} sm={4} md={2}>
                    <SearchText callback={searchCallback} label="ユーザ名で検索" />
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                    <SelectBox callback={selectCallback} label="並び替え" />
                </Grid>
            </Grid>
            <Grid container justify="center" className="list_box">
                <Grid item xs={11} sm={7} md={5}>
                    <UserListData data={user_list} />
                </Grid>
            </Grid>
        </div>
    )
}

export default UserList
