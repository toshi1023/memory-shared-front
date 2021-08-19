import React from 'react';
import '../../../styles/groups/groups.scss';
import { Grid, Theme, makeStyles, createStyles,Typography, Card, CardHeader, CardContent, Input, Radio, Button } from '@material-ui/core';
import SingleImageRegister from '../../components/common/SingleImageRegister';
import DisplayStyles from '../../../styles/common/displayMode';

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

const GroupRegister: React.FC = () => {
    const [selectedValue, setSelectedValue] = React.useState('公開');
    const classes = useStyles();
    const displayStyles = DisplayStyles();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <div id="group_register">

            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                <Grid container justify="center">
                    <Grid item sm={6} lg={4}>
                        <Card className="card">
                            <CardHeader 
                                title={
                                    <Typography className="header_title">
                                        Group Register
                                    </Typography>
                                }
                                className="header">
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="c_labelarea"><span className="c_label">グループ名</span></div>
                                    <Input name="name" placeholder="test group" className="c_textfield" />
                                    <div className="c_labelarea"><span className="c_label">紹介文</span></div>
                                    <Input name="description" placeholder="ここに紹介文を記載してください。" className="c_textfield" />
                                    <div className="c_labelarea"><span className="c_label">公開フラグ</span></div>
                                    <div className="c_radioarea">
                                        <Radio
                                            checked={selectedValue === '公開'}
                                            onChange={handleChange}
                                            value='公開'
                                            name="private_flg"
                                            classes={{root: classes.radio, checked: classes.checked}}
                                        />
                                        <span className="glabel">公開</span>
                                        <Radio
                                            checked={selectedValue === '非公開'}
                                            onChange={handleChange}
                                            value='非公開'
                                            name="private_flg"
                                        />
                                        <span className="glabel">非公開</span>
                                    </div>
                                    <div className="c_labelarea"><span className="c_label">サムネイル画像</span></div>
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

            {/* スマホ版 */}
            <div className={displayStyles.sectionMobile}>
                <Grid container justify="center">
                    <Grid item xs={11}>
                        <Card className="card">
                            <CardHeader 
                                title={
                                    <Typography className="header_title">
                                        Group Register
                                    </Typography>
                                }
                                className="header">
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="c_labelarea"><span className="c_label">グループ名</span></div>
                                    <Input name="name" placeholder="test group" className="c_textfield" />
                                    <div className="c_labelarea"><span className="c_label">紹介文</span></div>
                                    <Input name="description" placeholder="ここに紹介文を記載してください。" className="c_textfield" />
                                    <div className="c_labelarea"><span className="c_label">公開フラグ</span></div>
                                    <div className="c_radioarea">
                                        <Radio
                                            checked={selectedValue === '公開'}
                                            onChange={handleChange}
                                            value='公開'
                                            name="private_flg"
                                            classes={{root: classes.radio, checked: classes.checked}}
                                        />
                                        <span className="glabel">公開</span>
                                        <Radio
                                            checked={selectedValue === '非公開'}
                                            onChange={handleChange}
                                            value='非公開'
                                            name="private_flg"
                                        />
                                        <span className="glabel">非公開</span>
                                    </div>
                                    <div className="c_labelarea"><span className="c_label">サムネイル画像</span></div>
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
            
        </div>
    )
}

export default GroupRegister
