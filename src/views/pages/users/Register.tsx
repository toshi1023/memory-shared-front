import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import '../../../styles/users/users.scss';
import { fetchGetInfoMessages, fetchGetErrorMessages, fetchCredStart, fetchCredEnd } from '../appSlice';
import { Grid, Theme, makeStyles, createStyles,Typography, Card, CardHeader, CardContent, Input, Radio, Button } from '@material-ui/core';
import SingleImageRegister from '../../components/common/SingleImageRegister';
import DisplayStyles from '../../../styles/common/displayMode';
import { Formik } from "formik";
import * as Yup from "yup";
import { AppDispatch } from '../../../stores/store';
import Loading from '../../components/common/Loading';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        radio: {
        '&$checked': {
            color: '#4B8DF8'
        }
        },
        checked: {}
    }),
)

const UserRegister: React.FC = () => {
    const classes = useStyles();
    const displayStyles = DisplayStyles();
    const [selectedValue, setSelectedValue] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const dispatch: AppDispatch = useDispatch();

    // ラジオボタンの値の切り替え
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(+event.target.value);
    };

    /**
     * 画像情報の取得用コールバック関数
     */
    const handleSetFile = (props: File | null) => {
        if(props) setFile(props);
    }

    return (
        <div id="user_register">

            <Formik
                initialErrors={{ 
                    name: "required",
                    email: "required", 
                    password: "required", 
                    password_confirm: "required", 
                }}
                initialValues={{ name: "", email: "", password: "", password_confirm: "" }}
                onSubmit={async (values) => {
                    // ボタンを非活性化
                    setDisabled(true);
                    await dispatch(fetchCredStart());
                    // ユーザ登録処理
                    
                    await dispatch(fetchCredEnd());
                    setDisabled(false);
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                             .required("※ユーザーネームの入力は必須です")
                             .max(15, '※15文字以上は設定できません'),
                    email: Yup.string()
                            .required("※メールアドレスの入力は必須です")
                            .email('※メールアドレスの形式で入力してください'),
                    password: Yup.string()
                                .required("※パスワードの入力は必須です")
                                .min(6, '※6文字以上を入れてください'),
                    password_confirm: Yup.string()
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
                                                    Account Register
                                                </Typography>
                                            }
                                            className="header">
                                        </CardHeader>
                                        <CardContent>
                                            <div className="c_labelarea"><span className="c_label">ユーザーネーム</span></div>
                                            <Input 
                                                placeholder="test user" 
                                                className="c_textfield" 
                                                inputProps={{ 'name': 'name' }} 
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                            />
                                            {
                                                touched.name && errors.name ? 
                                                    <div className="c_errmessage">{errors.name}</div>
                                                : null
                                            }
                                            <div className="c_labelarea"><span className="c_label">メールアドレス</span></div>
                                            <Input 
                                                placeholder="test@xxx.co.jp" 
                                                className="c_textfield" 
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
                                                inputProps={{ 'type': 'password', 'name': 'password_confirm' }}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password_confirm} 
                                            />
                                            {
                                                touched.password_confirm && errors.password_confirm ? 
                                                    <div className="c_errmessage">{errors.password_confirm}</div>
                                                : null
                                            }
                                            <div className="c_labelarea"><span className="c_label">性別</span></div>
                                            <div className="c_radioarea">
                                                <Radio
                                                    checked={selectedValue === 0}
                                                    onChange={handleChange}
                                                    value={0}
                                                    name="gender"
                                                    classes={{root: classes.radio, checked: classes.checked}}
                                                />
                                                <span className="glabel">男性</span>
                                                <Radio
                                                    checked={selectedValue === 1}
                                                    onChange={handleChange}
                                                    value={1}
                                                    name="gender"
                                                />
                                                <span className="glabel">女性</span>
                                            </div>
                                            <div className="c_labelarea"><span className="c_label">プロフィール画像</span></div>
                                            <div className="c_imagearea">
                                                <SingleImageRegister data={null} callback={handleSetFile} />
                                            </div>
                                            {
                                                disabled ? 
                                                    <Button className="c_disabled_button" disabled={disabled}>
                                                        登録中<Loading />
                                                    </Button>
                                                :
                                                    <Button className="c_button small" type="submit" disabled={!isValid}>登録</Button>
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
                                                    Account Register
                                                </Typography>
                                            }
                                            className="header">
                                        </CardHeader>
                                        <CardContent>
                                        <div className="c_labelarea"><span className="c_label">ユーザーネーム</span></div>
                                            <Input 
                                                placeholder="test user" 
                                                className="c_textfield" 
                                                inputProps={{ 'name': 'name' }} 
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.name}
                                            />
                                            {
                                                touched.name && errors.name ? 
                                                    <div className="c_errmessage">{errors.name}</div>
                                                : null
                                            }
                                            <div className="c_labelarea"><span className="c_label">メールアドレス</span></div>
                                            <Input 
                                                placeholder="test@xxx.co.jp" 
                                                className="c_textfield" 
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
                                                inputProps={{ 'type': 'password', 'name': 'password_confirm' }}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password_confirm} 
                                            />
                                            {
                                                touched.password_confirm && errors.password_confirm ? 
                                                    <div className="c_errmessage">{errors.password_confirm}</div>
                                                : null
                                            }
                                            <div className="c_labelarea"><span className="c_label">性別</span></div>
                                            <div className="c_radioarea">
                                                <Radio
                                                    checked={selectedValue === 0}
                                                    onChange={handleChange}
                                                    value={0}
                                                    name="gender"
                                                    classes={{root: classes.radio, checked: classes.checked}}
                                                />
                                                <span className="glabel">男性</span>
                                                <Radio
                                                    checked={selectedValue === 1}
                                                    onChange={handleChange}
                                                    value={1}
                                                    name="gender"
                                                />
                                                <span className="glabel">女性</span>
                                            </div>
                                            <div className="c_labelarea"><span className="c_label">プロフィール画像</span></div>
                                            <div className="c_imagearea">
                                                <SingleImageRegister data={null} callback={handleSetFile} />
                                            </div>
                                            {
                                                disabled ? 
                                                    <Button className="c_disabled_button" disabled={disabled}>
                                                        登録中<Loading />
                                                    </Button>
                                                :
                                                    <Button className="c_button small" type="submit" disabled={!isValid}>登録</Button>
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

export default UserRegister
