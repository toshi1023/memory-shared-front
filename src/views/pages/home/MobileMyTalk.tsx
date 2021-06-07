import React from 'react';
import '../../../styles/home/home.scss';
import PageNotFound from '../../components/common/PageNotFound';
import TalkList from '../../components/home/TalkList';
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
                    <Grid item xs={10} className="title_space">
                        <Typography className="title">
                            トーク
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <TalkList data={talk_list} />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default MobileMyTalk
