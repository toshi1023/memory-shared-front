import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import '../../../styles/users/users.scss';
import { fetchGetErrorMessages, fetchGetUrl } from '../appSlice';
import { fetchAsyncGetEditUser, selectEditUser } from './userSlice';
import { 
    Grid, Theme, makeStyles, createStyles,Typography, Card, CardHeader, 
    CardContent, Input, Radio, Button, TextField
} from '@material-ui/core';
import SingleImageRegister from '../../components/common/SingleImageRegister';
import DisplayStyles from '../../../styles/common/displayMode';
import { AppDispatch } from '../../../stores/store';

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
    // redux
    const dispatch: AppDispatch = useDispatch();
    const edituser = useSelector(selectEditUser);
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

            dispatch(fetchGetUrl(history.location.pathname));
        }
        renderUserEditer();
    }, [dispatch]);

    useEffect(() => {
        setSelectedValue(edituser.gender);
    }, [edituser]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(+event.target.value);
    };
    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue2(+event.target.value);
    };

    return (
        <div id="user_editer">

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
                                <form>
                                    <div className="c_labelarea"><span className="c_label">ユーザーネーム</span></div>
                                    <Input placeholder="test user" className="c_textfield" inputProps={{ 'name': 'name' }} value={edituser.name} />
                                    <div className="c_labelarea"><span className="c_label">メールアドレス</span></div>
                                    <Input placeholder="test@xxx.co.jp" className="c_textfield" inputProps={{ 'name': 'email' }} value={edituser.email} />

                                    <div className="c_labelarea"><span className="c_label">パスワード変更</span></div>
                                    <div className="c_radioarea">
                                        <Radio
                                            checked={selectedValue2 === 0}
                                            onChange={handleChange2}
                                            value={0}
                                            classes={{root: classes.radio, checked: classes.checked}}
                                        />
                                        <span className="glabel">変更する</span>
                                        <Radio
                                            checked={selectedValue2 === 1}
                                            onChange={handleChange2}
                                            value={1}
                                        />
                                        <span className="glabel">変更しない</span>
                                    </div>
                                    {
                                        !selectedValue2 ?
                                            <>
                                                <div className="c_labelarea"><span className="c_label">パスワード</span></div>
                                                <Input className="c_textfield" inputProps={{ 'name': 'password', 'type': 'password' }} />
                                                <div className="c_labelarea"><span className="c_label">パスワード(確認)</span></div>
                                                <Input className="c_textfield" inputProps={{ 'name': 'password_confirm', 'type': 'password' }} />
                                            </>
                                        :
                                            ''
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

                                    <div className="c_labelarea"><span className="c_label">趣味</span></div>
                                    <Input placeholder="スポーツ観戦...etc" className="c_textfield" inputProps={{ 'name': 'hobby' }} value={edituser.hobby} />

                                    <div className="c_labelarea"><span className="c_label">紹介文</span></div>
                                    <TextField
                                        name="description"
                                        className="c_textfield"
                                        multiline
                                        rows={10}
                                        placeholder="ここに紹介文を記載してください"
                                        variant="outlined"
                                        value={edituser.description}
                                    />

                                    <div className="c_labelarea"><span className="c_label">プロフィール画像</span></div>
                                    <div className="c_imagearea">
                                        <SingleImageRegister />
                                    </div>

                                    <Button className="c_button small">登録</Button>
                                </form>
                            </CardContent>
                        </Card>
                        <Button variant="contained" color="secondary" className="delete_button">退会する</Button>
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
                                <form>
                                    <div className="c_labelarea"><span className="c_label">ユーザーネーム</span></div>
                                    <Input placeholder="test user" className="c_textfield" inputProps={{ 'name': 'name' }} value={edituser.name} />
                                    <div className="c_labelarea"><span className="c_label">メールアドレス</span></div>
                                    <Input placeholder="test@xxx.co.jp" className="c_textfield" inputProps={{ 'name': 'email' }} value={edituser.email} />

                                    <div className="c_labelarea"><span className="c_label">パスワード変更</span></div>
                                    <div className="c_radioarea">
                                        <Radio
                                            checked={selectedValue2 === 0}
                                            onChange={handleChange2}
                                            value={0}
                                            classes={{root: classes.radio, checked: classes.checked}}
                                        />
                                        <span className="glabel">変更する</span>
                                        <Radio
                                            checked={selectedValue2 === 1}
                                            onChange={handleChange2}
                                            value={1}
                                        />
                                        <span className="glabel">変更しない</span>
                                    </div>
                                    {
                                        !selectedValue2 ?
                                            <>
                                                <div className="c_labelarea"><span className="c_label">パスワード</span></div>
                                                <Input className="c_textfield" inputProps={{ 'name': 'password', 'type': 'password' }} />
                                                <div className="c_labelarea"><span className="c_label">パスワード(確認)</span></div>
                                                <Input className="c_textfield" inputProps={{ 'name': 'password_confirm', 'type': 'password' }} />
                                            </>
                                        :
                                            ''
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

                                    <div className="c_labelarea"><span className="c_label">趣味</span></div>
                                    <Input placeholder="スポーツ観戦...etc" className="c_textfield" inputProps={{ 'name': 'hobby' }} value={edituser.hobby} />

                                    <div className="c_labelarea"><span className="c_label">紹介文</span></div>
                                    <TextField
                                        name="description"
                                        className="c_textfield"
                                        multiline
                                        rows={10}
                                        placeholder="ここに紹介文を記載してください"
                                        variant="outlined"
                                        value={edituser.description}
                                    />

                                    <div className="c_labelarea"><span className="c_label">プロフィール画像</span></div>
                                    <div className="c_imagearea">
                                        <SingleImageRegister />
                                    </div>

                                    <Button className="c_button small">更新</Button>
                                </form>
                            </CardContent>
                        </Card>
                        <Button variant="contained" color="secondary" className="delete_button">退会する</Button>
                    </Grid>
                </Grid>
            </div>
            
        </div>
    )
}

export default UserEditer
