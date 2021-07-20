import React from 'react';
import '../../../styles/common/common.scss';
import '../../../styles/home/home.scss';
import { Grid, Typography, Card, CardHeader, CardContent } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';
import loginpage_back from '../../../image/loginpage_back.jpg';
import loginpage_front from '../../../image/loginpage_front.jpg';

const Login: React.FC = () => {
    const displayStyles = DisplayStyles();


    return (
        <div id="login">
            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                <Grid container justify="center" className="formcontainer">
                    <Grid item sm={5} md={6} className="login_image_area">
                        <img src={loginpage_back} className="loginpage_back" />
                        <img src={loginpage_front} className="loginpage_front" />
                        <Typography className="wf-merienda">
                            MemoryShareApp
                        </Typography>
                        <Typography className="wf-roundedmplus1c">
                            仲間と一緒に思い出を共有しよう
                        </Typography>
                    </Grid>
                    <Grid item sm={5} md={3}>
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

            {/* スマホ版 */}
            <div className={displayStyles.sectionMobile}>
                <Grid container justify="center" className="formcontainer">
                    <Grid item xs={12}>
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
