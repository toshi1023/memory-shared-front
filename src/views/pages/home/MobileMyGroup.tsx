import React from 'react';
import '../../../styles/home/home.scss';
import GroupList from '../../components/home/GroupList';
import { Grid, Typography } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';

import group_list from '../../../data/group_list_data.json';


/**
 * スマホ用参加中グループ一覧ページ画面
 * @returns 
 */
const MobileMyGroup: React.FC = () => {
    const displayStyles = DisplayStyles();

    return (
        <div id="mobile_home">
            <div className={displayStyles.sectionDesktop}>
                {/*404画面を予定*/}
            </div>

            <div className={displayStyles.sectionMobile}>
                <Grid container>
                    <Grid item xs={11} className="title_space">
                        <Typography className="title">
                            参加グループ一覧
                        </Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <GroupList data={group_list} />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default MobileMyGroup
