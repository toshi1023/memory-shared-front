import React from 'react';
import '../../../styles/common/common.scss';
import '../../../styles/home/home.scss';
import { Grid, Typography, Card, CardHeader, CardContent } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';
import loginpage from '../../../image/loginpage.jpeg';

const Login: React.FC = () => {
    const displayStyles = DisplayStyles();


    return (
        <div id="login">
            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                <Grid container justify="center" className="formcontainer">
                    <Grid item sm={5} md={6}>
                        <img src={loginpage} className="loginpage" />
                    </Grid>
                    <Grid item sm={5} md={4}>
                        <Card className="card">
                            <CardHeader 
                                title={
                                    <Typography className="header_title">
                                        Login
                                    </Typography>
                                }
                                className="header">
                            </CardHeader>
                            <CardContent>
                                test
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Login
