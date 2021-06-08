import React from 'react';
import '../../../styles/home/home.scss';
import UserCard from '../../components/users/UserCard';
import { Grid, Typography } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';

const UserDetail: React.FC = () => {
    const displayStyles = DisplayStyles();
    
    const profile = {
        id: 2,
        name: 'test',
        image_file: '',
        hobby: '映画鑑賞',
        gender: true,
        description: 'バスケと映画鑑賞が好きな会社員です。アクティブな付き合いをしたいです。',
        family_id: 1,
        talk_id: null
    }

    return (
        <div id="user_detail">
            <Grid container justify="center" className="card">
                <Grid item xs={11} sm={6} md={5}>
                    <UserCard data={profile} />
                </Grid>
            </Grid>
        </div>
    )
}

export default UserDetail
