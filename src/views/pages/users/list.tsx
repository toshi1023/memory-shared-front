import React from 'react';
import SearchText from '../../components/common/SearchText';
import SelectBox from '../../components/common/SelectBox';
import { Grid, Typography } from '@material-ui/core';


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
        <div id="users">
            <Grid container justify="center">
                <Grid item xs={8} sm={4} md={2} className="search_sort">
                    <SearchText callback={searchCallback} label="ユーザ名で検索" />
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                    <SelectBox callback={selectCallback} label="並び替え" />
                </Grid>
            </Grid>
        </div>
    )
}

export default UserList
