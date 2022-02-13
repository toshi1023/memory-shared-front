import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import '../../../styles/common/common.scss';
import '../../../styles/home/home.scss';
import DisplayStyles from '../../../styles/common/displayMode';
import { fetchGetInfoMessages, fetchGetErrorMessages, fetchCredStart, fetchCredEnd } from '../appSlice';
import { fetchAsyncPostEmail } from './homeSlice';
import { Grid, Hidden, Typography, Card, CardHeader, CardContent, Input, Button } from '@material-ui/core';
import { Formik } from "formik";
import * as Yup from "yup";
import { AppDispatch } from '../../../stores/store';
import Loading from '../../components/common/Loading';

/**
 * メールアドレス送信用の関数(パスワードリセット用の前処理を実施)
 * @returns 
 */
const EmailSender: React.FC = () => {
    const displayStyles = DisplayStyles();
    const dispatch: AppDispatch = useDispatch();
    const history = useHistory();
    const [disabled, setDisabled] = useState(false);

    return (
        <div id="email_sender">
            <Formik
                initialErrors={{ email: "required" }}
                initialValues={{ email: "" }}
                onSubmit={async (values) => {
                    // ボタンを非活性化
                    setDisabled(true);
                    await dispatch(fetchCredStart());
                    // メールアドレス送信処理
                    const pemailRes = await dispatch(fetchAsyncPostEmail(values));
                    if(fetchAsyncPostEmail.fulfilled.match(pemailRes)) {
                        pemailRes.payload.info_message ? 
                            dispatch(fetchGetInfoMessages(pemailRes.payload.info_message)) 
                        : 
                            dispatch(fetchGetErrorMessages(pemailRes.payload.error_message));
                        
                        if(pemailRes.payload.info_message) history.push('/');
                    }
                    await dispatch(fetchCredEnd());
                    setDisabled(false);
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                            .required("※メールアドレスの入力は必須です")
                            .email('※メールアドレスの形式で入力してください')
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
                                                    Email Sender
                                                </Typography>
                                            }
                                            className="header">
                                        </CardHeader>
                                        <CardContent>
                                            <div className="c_labelarea"><span className="c_label">メールアドレス</span></div>
                                            <Input 
                                                name="email" 
                                                placeholder="xxx@xxx.co.jp" 
                                                className="c_textfield" 
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                            />
                                            {
                                                touched.email && errors.email ? 
                                                    <div className="c_errmessage">{errors.email}</div>
                                                : null
                                            }
                                            {
                                                disabled ? 
                                                    <Button className="c_disabled_button small" disabled={disabled}>
                                                        送信中<Loading />
                                                    </Button>
                                                :
                                                    <Button className="c_button small" type="submit" disabled={!isValid}>送信</Button>
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
                                                    Email Sender
                                                </Typography>
                                            }
                                            className="header">
                                        </CardHeader>
                                        <CardContent>
                                            <div className="c_labelarea"><span className="c_label">メールアドレス</span></div>
                                            <Input 
                                                name="email" 
                                                placeholder="xxx@xxx.co.jp" 
                                                className="c_textfield" 
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                            />
                                            {
                                                touched.email && errors.email ? 
                                                    <div className="c_errmessage">{errors.email}</div>
                                                : null
                                            }
                                            {
                                                disabled ? 
                                                    <Button className="c_disabled_button small" disabled={disabled}>
                                                        送信中<Loading />
                                                    </Button>
                                                :
                                                    <Button className="c_button small" type="submit" disabled={!isValid}>送信</Button>
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

export default EmailSender