import React from 'react';
import SearchText from '../../components/common/SearchText';


const UserList: React.FC = () => {

    /**
     * 検索用コールバック関数
     * @param key 
     */
    const searchCallback = (key: string) => {
        console.log(key);
    }

    return (
        <div>
            <SearchText callback={searchCallback} label="ユーザ名で検索" />
        </div>
    )
}

export default UserList
