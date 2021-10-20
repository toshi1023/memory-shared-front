import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import '../../../styles/groups/groups.scss';
import { fetchGetUrl, fetchAsyncGetToken, fetchCredStart, fetchCredEnd, fetchGetInfoMessages, fetchGetErrorMessages } from '../appSlice';
import { fetchAsyncPostPost } from './groupSlice';
import { Grid, Typography, Card, CardHeader, CardContent, Input, TextField, Button } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';
import { Formik } from "formik";
import * as Yup from "yup";
import Loading from '../../components/common/Loading';
import { FORMIK_RPOST } from '../../types/groupsTypes';
import { AppDispatch } from '../../../stores/store';

const PostRegister: React.FC = () => {
    const displayStyles = DisplayStyles();
    const history = useHistory();
    const { id, name } = useParams<{ id: string, name: string }>();
    const [disabled, setDisabled] = useState(false);
    // redux
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGetUrl(history.location.pathname));
    }, [dispatch]);

    /**
     * フォームデータ
     */
     const initialValues: FORMIK_RPOST = {
        content: "", 
        group_id: +id,
        user_id: +localStorage.loginId
    }

    return (
        <div id="post_register">

            <Formik
                initialErrors={{ 
                    content: "required",
                }}
                initialValues={initialValues}
                onSubmit={async (values) => {
                    // ボタンを非活性化
                    setDisabled(true);
                    await dispatch(fetchCredStart());
                    // XSRF-TOKENの取得
                    await dispatch(fetchAsyncGetToken());
                    // 投稿登録処理
                    const rpostRes = await dispatch(fetchAsyncPostPost(values));
                    if(fetchAsyncPostPost.fulfilled.match(rpostRes)) {
                        rpostRes.payload.info_message ? 
                            dispatch(fetchGetInfoMessages(rpostRes.payload.info_message))
                        :
                            dispatch(fetchGetErrorMessages(rpostRes.payload.error_message))

                        if(rpostRes.payload.info_message) history.push(`/groups/${name}/${id}`);
                    }
                    await dispatch(fetchCredEnd());
                    setDisabled(false);
                }}
                validationSchema={Yup.object().shape({
                    content: Yup.string()
                                .required("※投稿文の入力は必須です")
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
                                                    Post Register
                                                </Typography>
                                            }
                                            className="header">
                                        </CardHeader>
                                        <CardContent>
                                            <div className="c_labelarea"><span className="c_label">グループ名</span></div>
                                            <Typography className="c_typography">test group</Typography>
                                            
                                            <div className="c_labelarea"><span className="c_label">投稿文</span></div>
                                            <TextField
                                                name="content"
                                                className="c_textfield"
                                                multiline
                                                rows={10}
                                                placeholder="ここに投稿内容を記載してください"
                                                variant="outlined"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.content}
                                            />
                                            {
                                                touched.content && errors.content ? 
                                                    <div className="c_errmessage">{errors.content}</div>
                                                : null
                                            }

                                            {
                                                disabled ? 
                                                    <Button className="c_disabled_button small" disabled={disabled}>
                                                        投稿中<Loading />
                                                    </Button>
                                                :
                                                    <Button className="c_button small" type="submit" disabled={!isValid}>投稿</Button>
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
                                                    Post Register
                                                </Typography>
                                            }
                                            className="header">
                                        </CardHeader>
                                        <CardContent>
                                            <div className="c_labelarea"><span className="c_label">グループ名</span></div>
                                            <Typography className="c_typography">test group</Typography>
                                            
                                            <div className="c_labelarea"><span className="c_label">紹介文</span></div>
                                            <TextField
                                                name="content"
                                                className="c_textfield"
                                                multiline
                                                rows={10}
                                                placeholder="ここに投稿内容を記載してください"
                                                variant="outlined"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.content}
                                            />
                                            {
                                                touched.content && errors.content ? 
                                                    <div className="c_errmessage">{errors.content}</div>
                                                : null
                                            }
                                            
                                            {
                                                disabled ? 
                                                    <Button className="c_disabled_button small" disabled={disabled}>
                                                        投稿中<Loading />
                                                    </Button>
                                                :
                                                    <Button className="c_button small" type="submit" disabled={!isValid}>投稿</Button>
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

export default PostRegister
