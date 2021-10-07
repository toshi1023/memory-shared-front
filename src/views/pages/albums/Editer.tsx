import React, { useState } from 'react';
import '../../../styles/albums/albums.scss';
import { useHistory, useParams } from "react-router-dom";
import { Grid, Typography, Card, CardHeader, CardContent, Input, Button } from '@material-ui/core';
import SingleImageRegister from '../../components/common/SingleImageRegister';
import DisplayStyles from '../../../styles/common/displayMode';

const AlbumEditer: React.FC = () => {
    const displayStyles = DisplayStyles();
    const history = useHistory();
    const { id, name, albumname, albumid } = useParams<{ id: string, name: string, albumname: string, albumid: string }>();
    const [file, setFile] = useState<File | null>(null);

    /**
     * 画像情報の取得用コールバック関数
     */
    const handleSetFile = (props: File | null) => {
        if(props) setFile(props);
    }

    return (
        <div id="album_editer">

            {/* PC版 & iPad版 */}
            <div className={displayStyles.sectionDesktop}>
                <Grid container justify="center">
                    <Grid item sm={6} lg={4}>
                        <Card className="card">
                            <CardHeader 
                                title={
                                    <Typography className="header_title">
                                        Album Editer
                                    </Typography>
                                }
                                className="header">
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="c_labelarea"><span className="c_label">グループ名</span></div>
                                    <Typography className="c_typography">{name}</Typography>
                                    <div className="c_labelarea"><span className="c_label">アルバム名</span></div>
                                    <Input name="name" placeholder="test album" className="c_textfield" />
                                    <div className="c_labelarea"><span className="c_label">サムネイル画像</span></div>
                                    <div className="c_imagearea">
                                        <SingleImageRegister data={null} callback={handleSetFile} />
                                    </div>
                                    <Button className="c_button small">更新</Button>
                                </form>
                            </CardContent>
                        </Card>
                        <Button variant="contained" color="secondary" className="delete_button">アルバムを削除する</Button>
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
                                        Album Editer
                                    </Typography>
                                }
                                className="header">
                            </CardHeader>
                            <CardContent>
                                <form>
                                    <div className="c_labelarea"><span className="c_label">グループ名</span></div>
                                    <Typography className="c_typography">{name}</Typography>
                                    <div className="c_labelarea"><span className="c_label">アルバム名</span></div>
                                    <Input name="name" placeholder="test album" className="c_textfield" />
                                    <div className="c_labelarea"><span className="c_label">サムネイル画像</span></div>
                                    <div className="c_imagearea">
                                        <SingleImageRegister data={null} callback={handleSetFile} />
                                    </div>
                                    <Button className="c_button small">更新</Button>
                                </form>
                            </CardContent>
                        </Card>
                        <Button variant="contained" color="secondary" className="delete_button">アルバムを削除する</Button>
                    </Grid>
                </Grid>
            </div>

        </div>
    )
}

export default AlbumEditer