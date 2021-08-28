import React from 'react';
import '../../../styles/groups/groups.scss';
import { Grid, Typography, Card, CardHeader, CardContent, Input, TextField, Button } from '@material-ui/core';
import DisplayStyles from '../../../styles/common/displayMode';

const PostRegister: React.FC = () => {
    const displayStyles = DisplayStyles();

    return (
        <div id="post_register">

            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                <Grid container justify="center">
                    <Grid item sm={6} lg={4}>
                        <Card className="card">
                            <CardHeader 
                                title={
                                    <Typography className="header_title">
                                        Post Register
                                    </Typography>
                                }
                                className="header">
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="c_labelarea"><span className="c_label">グループ名</span></div>
                                    <Typography className="c_typography">test group</Typography>
                                    
                                    <div className="c_labelarea"><span className="c_label">投稿文</span></div>
                                    <TextField
                                        name="content"
                                        className="c_textfield"
                                        multiline
                                        rows={10}
                                        placeholder="ここに投稿内容を記載してください"
                                        variant="outlined"
                                    />

                                    <Button className="c_button small">投稿</Button>
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
                                        Post Register
                                    </Typography>
                                }
                                className="header">
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="c_labelarea"><span className="c_label">グループ名</span></div>
                                    <Typography className="c_typography">test group</Typography>
                                    
                                    <div className="c_labelarea"><span className="c_label">紹介文</span></div>
                                    <TextField
                                        name="content"
                                        className="c_textfield"
                                        multiline
                                        rows={10}
                                        placeholder="ここに投稿内容を記載してください"
                                        variant="outlined"
                                    />
                                    
                                    <Button className="c_button small">投稿</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
            
        </div>
    )
}

export default PostRegister
