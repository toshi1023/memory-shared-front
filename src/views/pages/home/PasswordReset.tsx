import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import '../../../styles/common/common.scss';
import '../../../styles/home/home.scss';
import DisplayStyles from '../../../styles/common/displayMode';
import { fetchGetInfoMessages, fetchGetErrorMessages, fetchCredStart, fetchCredEnd } from '../appSlice';
import { fetchAsyncResetPassword } from './homeSlice';
import { Grid, Typography, Card, CardHeader, CardContent, Input, Button } from '@material-ui/core';
import { Formik } from "formik";
import * as Yup from "yup";
import { AppDispatch } from '../../../stores/store';
import Loading from '../../components/common/Loading';

/**
 * パスワードの再設定用の関数
 * @returns 
 */
const PasswordReset: React.FC = () => {
    const displayStyles = DisplayStyles();
    const dispatch: AppDispatch = useDispatch();
    const history = useHistory();
    const { email, token } = useParams<{email: string, token: string}>();
    const [disabled, setDisabled] = useState(false);

    return (
        <div id="password_reset">
            <Formik
                initialErrors={{ password: "required", password_confirmation: "required" }}
                initialValues={{ email: email, password: "", password_confirmation: "", token: token }}
                onSubmit={async (values) => {
                    // ボタンを非活性化
                    setDisabled(true);
                    await dispatch(fetchCredStart());
                    // パスワードの再設定処理
                    const rpasswordRes = await dispatch(fetchAsyncResetPassword(values));
                    if(fetchAsyncResetPassword.fulfilled.match(rpasswordRes)) {
                        rpasswordRes.payload.info_message ? 
                            dispatch(fetchGetInfoMessages(rpasswordRes.payload.info_message)) 
                        : 
                            dispatch(fetchGetErrorMessages(rpasswordRes.payload.error_message));
                        
                        if(rpasswordRes.payload.info_message) history.push('/');
                    }
                    await dispatch(fetchCredEnd());
                    setDisabled(false);
                }}
                validationSchema={Yup.object().shape({
                    password: Yup.string()
                                 .required("※パスワードの入力は必須です")
                                 .min(6, '※6文字以上を入れてください'),
                    password_confirmation: Yup.string()
                                              .required("※パスワード(確認)の入力は必須です")
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
                        {/* PC版 & iPad版 */}
                        <div className={displayStyles.sectionDesktop}>
                            <Grid container justify="center">
                                <Grid item sm={6} lg={4}>
                                    <Card className="card">
                                        <CardHeader 
                                            title={
                                                <Typography className="header_title">
                                                    Password Update
                                                </Typography>
                                            }
                                            className="header">
                                        </CardHeader>
                                        <CardContent>
                                            <div className="c_labelarea"><span className="c_label">パスワード</span></div>
                                            <Input 
                                                className="c_textfield" 
                                                inputProps={{ 'type': 'password', 'name': 'password' }} 
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                            {
                                                touched.password && errors.password ? 
                                                    <div className="c_errmessage">{errors.password}</div>
                                                : null
                                            }
                                            <div className="c_labelarea"><span className="c_label">パスワード(確認)</span></div>
                                            <Input 
                                                className="c_textfield" 
                                                inputProps={{ 'type': 'password', 'name': 'password_confirmation' }}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password_confirmation} 
                                            />
                                            {
                                                touched.password_confirmation && errors.password_confirmation ? 
                                                    <div className="c_errmessage">{errors.password_confirmation}</div>
                                                : null
                                            }
                                            {
                                                disabled ? 
                                                    <Button className="c_disabled_button small" disabled={disabled}>
                                                        更新中<Loading />
                                                    </Button>
                                                :
                                                    <Button className="c_button small" type="submit" disabled={!isValid}>更新</Button>
                                            }
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </div>

                        {/* スマホ版 */}
                        <div className={displayStyles.sectionMobile}>
                            <Grid container justify="center">
                                <Grid item xs={11}>
                                    <Card className="card">
                                        <CardHeader 
                                            title={
                                                <Typography className="header_title">
                                                    Password Update
                                                </Typography>
                                            }
                                            className="header">
                                        </CardHeader>
                                        <CardContent>
                                            <div className="c_labelarea"><span className="c_label">パスワード</span></div>
                                            <Input 
                                                className="c_textfield" 
                                                inputProps={{ 'type': 'password', 'name': 'password' }} 
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                            {
                                                touched.password && errors.password ? 
                                                    <div className="c_errmessage">{errors.password}</div>
                                                : null
                                            }
                                            <div className="c_labelarea"><span className="c_label">パスワード(確認)</span></div>
                                            <Input 
                                                className="c_textfield" 
                                                inputProps={{ 'type': 'password', 'name': 'password_confirmation' }}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password_confirmation} 
                                            />
                                            {
                                                touched.password_confirmation && errors.password_confirmation ? 
                                                    <div className="c_errmessage">{errors.password_confirmation}</div>
                                                : null
                                            }
                                            {
                                                disabled ? 
                                                    <Button className="c_disabled_button small" disabled={disabled}>
                                                        更新中<Loading />
                                                    </Button>
                                                :
                                                    <Button className="c_button small" type="submit" disabled={!isValid}>更新</Button>
                                            }
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

export default PasswordReset