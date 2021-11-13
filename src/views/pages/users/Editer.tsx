import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import '../../../styles/users/users.scss';
import { fetchGetInfoMessages, fetchGetErrorMessages, fetchCredStart, fetchCredEnd, fetchGetUrl } from '../appSlice';
import { 
    fetchAsyncGetEditUser, selectEditUser, fetchAsyncPostEditUser, fetchAsyncPostEditUserValidation, 
    selectUserValidation, fetchResetValidation, fetchAsyncDeleteUser 
} from './userSlice';
import { 
    Grid, Theme, makeStyles, createStyles,Typography, Card, CardHeader, 
    CardContent, Input, Radio, Button, TextField
} from '@material-ui/core';
import SingleImageRegister from '../../components/common/SingleImageRegister';
import DisplayStyles from '../../../styles/common/displayMode';
import { AppDispatch } from '../../../stores/store';
import { Formik } from "formik";
import * as Yup from "yup";
import Loading from '../../components/common/Loading';
import { FORMIK_UUSER } from '../../types/usersTypes';

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

const UserEditer: React.FC = () => {
    const classes = useStyles();
    const displayStyles = DisplayStyles();
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const [disabled, setDisabled] = useState(false);
    const [dbDisabled, setDbDisabled] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    // redux
    const dispatch: AppDispatch = useDispatch();
    const edituser = useSelector(selectEditUser);
    const validation = useSelector(selectUserValidation);
    const [selectedValue, setSelectedValue] = React.useState(0);
    const [selectedValue2, setSelectedValue2] = React.useState(1);

    useEffect(() => {
        const renderUserEditer = async () => {
            // 編集用ユーザ情報取得
            const edituserRes = await dispatch(fetchAsyncGetEditUser({id: +id}));
            if(fetchAsyncGetEditUser.fulfilled.match(edituserRes) && edituserRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(edituserRes.payload.error_message));
                return;
            }

            // バリデーションの初期化
            dispatch(fetchResetValidation({
                errors: {
                    name: [''],
                    email: [''],
                    password: [''],
                    password_confirmation: [''],
                    image_file: ['']
                },
                validate_status: '',
            }));

            dispatch(fetchGetUrl(history.location.pathname));
        }
        renderUserEditer();
    }, [dispatch]);

    useEffect(() => {
        setSelectedValue(edituser.gender);
    }, [edituser]);

    const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(+event.target.value);
    };
    const handleChangeRadio2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue2(+event.target.value);
    };

    /**
     * アカウント退会処理
     */
     const handleDelete = async () => {
        if(window.confirm('アカウントを退会しますか?')) {
            // ボタンを非活性化
            setDbDisabled(true);
            // ユーザ削除処理
            const duserRes = await dispatch(fetchAsyncDeleteUser({id: +id}));
            if(fetchAsyncDeleteUser.fulfilled.match(duserRes) && duserRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(duserRes.payload.error_message));
                setDbDisabled(false);
                return;
            }
            if(fetchAsyncDeleteUser.fulfilled.match(duserRes) && duserRes.payload.info_message) {
                // ログアウト処理
                localStorage.removeItem('loginId');
                localStorage.removeItem('loginName');
                localStorage.setItem('infoMessage', duserRes.payload.info_message);
                window.location.href = '/login';
            }
            setDbDisabled(false);
            return;
        }
    }

    /**
     * 画像情報の取得用コールバック関数
     */
    const handleSetFile = (props: File | null) => {
        if(props) setFile(props);
    }

    /**
     * フォームデータ
     */
     const initialValues: FORMIK_UUSER = {
        id: edituser.id,
        name: edituser.name, 
        email: edituser.email, 
        password: "", 
        password_confirmation: "",
        gender: edituser.gender,
        hobby: edituser.hobby,
        description: edituser.description,
        image_file: null,
    }

    return (
        <div id="user_editer">

            <Formik
                enableReinitialize={true}
                initialErrors={{ 
                    name: "required",
                    email: "required", 
                }}
                initialValues={initialValues}
                onSubmit={async (values) => {
                    // ボタンを非活性化
                    setDisabled(true);
                    await dispatch(fetchCredStart());
                    
                    // ユーザ登録処理
                    values.gender = selectedValue;
                    values.image_file = file;
                    // バリデーションチェック
                    const uvalidateRes = await dispatch(fetchAsyncPostEditUserValidation(values));
                    if(fetchAsyncPostEditUserValidation.fulfilled.match(uvalidateRes)) {
                        if(!uvalidateRes.payload.validate_status) {
                            dispatch(fetchGetErrorMessages('登録内容に不備があります'));
                            await dispatch(fetchCredEnd());
                            setDisabled(false);
                            return;
                        }
                    }

                    const ruserRes = await dispatch(fetchAsyncPostEditUser(values));
                    if(fetchAsyncPostEditUser.fulfilled.match(ruserRes)) {
                        ruserRes.payload.info_message ? 
                            dispatch(fetchGetInfoMessages(ruserRes.payload.info_message))
                        :
                            dispatch(fetchGetErrorMessages(ruserRes.payload.error_message))

                        if(ruserRes.payload.info_message) history.push('/');
                    }
                    await dispatch(fetchCredEnd());
                    setDisabled(false);
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                             .required("※ユーザーネームの入力は必須です")
                             .max(15, '※15文字以上は設定できません'),
                    email: Yup.string()
                              .required("※メールアドレスの入力は必須です")
                              .email('※メールアドレスの形式で入力してください')
                              .max(30, '※30文字以上は設定できません'),
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
                    <form  onSubmit={handleSubmit}>

                        {/* PC版 & iPad版 */}
                        <div className={displayStyles.sectionDesktop}>
                            <Grid container justify="center">
                                <Grid item sm={6} lg={4}>
                                    <Card className="card">
                                        <CardHeader 
                                            title={
                                                <Typography className="header_title">
                                                    Account Editer
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
                                            {
                                                validation.errors !== undefined && validation.errors.name !== undefined && validation.errors.name[0] ? 
                                                    validation.errors.name.map(val => {
                                                        return <div className="c_errmessage" key={val}>{val}</div>
                                                    })
                                                :
                                                    ''
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
                                            {
                                                validation.errors !== undefined && validation.errors.email !== undefined && validation.errors.email[0] ? 
                                                    validation.errors.email.map(val => {
                                                        return <div className="c_errmessage" key={val}>{val}</div>
                                                    })
                                                :
                                                    ''
                                            }

                                            <div className="c_labelarea"><span className="c_label">パスワード変更</span></div>
                                            <div className="c_radioarea">
                                                <Radio
                                                    checked={selectedValue2 === 0}
                                                    onChange={handleChangeRadio2}
                                                    value={0}
                                                    classes={{root: classes.radio, checked: classes.checked}}
                                                />
                                                <span className="glabel">変更する</span>
                                                <Radio
                                                    checked={selectedValue2 === 1}
                                                    onChange={handleChangeRadio2}
                                                    value={1}
                                                />
                                                <span className="glabel">変更しない</span>
                                            </div>
                                            {
                                                !selectedValue2 ?
                                                    <>
                                                        <div className="c_labelarea"><span className="c_label">パスワード</span></div>
                                                        <Input 
                                                            className="c_textfield" 
                                                            inputProps={{ 'name': 'password', 'type': 'password' }} 
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.password}
                                                        />
                                                        {
                                                            validation.errors !== undefined && validation.errors.password !== undefined && validation.errors.password[0] ? 
                                                                validation.errors.password.map(val => {
                                                                    return <div className="c_errmessage" key={val}>{val}</div>
                                                                })
                                                            :
                                                                ''
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
                                                            validation.errors !== undefined && validation.errors.password_confirmation !== undefined && validation.errors.password_confirmation[0] ? 
                                                                validation.errors.password_confirmation.map(val => {
                                                                    return <div className="c_errmessage" key={val}>{val}</div>
                                                                })
                                                            :
                                                                ''
                                                        }
                                                    </>
                                                :
                                                    ''
                                            }

                                            <div className="c_labelarea"><span className="c_label">性別</span></div>
                                            <div className="c_radioarea">
                                                <Radio
                                                    checked={selectedValue === 0}
                                                    onChange={handleChangeRadio}
                                                    value={0}
                                                    name="gender"
                                                    classes={{root: classes.radio, checked: classes.checked}}
                                                />
                                                <span className="glabel">男性</span>
                                                <Radio
                                                    checked={selectedValue === 1}
                                                    onChange={handleChangeRadio}
                                                    value={1}
                                                    name="gender"
                                                />
                                                <span className="glabel">女性</span>
                                            </div>

                                            <div className="c_labelarea"><span className="c_label">趣味</span></div>
                                            <Input 
                                                placeholder="スポーツ観戦...etc" 
                                                className="c_textfield" 
                                                inputProps={{ 'name': 'hobby' }} 
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.hobby} 
                                            />

                                            <div className="c_labelarea"><span className="c_label">紹介文</span></div>
                                            <TextField
                                                name="description"
                                                className="c_textfield"
                                                multiline
                                                rows={10}
                                                placeholder="ここに紹介文を記載してください"
                                                variant="outlined"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.description}
                                            />

                                            <div className="c_labelarea"><span className="c_label">プロフィール画像</span></div>
                                            <div className="c_imagearea">
                                                <SingleImageRegister data={edituser.image_url} callback={handleSetFile} />
                                                {
                                                    validation.errors !== undefined && validation.errors.image_file !== undefined && validation.errors.image_file[0] ? 
                                                        validation.errors.image_file.map(val => {
                                                            return <div className="c_errmessage" key={val}>{val}</div>
                                                        })
                                                    :
                                                        ''
                                                }
                                            </div>

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
                                    {
                                        dbDisabled ? 
                                            <Button className="c_disabled_button" disabled={dbDisabled}>
                                                退会中
                                            </Button>
                                        :
                                            <Button variant="contained" color="secondary" className="delete_button" onClick={handleDelete}>退会する</Button>
                                    }
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
                                                    Account Editer
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
                                            {
                                                validation.errors !== undefined && validation.errors.name !== undefined && validation.errors.name[0] ? 
                                                    validation.errors.name.map(val => {
                                                        return <div className="c_errmessage" key={val}>{val}</div>
                                                    })
                                                :
                                                    ''
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
                                            {
                                                validation.errors !== undefined && validation.errors.email !== undefined && validation.errors.email[0] ? 
                                                    validation.errors.email.map(val => {
                                                        return <div className="c_errmessage" key={val}>{val}</div>
                                                    })
                                                :
                                                    ''
                                            }

                                            <div className="c_labelarea"><span className="c_label">パスワード変更</span></div>
                                            <div className="c_radioarea">
                                                <Radio
                                                    checked={selectedValue2 === 0}
                                                    onChange={handleChangeRadio2}
                                                    value={0}
                                                    classes={{root: classes.radio, checked: classes.checked}}
                                                />
                                                <span className="glabel">変更する</span>
                                                <Radio
                                                    checked={selectedValue2 === 1}
                                                    onChange={handleChangeRadio2}
                                                    value={1}
                                                />
                                                <span className="glabel">変更しない</span>
                                            </div>
                                            {
                                                !selectedValue2 ?
                                                    <>
                                                        <div className="c_labelarea"><span className="c_label">パスワード</span></div>
                                                        <Input 
                                                            className="c_textfield" 
                                                            inputProps={{ 'name': 'password', 'type': 'password' }} 
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.password}
                                                        />
                                                        {
                                                            validation.errors !== undefined && validation.errors.password !== undefined && validation.errors.password[0] ? 
                                                                validation.errors.password.map(val => {
                                                                    return <div className="c_errmessage" key={val}>{val}</div>
                                                                })
                                                            :
                                                                ''
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
                                                            validation.errors !== undefined && validation.errors.password_confirmation !== undefined && validation.errors.password_confirmation[0] ? 
                                                                validation.errors.password_confirmation.map(val => {
                                                                    return <div className="c_errmessage" key={val}>{val}</div>
                                                                })
                                                            :
                                                                ''
                                                        }
                                                    </>
                                                :
                                                    ''
                                            }

                                            <div className="c_labelarea"><span className="c_label">性別</span></div>
                                            <div className="c_radioarea">
                                                <Radio
                                                    checked={selectedValue === 0}
                                                    onChange={handleChangeRadio}
                                                    value={0}
                                                    name="gender"
                                                    classes={{root: classes.radio, checked: classes.checked}}
                                                />
                                                <span className="glabel">男性</span>
                                                <Radio
                                                    checked={selectedValue === 1}
                                                    onChange={handleChangeRadio}
                                                    value={1}
                                                    name="gender"
                                                />
                                                <span className="glabel">女性</span>
                                            </div>

                                            <div className="c_labelarea"><span className="c_label">趣味</span></div>
                                            <Input 
                                                placeholder="スポーツ観戦...etc" 
                                                className="c_textfield" 
                                                inputProps={{ 'name': 'hobby' }} 
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.hobby} 
                                            />

                                            <div className="c_labelarea"><span className="c_label">紹介文</span></div>
                                            <TextField
                                                name="description"
                                                className="c_textfield"
                                                multiline
                                                rows={10}
                                                placeholder="ここに紹介文を記載してください"
                                                variant="outlined"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.description}
                                            />

                                            <div className="c_labelarea"><span className="c_label">プロフィール画像</span></div>
                                            <div className="c_imagearea">
                                                <SingleImageRegister data={edituser.image_url} callback={handleSetFile} />
                                                {
                                                    validation.errors !== undefined && validation.errors.image_file !== undefined && validation.errors.image_file[0] ? 
                                                        validation.errors.image_file.map(val => {
                                                            return <div className="c_errmessage" key={val}>{val}</div>
                                                        })
                                                    :
                                                        ''
                                                }
                                            </div>

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
                                    {
                                        dbDisabled ? 
                                            <Button className="c_disabled_button" disabled={dbDisabled}>
                                                退会中
                                            </Button>
                                        :
                                            <Button variant="contained" color="secondary" className="delete_button" onClick={handleDelete}>退会する</Button>
                                    }
                                </Grid>
                            </Grid>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default UserEditer
