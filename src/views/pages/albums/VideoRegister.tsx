import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import '../../../styles/common/common.scss';
import '../../../styles/albums/albums.scss';
import ComponentStyles from '../../../styles/common/componentStyle';
import { Grid, Hidden, Typography, Card, CardHeader, CardContent, Paper, Button, ImageList, ImageListItem } from '@material-ui/core';
import { fetchGetUrl, fetchAsyncGetToken, fetchCredStart, fetchCredEnd, fetchGetInfoMessages, fetchGetErrorMessages } from '../appSlice';
import { fetchAsyncPostUserImage } from './albumSlice';
import { AppDispatch } from '../../../stores/store';
import Loading from '../../components/common/Loading';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useDropzone } from 'react-dropzone';

const VideoRegister: React.FC = () => {
    const componentStyles = ComponentStyles();
    const history = useHistory();
    const { id, albumid } = useParams<{ id: string, albumid: string }>();
    // FileUpload関連
    const [files, setFiles] = useState<File[]>([]);
    const [disabled, setDisabled] = useState(false);
    // Dropzoneの設定
    const acceptFile = 'video/*';
    const maxFileSize = 209715200;  // 200MB
    // redux
    const dispatch: AppDispatch = useDispatch();

    /**
    * ドロップした時の処理
    */
    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles.map((file) => {
            return file
        }));
    }, []);

    // Dropzone
    const { getRootProps, getInputProps, isDragActive }
    = useDropzone({ onDrop, accept: acceptFile, minSize: 0, maxSize: maxFileSize });

    /**
     * 動画アップロード処理
     */
     const handleSubmit = async () => {
        // ボタン非活性化
        setDisabled(true);

        console.log(files);

        // ローディングを終了し、リストを空に
        setDisabled(false);
        setFiles([]);
    }

    // アップロードする動画の情報を記載
    const metaInfo = () => {
        return (
            files.length !== 0 ?
                <table className='meta-table'>
                    <thead>
                        <tr>
                            <th className='h-filename'>ファイル名</th>
                            <th className='h-filesize'>サイズ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            files.map(file => (
                                <tr key={file.name}>
                                    <td>{file.name}</td>
                                    <td>{Math.round(file.size / 1024 / 1024)} <span>MB</span></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            :
                ''
        )
    }

    return (
        <div id="video_register">
            <Grid container className="container" spacing={3} justify="center">
                <Grid item xs={11} sm={9} md={8} lg={6}>
                    <Card variant="outlined" elevation={3} className="card">
                        <CardHeader 
                            title={
                                <Typography className="header_title">
                                    Video Register
                                </Typography>
                            }
                            className="header">
                        </CardHeader>
                        <CardContent>
                            <Paper className="dropzone" {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Typography className="drag-drop-info">ファイルをドロップ</Typography>
                                <Button className="c_clear clear_button_place" onClick={(event) => {
                                    event.stopPropagation();
                                    setFiles([])}
                                }>
                                    クリア
                                </Button>
                            </Paper>
                            {
                                disabled ? 
                                    <Button className={componentStyles.disabledButton} disabled={disabled} startIcon={<CloudUploadIcon />}>
                                        アップロード中<Loading />
                                    </Button>
                                :
                                    <Button onClick={handleSubmit} disabled={files.length === 0} className={componentStyles.registerButton} startIcon={<CloudUploadIcon />}>
                                        アップロード
                                    </Button>
                            }
                            <aside className="metas-container">
                                {metaInfo()}
                            </aside>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default VideoRegister
