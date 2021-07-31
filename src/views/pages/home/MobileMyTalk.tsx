import React from 'react';
import '../../../styles/common/common.scss';
import '../../../styles/home/home.scss';
import PageNotFound from '../../components/common/PageNotFound';
import MyTalkList from '../../components/home/MyTalkList';
import { Grid, Typography } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';

import talk_list from '../../../data/talk_list_data.json';

const MobileMyTalk: React.FC = () => {
    const displayStyles = DisplayStyles();

    return (
        <div id="home">
            <div className={displayStyles.sectionDesktop}>
                <PageNotFound />
            </div>

            <div className={displayStyles.sectionMobile}>
                <Grid container justify="center">
                    <Grid item xs={10} className="c_title_space">
                        <Typography className="c_title">
                            トーク
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <MyTalkList data={talk_list} />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default MobileMyTalk
