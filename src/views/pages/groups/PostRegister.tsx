import React from 'react';
import '../../../styles/groups/groups.scss';
import { Grid, Typography, Card, CardHeader, CardContent, Input, Button } from '@material-ui/core';
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
                                    <Input name="name" placeholder="test group" className="c_textfield" />
                                    
                                    <div className="c_labelarea"><span className="c_label">投稿文</span></div>
                                    <Input name="content" placeholder="ここに投稿文を記載してください。" className="c_textfield" inputProps={{ 'type': 'textarea', 'cols': 10 }} />

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
                                    <Input name="name" placeholder="test group" className="c_textfield" />
                                    
                                    <div className="c_labelarea"><span className="c_label">紹介文</span></div>
                                    <Input name="description" placeholder="ここに紹介文を記載してください。" className="c_textfield" inputProps={{ 'type': 'textarea', 'cols': 10 }} />
                                    
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
