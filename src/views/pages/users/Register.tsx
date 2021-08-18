import React from 'react';
import '../../../styles/users/users.scss';
import { Grid, Theme, makeStyles, createStyles,Typography, Card, CardHeader, CardContent, Input, Radio, Button } from '@material-ui/core';
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
                <Grid item xs={11} sm={6} lg={4}>
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
                                <div className="c_labelarea"><span className="c_label">ユーザーネーム</span></div>
                                <Input placeholder="test user" className="c_textfield" />
                                <div className="c_labelarea"><span className="c_label">メールアドレス</span></div>
                                <Input placeholder="test@xxx.co.jp" className="c_textfield" />
                                <div className="c_labelarea"><span className="c_label">パスワード</span></div>
                                <Input className="c_textfield" inputProps={{ 'type': 'password' }} />
                                <div className="c_labelarea"><span className="c_label">パスワード(確認)</span></div>
                                <Input className="c_textfield" inputProps={{ 'type': 'password' }} />
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
                                <Button className="c_button small">登録</Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default UserRegister
