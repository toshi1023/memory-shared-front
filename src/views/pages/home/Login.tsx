import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import '../../../styles/common/common.scss';
import '../../../styles/home/home.scss';
import { fetchAsyncGetToken, fetchGetInfoMessages, fetchGetErrorMessages, fetchCredStart, fetchCredEnd } from '../appSlice';
import { fetchAsyncLogin } from './homeSlice';
import { Grid, Hidden, Typography, Card, CardHeader, CardContent, Input, Button } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';
import loginpage_back2 from '../../../image/loginpage/loginpage_back2.jpg';
import loginpage_front2 from '../../../image/loginpage/loginpage_front2.jpg';
import loginpage_back1 from '../../../image/loginpage/loginpage_back1.jpg';
import loginpage_front1 from '../../../image/loginpage/loginpage_front1.jpg';
import { Formik } from "formik";
import * as Yup from "yup";
import { AppDispatch } from '../../../stores/store';
import Loading from '../../components/common/Loading';

const Login: React.FC = () => {
    const displayStyles = DisplayStyles();
    const dispatch: AppDispatch = useDispatch();
    const history = useHistory();
    const [disabled, setDisabled] = useState(false);

    // ログアウト完了メッセージの表示
    useEffect(() => {
        // メッセージ表示
        if(localStorage.infoMessage) {
            dispatch(fetchGetInfoMessages(localStorage.infoMessage));
            localStorage.removeItem('infoMessage');
        }
    }, [dispatch]);

    return (
        <div id="login">
            <Formik
                initialErrors={{ email: "required", password: "required" }}
                initialValues={{ email: "", password: "" }}
                onSubmit={async (values) => {
                    // ボタンを非活性化
                    setDisabled(true);
                    await dispatch(fetchCredStart());
                    // XSRF-TOKENの取得
                    await dispatch(fetchAsyncGetToken());
                    // ログイン処理
                    const loginRes = await dispatch(fetchAsyncLogin(values));
                    if(fetchAsyncLogin.fulfilled.match(loginRes)) {
                        loginRes.payload.info_message ? 
                            dispatch(fetchGetInfoMessages(loginRes.payload.info_message)) 
                        : 
                            dispatch(fetchGetErrorMessages(loginRes.payload.error_message));
                        console.log(loginRes.payload.error_message);
                        if(loginRes.payload.info_message) history.push('/');
                    }
                    await dispatch(fetchCredEnd());
                    setDisabled(false);
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                            .required("※メールアドレスの入力は必須です")
                            .email('※メールアドレスの形式で入力してください'),
                    password: Yup.string()
                                .required("※パスワードの入力は必須です")
                                .min(6, '※6文字以上を入れてください'),
                })}
                >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    isValid,
                }) => (
                    <form onSubmit={handleSubmit}>
                        
                        {/* PC版 */}
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
                                                <Input 
                                                    placeholder="メールアドレス" 
                                                    className="textfield" 
                                                    inputProps={{ 'name': 'email' }} 
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                />
                                                {
                                                    touched.email && errors.email ? 
                                                        <div className="c_errmessage">{errors.email}</div>
                                                    : null
                                                }
                                                <Input 
                                                    placeholder="パスワード" 
                                                    className="textfield" 
                                                    inputProps={{ 'name': 'password', 'type': 'password' }} 
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                />
                                                {
                                                    touched.password && errors.password ? 
                                                        <div className="c_errmessage">{errors.password}</div>
                                                    : null
                                                }
                                                {
                                                    disabled ? 
                                                        <Button className="c_disabled_button" disabled={disabled}>
                                                            ログイン中<Loading />
                                                        </Button>
                                                    :
                                                        <Button className="c_button" type="submit" disabled={!isValid}>ログイン</Button>
                                                }
                                            </CardContent>
                                        </Card>

                                        {/* Googleアカウントでログイン */}

                                        {/* 新規アカウントの作成案内 */}
                                        <Card className="pagetransition_card">
                                            <CardContent>
                                                <Typography>
                                                    アカウントを新規で登録しますか？
                                                </Typography>
                                                <Typography className="pagetransition_event" onClick={() => history.push('/register')}>
                                                    登録する
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Hidden>

                            {/* iPad版 */}
                            <Hidden lgUp smDown>
                                <Grid container justify="center" className="formcontainer">
                                    <Grid item md={12} className="login_image_area_ipad">
                                        <img src={loginpage_back2} className="loginpage_back_ipad after" />
                                        <img src={loginpage_front2} className="loginpage_front_ipad after" />
                                        <img src={loginpage_back1} className="loginpage_back_ipad" />
                                        <img src={loginpage_front1} className="loginpage_front_ipad" />
                                        <Typography className="wf-merienda ipad">
                                            MemoryShareApp
                                        </Typography>
                                        {/* <Typography className="wf-roundedmplus1c_ipad">
                                            仲間と一緒に思い出を共有しよう
                                        </Typography> */}
                                    </Grid>
                                    <Grid item md={6}>
                                        <Card className="card_ipadpro">
                                            <CardHeader 
                                                title={
                                                    <Typography className="header_title">
                                                        Login
                                                    </Typography>
                                                }
                                                className="header">
                                            </CardHeader>
                                            <CardContent>
                                                <Input 
                                                    placeholder="メールアドレス" 
                                                    className="textfield" 
                                                    inputProps={{ 'name': 'email' }} 
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                />
                                                {
                                                    touched.email && errors.email ? 
                                                        <div className="c_errmessage">{errors.email}</div>
                                                    : null
                                                }
                                                <Input 
                                                    placeholder="パスワード" 
                                                    className="textfield" 
                                                    inputProps={{ 'name': 'password', 'type': 'password' }} 
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                />
                                                {
                                                    touched.password && errors.password ? 
                                                        <div className="c_errmessage">{errors.password}</div>
                                                    : null
                                                }
                                                {
                                                    disabled ? 
                                                        <Button className="c_disabled_button" disabled={disabled}>
                                                            ログイン中<Loading />
                                                        </Button>
                                                    :
                                                        <Button className="c_button" type="submit" disabled={!isValid}>ログイン</Button>
                                                }
                                            </CardContent>
                                        </Card>

                                        <Card className="pagetransition_card">
                                            <CardContent>
                                                <Typography>
                                                    アカウントを新規で登録しますか？
                                                </Typography>
                                                <Typography className="pagetransition_event" onClick={() => history.push('/register')}>
                                                    登録する
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Hidden>

                            <Hidden mdUp xsDown>
                                <Grid container justify="center" className="formcontainer">
                                    <Grid item sm={12} className="login_image_area_ipad">
                                        <img src={loginpage_back2} className="loginpage_back_ipad after" />
                                        <img src={loginpage_front2} className="loginpage_front_ipad after" />
                                        <img src={loginpage_back1} className="loginpage_back_ipad" />
                                        <img src={loginpage_front1} className="loginpage_front_ipad" />
                                        <Typography className="wf-merienda ipad">
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
                                                <Input 
                                                    placeholder="メールアドレス" 
                                                    className="textfield" 
                                                    inputProps={{ 'name': 'email' }} 
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                />
                                                {
                                                    touched.email && errors.email ? 
                                                        <div className="c_errmessage">{errors.email}</div>
                                                    : null
                                                }
                                                <Input 
                                                    placeholder="パスワード" 
                                                    className="textfield" 
                                                    inputProps={{ 'name': 'password', 'type': 'password' }} 
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                />
                                                {
                                                    touched.password && errors.password ? 
                                                        <div className="c_errmessage">{errors.password}</div>
                                                    : null
                                                }
                                                {
                                                    disabled ? 
                                                        <Button className="c_disabled_button" disabled={disabled}>
                                                            ログイン中<Loading />
                                                        </Button>
                                                    :
                                                        <Button className="c_button" type="submit" disabled={!isValid}>ログイン</Button>
                                                }
                                            </CardContent>
                                        </Card>

                                        <Card className="pagetransition_card">
                                            <CardContent>
                                                <Typography>
                                                    アカウントを新規で登録しますか？
                                                </Typography>
                                                <Typography className="pagetransition_event" onClick={() => history.push('/register')}>
                                                    登録する
                                                </Typography>
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
                                            <Input 
                                                placeholder="メールアドレス" 
                                                className="textfield" 
                                                inputProps={{ 'name': 'email' }} 
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                            />
                                            {
                                                touched.email && errors.email ? 
                                                    <div className="c_errmessage">{errors.email}</div>
                                                : null
                                            }
                                            <Input 
                                                placeholder="パスワード" 
                                                className="textfield" 
                                                inputProps={{ 'name': 'password', 'type': 'password' }} 
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                            {
                                                touched.password && errors.password ? 
                                                    <div className="c_errmessage">{errors.password}</div>
                                                : null
                                            }
                                            {
                                                disabled ? 
                                                    <Button className="c_disabled_button" disabled={disabled}>
                                                        ログイン中<Loading />
                                                    </Button>
                                                :
                                                    <Button className="c_button" type="submit" disabled={!isValid}>ログイン</Button>
                                            }
                                        </CardContent>
                                    </Card>

                                    {/* Googleアカウントでログイン */}

                                    {/* アカウント作成案内 */}
                                    <Card className="pagetransition_card">
                                        <CardContent>
                                            <Typography>
                                                アカウントを新規で登録しますか？
                                            </Typography>
                                            <Typography className="pagetransition_event" onClick={() => history.push('/register')}>
                                                登録する
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Login
