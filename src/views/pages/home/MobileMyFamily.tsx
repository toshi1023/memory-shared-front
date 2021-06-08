import React from 'react';
import '../../../styles/home/home.scss';
import PageNotFound from '../../components/common/PageNotFound';
import FamilyList from '../../components/home/FamilyList';
import { Grid, Typography } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';

import family_list from '../../../data/family_list_data.json';

const MobileMyFamily: React.FC = () => {
    const displayStyles = DisplayStyles();

    return (
        <div id="home">
            <div className={displayStyles.sectionDesktop}>
                <PageNotFound />
            </div>

            <div className={displayStyles.sectionMobile}>
                <Grid container justify="center">
                    <Grid item xs={10} className="title_space">
                        <Typography className="title">
                            ファミリー
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <FamilyList data={family_list} />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default MobileMyFamily
