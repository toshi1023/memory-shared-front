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

const GroupEditer: React.FC = () => {
    const [selectedValue, setSelectedValue] = React.useState('公開');
    const [selectedValue2, setSelectedValue2] = React.useState('する');
    const classes = useStyles();
    const displayStyles = DisplayStyles();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };
    const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue2(event.target.value);
    };

    return (
        <div id="group_editer">

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

                                    {
                                        selectedValue === '公開' ? 
                                            <>
                                                <div className="c_labelarea"><span className="c_label">歓迎リストに追加する</span></div>
                                                <div className="c_radioarea">
                                                    <Radio
                                                        checked={selectedValue2 === 'する'}
                                                        onChange={handleChange2}
                                                        value='する'
                                                        name="welcome_flg"
                                                        classes={{root: classes.radio, checked: classes.checked}}
                                                    />
                                                    <span className="glabel">する</span>
                                                    <Radio
                                                        checked={selectedValue2 === 'しない'}
                                                        onChange={handleChange2}
                                                        value='しない'
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
                                        <SingleImageRegister />
                                    </div>

                                    <Button className="c_button small">更新</Button>
                                </form>
                            </CardContent>
                        </Card>
                        <Button variant="contained" color="secondary" className="delete_button">グループを削除する</Button>
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
                                    
                                    {
                                        selectedValue === '公開' ? 
                                            <>
                                                <div className="c_labelarea"><span className="c_label">歓迎リストに追加する</span></div>
                                                <div className="c_radioarea">
                                                    <Radio
                                                        checked={selectedValue2 === 'する'}
                                                        onChange={handleChange2}
                                                        value='する'
                                                        name="welcome_flg"
                                                        classes={{root: classes.radio, checked: classes.checked}}
                                                    />
                                                    <span className="glabel">する</span>
                                                    <Radio
                                                        checked={selectedValue2 === 'しない'}
                                                        onChange={handleChange2}
                                                        value='しない'
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
                                        <SingleImageRegister />
                                    </div>
                                    <Button className="c_button small">更新</Button>
                                </form>
                            </CardContent>
                        </Card>
                        <Button variant="contained" color="secondary" className="delete_button">グループを削除する</Button>
                    </Grid>
                </Grid>
            </div>
            
        </div>
    )
}

export default GroupEditer