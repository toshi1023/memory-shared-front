import React from 'react';
import { useHistory } from "react-router-dom";
import '../../../styles/groups/groups.scss';
import DisplayStyles from '../../../styles/common/displayMode';
import SearchText from '../../components/common/SearchText';
import SelectBox from '../../components/common/SelectBox';
import GroupListData from '../../components/groups/GroupListData';
import { Grid, Button, Typography } from '@material-ui/core';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

import group_list from '../../../data/group_list_data.json';


const GroupList: React.FC = () => {
    const history = useHistory();
    const displayStyles = DisplayStyles();

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
                        <GroupListData data={group_list} />
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
                        <GroupListData data={group_list} />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default GroupList
