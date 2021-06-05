import React from 'react';
import '../../../styles/home/home.scss';
import TalkList from '../../components/home/TalkList';
import { Grid, Typography } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';

import talk_list from '../../../data/talk_list_data.json';

const MobileMyTalk: React.FC = () => {
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
                            トーク
                        </Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <TalkList data={talk_list} />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default MobileMyTalk
