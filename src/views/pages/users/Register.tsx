import React from 'react';
import '../../../styles/users/users.scss';
import { Grid, Theme, makeStyles, createStyles,Typography, Card, CardHeader, CardContent, Input, Radio } from '@material-ui/core';
import SingleImageRegister from '../../components/common/SingleImageRegister';

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
    const [selectedValue, setSelectedValue] = React.useState('男性');
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div id="user_register">
            <Grid container justify="center">
                <Grid item xs={11} sm={6} md={4}>
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
                            <form>
                                <Input placeholder="ユーザーネーム" className="c_textfield" inputProps={{ 'aria-label': 'username' }} />
                                <Input placeholder="メールアドレス" className="c_textfield" inputProps={{ 'aria-label': 'email' }} />
                                <Input placeholder="パスワード" className="c_textfield" inputProps={{ 'aria-label': 'password' }} />
                                <Input placeholder="パスワード(確認)" className="c_textfield" inputProps={{ 'aria-label': 'password_confirm' }} />
                                <div className="c_labelarea"><span className="c_label">性別</span></div>
                                <div className="c_radioarea">
                                    <Radio
                                        checked={selectedValue === '男性'}
                                        onChange={handleChange}
                                        value='男性'
                                        name="gender"
                                        classes={{root: classes.radio, checked: classes.checked}}
                                    />
                                    <span className="glabel">男性</span>
                                    <Radio
                                        checked={selectedValue === '女性'}
                                        onChange={handleChange}
                                        value='女性'
                                        name="gender"
                                    />
                                    <span className="glabel">女性</span>
                                </div>
                                <div className="c_labelarea"><span className="c_label">プロフィール画像</span></div>
                                <div className="c_imagearea">
                                    <SingleImageRegister />
                                </div>
                                <button className="c_button small">登録</button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default UserRegister
