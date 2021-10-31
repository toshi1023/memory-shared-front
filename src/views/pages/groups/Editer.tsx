import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import '../../../styles/groups/groups.scss';
import { 
    Grid, Theme, makeStyles, createStyles,Typography, Card, 
    CardHeader, CardContent, Input, TextField, Radio, Button 
} from '@material-ui/core';
import SingleImageRegister from '../../components/common/SingleImageRegister';
import DisplayStyles from '../../../styles/common/displayMode';
import { fetchGetUrl, fetchAsyncGetToken, fetchCredStart, fetchCredEnd, fetchGetInfoMessages, fetchGetErrorMessages } from '../appSlice';
import { 
    fetchAsyncGetGroup, selectGroup, fetchAsyncPostGroupValidation, selectGroupValidation, 
    fetchResetValidation, fetchAsyncPostEditGroup, fetchAsyncDeleteGroup 
} from './groupSlice';
import { Formik } from "formik";
import * as Yup from "yup";
import { AppDispatch } from '../../../stores/store';
import Loading from '../../components/common/Loading';
import { FORMIK_UGROUP } from '../../types/groupsTypes';

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

const GroupEditer: React.FC = () => {
    const classes = useStyles();
    const displayStyles = DisplayStyles();
    const history = useHistory();
    const { id, name } = useParams<{ id: string, name: string }>();
    const [selectedValue, setSelectedValue] = useState(0);
    const [selectedValue2, setSelectedValue2] = useState(1);
    const [file, setFile] = useState<File | null>(null);
    const [disabled, setDisabled] = useState(false);
    const [dbDisabled, setDbDisabled] = useState(false);
    // redux
    const dispatch: AppDispatch = useDispatch();
    const validation = useSelector(selectGroupValidation);
    const editgroup = useSelector(selectGroup);

    useEffect(() => {
        const renderGroupEditer = async () => {
            // 編集用グループ情報取得
            const editgroupRes = await dispatch(fetchAsyncGetGroup({id: +id}));
            if(fetchAsyncGetGroup.fulfilled.match(editgroupRes) && editgroupRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(editgroupRes.payload.error_message));
                return;
            }

            // バリデーションの初期化
            dispatch(fetchResetValidation({
                errors: {
                    name: [''],
                    image_file: [''],
                    host_user_id: ['']
                },
                validate_status: '',
            }));

            dispatch(fetchGetUrl(history.location.pathname));
        }
        renderGroupEditer();
    }, [dispatch]);

    useEffect(() => {
        setSelectedValue(editgroup.private_flg);
        setSelectedValue2(editgroup.welcome_flg);
    }, [editgroup]);

    const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(+event.target.value);
    }
    const handleChangeRadio2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue2(+event.target.value);
    }

    /**
     * 画像情報の取得用コールバック関数
     */
    const handleSetFile = (props: File | null) => {
        if(props) setFile(props);
    }

    /**
     * グループ削除処理
     */
    const handleDelete = async () => {
        if(window.confirm('グループを削除しますか?')) {
            // ボタンを非活性化
            setDbDisabled(true);
            // グループ削除処理
            const dgroupRes = await dispatch(fetchAsyncDeleteGroup({id: +id}));
            if(fetchAsyncDeleteGroup.fulfilled.match(dgroupRes) && dgroupRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(dgroupRes.payload.error_message));
                setDbDisabled(false);
                return;
            }
            if(fetchAsyncDeleteGroup.fulfilled.match(dgroupRes) && dgroupRes.payload.info_message) {
                dispatch(fetchGetInfoMessages(dgroupRes.payload.info_message));
                history.push(`/`);
            }
            setDbDisabled(false);
            return;
        }
    }

    /**
     * フォームデータ
     */
    const initialValues: FORMIK_UGROUP = {
        id: editgroup.id,
        name: editgroup.name, 
        description: editgroup.description,
        private_flg: editgroup.private_flg,
        welcome_flg: editgroup.welcome_flg,
        image_file: null,
        host_user_id: editgroup.host_user_id
    }

    return (
        <div id="group_editer">
            <Formik
                enableReinitialize={true}
                initialErrors={{ 
                    name: "required",
                }}
                initialValues={initialValues}
                onSubmit={async (values) => {
                    // ボタンを非活性化
                    setDisabled(true);
                    await dispatch(fetchCredStart());
                    // XSRF-TOKENの取得
                    await dispatch(fetchAsyncGetToken());
                    // グループ登録処理
                    values.private_flg = selectedValue;
                    values.welcome_flg = selectedValue2;
                    values.image_file = file;
                    // バリデーションチェック
                    const gvalidateRes = await dispatch(fetchAsyncPostGroupValidation(values));
                    if(fetchAsyncPostGroupValidation.fulfilled.match(gvalidateRes)) {
                        if(!gvalidateRes.payload.validate_status) {
                            dispatch(fetchGetErrorMessages('登録内容に不備があります'));
                            await dispatch(fetchCredEnd());
                            setDisabled(false);
                            return;
                        }
                    }

                    const ugroupRes = await dispatch(fetchAsyncPostEditGroup(values));
                    if(fetchAsyncPostEditGroup.fulfilled.match(ugroupRes)) {
                        ugroupRes.payload.info_message ? 
                            dispatch(fetchGetInfoMessages(ugroupRes.payload.info_message))
                        :
                            dispatch(fetchGetErrorMessages(ugroupRes.payload.error_message))

                        if(ugroupRes.payload.info_message) history.push(`/groups/${name}/${id}`);
                    }
                    await dispatch(fetchCredEnd());
                    setDisabled(false);
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                             .required("※グループ名の入力は必須です")
                             .max(50, '※50文字以上は設定できません'),
                    
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
                                                    Group Editer
                                                </Typography>
                                            }
                                            className="header">
                                        </CardHeader>
                                        <CardContent>
                                            <div className="c_labelarea"><span className="c_label">グループ名</span></div>
                                            <Input 
                                                name="name" 
                                                placeholder="test group" 
                                                className="c_textfield" 
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
                                            
                                            <div className="c_labelarea"><span className="c_label">公開フラグ</span></div>
                                            <div className="c_radioarea">
                                                <Radio
                                                    checked={selectedValue === 0}
                                                    onChange={handleChangeRadio}
                                                    value={0}
                                                    name="private_flg"
                                                    classes={{root: classes.radio, checked: classes.checked}}
                                                />
                                                <span className="glabel">公開</span>
                                                <Radio
                                                    checked={selectedValue === 1}
                                                    onChange={handleChangeRadio}
                                                    value={1}
                                                    name="private_flg"
                                                />
                                                <span className="glabel">非公開</span>
                                            </div>

                                            {
                                                selectedValue === 0 ? 
                                                    <>
                                                        <div className="c_labelarea"><span className="c_label">歓迎リストに追加する</span></div>
                                                        <div className="c_radioarea">
                                                            <Radio
                                                                checked={selectedValue2 === 1}
                                                                onChange={handleChangeRadio2}
                                                                value={1}
                                                                name="welcome_flg"
                                                                classes={{root: classes.radio, checked: classes.checked}}
                                                            />
                                                            <span className="glabel">する</span>
                                                            <Radio
                                                                checked={selectedValue2 === 0}
                                                                onChange={handleChangeRadio2}
                                                                value={0}
                                                                name="welcome_flg"
                                                            />
                                                            <span className="glabel">しない</span>
                                                        </div>
                                                    </>
                                                :
                                                    ''
                                            }

                                            <div className="c_labelarea"><span className="c_label">サムネイル画像</span></div>
                                            <div className="c_imagearea">
                                                <SingleImageRegister data={editgroup.image_url} callback={handleSetFile} />
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
                                                削除中
                                            </Button>
                                        :
                                            <Button variant="contained" color="secondary" className="delete_button" onClick={handleDelete}>グループを削除する</Button>
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
                                                    Group Editer
                                                </Typography>
                                            }
                                            className="header">
                                        </CardHeader>
                                        <CardContent>
                                            <div className="c_labelarea"><span className="c_label">グループ名</span></div>
                                            <Input 
                                                name="name" 
                                                placeholder="test group" 
                                                className="c_textfield" 
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
                                            
                                            <div className="c_labelarea"><span className="c_label">公開フラグ</span></div>
                                            <div className="c_radioarea">
                                                <Radio
                                                    checked={selectedValue === 0}
                                                    onChange={handleChangeRadio}
                                                    value={0}
                                                    name="private_flg"
                                                    classes={{root: classes.radio, checked: classes.checked}}
                                                />
                                                <span className="glabel">公開</span>
                                                <Radio
                                                    checked={selectedValue === 1}
                                                    onChange={handleChangeRadio}
                                                    value={1}
                                                    name="private_flg"
                                                />
                                                <span className="glabel">非公開</span>
                                            </div>
                                            
                                            {
                                                selectedValue === 0 ? 
                                                    <>
                                                        <div className="c_labelarea"><span className="c_label">歓迎リストに追加する</span></div>
                                                        <div className="c_radioarea">
                                                            <Radio
                                                                checked={selectedValue2 === 1}
                                                                onChange={handleChangeRadio2}
                                                                value={1}
                                                                name="welcome_flg"
                                                                classes={{root: classes.radio, checked: classes.checked}}
                                                            />
                                                            <span className="glabel">する</span>
                                                            <Radio
                                                                checked={selectedValue2 === 0}
                                                                onChange={handleChangeRadio2}
                                                                value={0}
                                                                name="welcome_flg"
                                                            />
                                                            <span className="glabel">しない</span>
                                                        </div>
                                                    </>
                                                :
                                                    ''
                                            }

                                            <div className="c_labelarea"><span className="c_label">サムネイル画像</span></div>
                                            <div className="c_imagearea">
                                                <SingleImageRegister data={editgroup.image_url} callback={handleSetFile} />
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
                                                削除中
                                            </Button>
                                        :
                                            <Button variant="contained" color="secondary" className="delete_button" onClick={handleDelete}>グループを削除する</Button>
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

export default GroupEditer