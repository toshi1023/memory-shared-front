import React from 'react';
import '../../../styles/users/users.scss';
import { Grid, Hidden, Typography, Card, CardHeader, CardContent, Input } from '@material-ui/core';
import SingleImageRegister from '../../components/common/SingleImageRegister';

const UserRegister: React.FC = () => {
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
                                <SingleImageRegister />
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
