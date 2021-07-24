import React from 'react';
import '../../../styles/common/common.scss';
import '../../../styles/home/home.scss';
import { Grid, Hidden, Typography, Card, CardHeader, CardContent, Input } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';
import loginpage_back2 from '../../../image/loginpage/loginpage_back2.jpg';
import loginpage_front2 from '../../../image/loginpage/loginpage_front2.jpg';
import loginpage_back1 from '../../../image/loginpage/loginpage_back1.jpg';
import loginpage_front1 from '../../../image/loginpage/loginpage_front1.jpg';

const Login: React.FC = () => {
    const displayStyles = DisplayStyles();


    return (
        <div id="login">
            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                {/* PC版 */}
                <Hidden smDown>
                    <Grid container justify="center" className="formcontainer">
                        <Grid item md={6} className="login_image_area">
                            <img src={loginpage_back1} className="loginpage_back" />
                            <img src={loginpage_front1} className="loginpage_front" />
                            {/* <Typography className="wf-roundedmplus1c">
                                仲間と一緒に思い出を共有しよう
                            </Typography> */}
                            <img src={loginpage_back2} className="loginpage_back after" />
                            <img src={loginpage_front2} className="loginpage_front after" />
                            <Typography className="wf-merienda">
                                MemoryShareApp
                            </Typography>
                        </Grid>
                        <Grid item md={3}>
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
                                    <form>
                                        <Input placeholder="ユーザーネーム" className="textfield" inputProps={{ 'aria-label': 'username' }} />
                                        <Input placeholder="パスワード" className="textfield" inputProps={{ 'aria-label': 'password' }} />
                                        <button className="button">ログイン</button>
                                    </form>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Hidden>

                {/* iPad版 */}
                <Hidden mdUp xsDown>
                    <Grid container justify="center">
                        <Grid item sm={12} className="login_image_area_ipad">
                            <img src={loginpage_back2} className="loginpage_back_ipad" />
                            <img src={loginpage_front2} className="loginpage_front_ipad" />
                            {/* <img src={loginpage_back1} className="loginpage_back_ipad" />
                            <img src={loginpage_front1} className="loginpage_front_ipad" /> */}
                            <Typography className="wf-merienda_ipad">
                                MemoryShareApp
                            </Typography>
                            {/* <Typography className="wf-roundedmplus1c_ipad">
                                仲間と一緒に思い出を共有しよう
                            </Typography> */}
                        </Grid>
                        <Grid item sm={6}>
                            <Card className="card_ipad">
                                <CardHeader 
                                    title={
                                        <Typography className="header_title">
                                            Login
                                        </Typography>
                                    }
                                    className="header">
                                </CardHeader>
                                <CardContent>
                                    <form>
                                        <Input placeholder="ユーザーネーム" className="textfield" inputProps={{ 'aria-label': 'username' }} />
                                        <Input placeholder="パスワード" className="textfield" inputProps={{ 'aria-label': 'password' }} />
                                        <button className="button">ログイン</button>
                                    </form>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Hidden>
            </div>

            {/* スマホ版 */}
            <div className={displayStyles.sectionMobile}>
                <Grid container justify="center" className="formcontainer_mobile">
                    <Grid item xs={11}>
                        <Card className="card">
                            <CardHeader 
                                title={
                                    <Typography className="header_title">
                                        MemoryShareApp
                                    </Typography>
                                }
                                className="header">
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <Input placeholder="ユーザーネーム" className="textfield" inputProps={{ 'aria-label': 'username' }} />
                                    <Input placeholder="パスワード" className="textfield" inputProps={{ 'aria-label': 'password' }} />
                                    <button className="button">ログイン</button>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Login
