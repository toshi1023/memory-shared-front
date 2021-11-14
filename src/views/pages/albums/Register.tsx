import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../styles/albums/albums.scss';
import { useHistory, useParams } from "react-router-dom";
import { Grid, Typography, Card, CardHeader, CardContent, Input, Button } from '@material-ui/core';
import SingleImageRegister from '../../components/common/SingleImageRegister';
import MobileSingleImageRegister from '../../components/common/MobileSingleImageRegister';
import DisplayStyles from '../../../styles/common/displayMode';
import { fetchGetUrl, fetchAsyncGetToken, fetchCredStart, fetchCredEnd, fetchGetInfoMessages, fetchGetErrorMessages } from '../appSlice';
import { fetchResetValidation, fetchAsyncPostAlbumValidation, selectAlbumValidation, fetchAsyncPostAlbum } from './albumSlice';
import { Formik } from "formik";
import * as Yup from "yup";
import { AppDispatch } from '../../../stores/store';
import Loading from '../../components/common/Loading';
import { FORMIK_RALBUM } from '../../types/albumsTypes';

const AlbumRegister: React.FC = () => {
    const displayStyles = DisplayStyles();
    const history = useHistory();
    const { id, name } = useParams<{ id: string, name: string }>();
    const [file, setFile] = useState<File | null>(null);
    const [disabled, setDisabled] = useState(false);
    // redux
    const dispatch: AppDispatch = useDispatch();
    const validation = useSelector(selectAlbumValidation);

    useEffect(() => {
        dispatch(fetchResetValidation({
            errors: {
                name: [''],
                image_file: [''],
                host_user_id: ['']
            },
            validate_status: '',
        }));
        dispatch(fetchGetUrl(history.location.pathname));
    }, [dispatch]);

    /**
     * 画像情報の取得用コールバック関数
     */
    const handleSetFile = (props: File | null) => {
        if(props) setFile(props);
    }

    /**
     * フォームデータ
     */
    const initialValues: FORMIK_RALBUM = {
        name: "", 
        group_id: +id,
        image_file: null,
        host_user_id: +localStorage.loginId
    }

    return (
        <div id="album_register">

            <Formik
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
                    // アルバム登録処理
                    values.image_file = file;
                    // バリデーションチェック
                    const avalidateRes = await dispatch(fetchAsyncPostAlbumValidation(values));
                    if(fetchAsyncPostAlbumValidation.fulfilled.match(avalidateRes)) {
                        if(!avalidateRes.payload.validate_status) {
                            dispatch(fetchGetErrorMessages('登録内容に不備があります'));
                            await dispatch(fetchCredEnd());
                            setDisabled(false);
                            return;
                        }
                    }
                    
                    const ralbumRes = await dispatch(fetchAsyncPostAlbum(values));
                    if(fetchAsyncPostAlbum.fulfilled.match(ralbumRes)) {
                        ralbumRes.payload.info_message ? 
                            dispatch(fetchGetInfoMessages(ralbumRes.payload.info_message))
                        :
                            dispatch(fetchGetErrorMessages(ralbumRes.payload.error_message))

                        if(ralbumRes.payload.info_message) history.push(`/groups/${name}/${id}`);
                    }
                    await dispatch(fetchCredEnd());
                    setDisabled(false);
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                             .required("※アルバム名の入力は必須です")
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
                                                    Album Register
                                                </Typography>
                                            }
                                            className="header">
                                        </CardHeader>
                                        <CardContent>
                                            <div className="c_labelarea"><span className="c_label">グループ名</span></div>
                                            <Typography className="c_typography">{name}</Typography>
                                            <div className="c_labelarea"><span className="c_label">アルバム名</span></div>
                                            <Input 
                                                name="name" 
                                                placeholder="test album" 
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

                                            <div className="c_labelarea"><span className="c_label">サムネイル画像</span></div>
                                            <div className="c_imagearea">
                                                <SingleImageRegister data={null} callback={handleSetFile} />
                                            </div>
                                            {
                                                disabled ? 
                                                    <Button className="c_disabled_button small" disabled={disabled}>
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
                                                    Album Register
                                                </Typography>
                                            }
                                            className="header">
                                        </CardHeader>
                                        <CardContent>
                                            <div className="c_labelarea"><span className="c_label">グループ名</span></div>
                                            <Typography className="c_typography">{name}</Typography>
                                            <div className="c_labelarea"><span className="c_label">アルバム名</span></div>
                                            <Input 
                                                name="name" 
                                                placeholder="test album" 
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
                                            <div className="c_labelarea"><span className="c_label">サムネイル画像</span></div>
                                            <div className="c_imagearea">
                                                <MobileSingleImageRegister data={null} callback={handleSetFile} />
                                            </div>
                                            {
                                                disabled ? 
                                                    <Button className="c_disabled_button small" disabled={disabled}>
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

export default AlbumRegister
