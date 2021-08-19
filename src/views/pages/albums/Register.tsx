import React from 'react';
import '../../../styles/albums/albums.scss';
import { Grid, Theme, makeStyles, createStyles,Typography, Card, CardHeader, CardContent, Input, Button } from '@material-ui/core';
import SingleImageRegister from '../../components/common/SingleImageRegister';
import DisplayStyles from '../../../styles/common/displayMode';

const AlbumRegister: React.FC = () => {
    const displayStyles = DisplayStyles();

    return (
        <div id="album_register">

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
                                <form>
                                    <div className="c_labelarea"><span className="c_label">アルバム名</span></div>
                                    <Input name="name" placeholder="test album" className="c_textfield" />
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
                                        Album Register
                                    </Typography>
                                }
                                className="header">
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="c_labelarea"><span className="c_label">アルバム名</span></div>
                                    <Input name="name" placeholder="test album" className="c_textfield" />
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

export default AlbumRegister
