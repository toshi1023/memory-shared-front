import React, { useState } from 'react';
import '../../../styles/common/common.scss';
import '../../../styles/home/home.scss';
import PageNotFound from '../../components/common/PageNotFound';
import MyFamilyList from '../../components/home/MyFamilyList';
import { Grid, Typography } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';

import family_list from '../../../data/family_list_data.json';

const MobileMyFamily: React.FC = () => {
    const displayStyles = DisplayStyles();
    const [desc, setDesc] = useState(false);

    /**
     * ファミリーの説明表示制御
     */
    const handleOpenDescription = () => {
        setDesc(!desc);
    }

    return (
        <div id="home">
            <div className={displayStyles.sectionDesktop}>
                <PageNotFound />
            </div>

            <div className={displayStyles.sectionMobile}>
                <Grid container justify="center">
                    <Grid item xs={10} className="c_title_space">
                        <Typography className="c_title">
                            ファミリー
                        </Typography>
                        <Typography className="description_label mobile">
                            <span className="label_font" onClick={handleOpenDescription}>ファミリーとは?</span>
                        </Typography>
                        {
                            desc ? 
                                <Typography className="description">
                                    ファミリーとは同じグループに所属するユーザを指します。
                                    どんどんグループを作成してファミリーを増やしていきましょう。
                                </Typography>
                            :
                                ''
                        }
                    </Grid>
                    <Grid item xs={10}>
                        <MyFamilyList data={family_list} />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default MobileMyFamily
