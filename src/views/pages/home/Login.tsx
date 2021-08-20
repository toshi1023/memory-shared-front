import React from 'react';
import '../../../styles/common/common.scss';
import '../../../styles/home/home.scss';
import { Grid, Hidden, Typography, Card, CardHeader, CardContent, Input, Button } from '@material-ui/core';
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
                <Hidden mdDown>
                    <Grid container justify="center" className="formcontainer">
                        <Grid item lg={6} className="login_image_area">
                            <img src={loginpage_back1} className="loginpage_back" />
                            <img src={loginpage_front1} className="loginpage_front" />
                            {/* <Typography className="wf-roundedmplus1c">
                                仲間と一緒に思い出を共有しよう
                            </Typography> */}
                            <img src={loginpage_back2} className="loginpage_back after" />
                            <img src={loginpage_front2} className="loginpage_front after" />
                            <Typography className="wf-merienda pc">
                                MemoryShareApp
                            </Typography>
                        </Grid>
                        <Grid item lg={3}>
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
                                        <Input placeholder="メールアドレス" className="textfield" inputProps={{ 'name': 'email' }} />
                                        <Input placeholder="パスワード" className="textfield" inputProps={{ 'name': 'password' }} />
                                        <Button className="c_button">ログイン</Button>
                                    </form>
                                </CardContent>
                            </Card>

                            {/* Googleアカウントでログイン */}

                            {/* 新規アカウントの作成案内 */}
                            <Card className="pagetransition_card">
                                <CardContent>
                                    <Typography>
                                        アカウントを新規で登録しますか？
                                    </Typography>
                                    <a href="/register">
                                        登録する
                                    </a>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Hidden>

                {/* iPad版 */}
                <Hidden lgUp xsDown>
                    <Grid container justify="center" className="formcontainer">
                        <Grid item sm={12} md={12} className="login_image_area_ipad">
                            <img src={loginpage_back2} className="loginpage_back_ipad" />
                            <img src={loginpage_front2} className="loginpage_front_ipad" />
                            {/* <img src={loginpage_back1} className="loginpage_back_ipad" />
                            <img src={loginpage_front1} className="loginpage_front_ipad" /> */}
                            <Typography className="wf-merienda ipad">
                                MemoryShareApp
                            </Typography>
                            {/* <Typography className="wf-roundedmplus1c_ipad">
                                仲間と一緒に思い出を共有しよう
                            </Typography> */}
                        </Grid>
                        <Grid item sm={6} md={6}>
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
                                        <Input placeholder="メールアドレス" className="textfield" inputProps={{ 'name': 'email' }} />
                                        <Input placeholder="パスワード" className="textfield" inputProps={{ 'name': 'password' }} />
                                        <Button className="c_button">ログイン</Button>
                                    </form>
                                </CardContent>
                            </Card>

                            <Card className="pagetransition_card">
                                <CardContent>
                                    <Typography>
                                        アカウントを新規で登録しますか？
                                    </Typography>
                                    <a href="/register">
                                        登録する
                                    </a>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Hidden>
            </div>

            {/* スマホ版 */}
            <div className={displayStyles.sectionMobile}>
                <Grid container justify="center" className="formcontainer_mobile">
                    <Grid item xs={11} className="loginpage_image_area_iphone">
                        <img src={loginpage_back2} className="loginpage_iphone" />
                        <Typography className="wf-merienda iphone">
                            MemoryShareApp
                        </Typography>
                    </Grid>
                    <Grid item xs={11}>
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
                                    <Input placeholder="メールアドレス" className="textfield" inputProps={{ 'name': 'email' }} />
                                    <Input placeholder="パスワード" className="textfield" inputProps={{ 'name': 'password' }} />
                                    <Button className="c_button">ログイン</Button>
                                </form>
                            </CardContent>
                        </Card>

                        {/* Googleアカウントでログイン */}

                        {/* アカウント作成案内 */}
                        <Card className="pagetransition_card">
                            <CardContent>
                                <Typography>
                                    アカウントを新規で登録しますか？
                                </Typography>
                                <a href="/register">
                                    登録する
                                </a>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Login
