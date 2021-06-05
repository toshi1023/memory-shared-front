import React from 'react';
import '../../../styles/home/home.scss';
import FamilyList from '../../components/home/FamilyList';
import { Grid, Typography } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';

import user_list from '../../../data/user_list_data.json';

const MobileMyFamily: React.FC = () => {
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
                            ファミリー
                        </Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <FamilyList data={user_list} />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default MobileMyFamily
