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


/**
 * 画像プレビュー用の型定義
 */
type MyFile = {
    data: File; 
    preview: string;
    width: number;
    height: number;
};

/**
 * アルバムに保存する画像アップロード用関数
 * @returns 
 */
const ImageRegister: React.FC = () => {
    const componentStyles = ComponentStyles();
    const history = useHistory();
    const { id, name, albumname, albumid } = useParams<{ id: string, name: string, albumname: string, albumid: string }>();
    // FileUpload関連
    const [files, setFiles] = useState<MyFile[]>([]);
    const [disabled, setDisabled] = useState(false);
    // Dropzoneの設定
    const acceptFile = 'image/*';
    const maxFileSize = 1048576;
    // redux
    const dispatch: AppDispatch = useDispatch();

    /**
     * 画像読み込み用の非同期処理
     * @param file 
     * @returns 
     */
    const loadImage = (file: File) => {
        return new Promise((resolve: (val: HTMLImageElement) => void, reject) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.onerror = (e) => reject(e);
          img.src = URL.createObjectURL(file);
        });
    };

   /**
    * ドロップした時の処理
    */
    const onDrop = useCallback((acceptedFiles: File[]) => {
        let obj: MyFile[] = new Array();
        // previewの追加
        acceptedFiles.map(async (file) => {
            const res = await loadImage(file).catch(e => {
              console.log('onload error', e);
            });
            if(res instanceof HTMLImageElement) {
              // こうしないとfilesが常に1件しかデータを持たないため
              obj.push({
                data: file, 
                preview: URL.createObjectURL(file),
                width: res.width,
                height: res.height
              });
              setFiles([...files, ...obj]);
            } 
        })
    }, []);

    // Dropzone
    const { getRootProps, getInputProps, isDragActive }
    = useDropzone({ onDrop, accept: acceptFile, minSize: 0, maxSize: maxFileSize });

    /**
     * 画像アップロード処理
     */
    const handleSubmit = async () => {
        // ボタン非活性化
        setDisabled(true);
        // 複数のファイルアップロードをPromise.allで並列に実行する
        const result = await Promise.all(files.map((file) => {
            const data = {
                user_id: +localStorage.loginId, 
                group_id: +id,
                album_id: +albumid,
                image_file: file.data
            }
            dispatch(fetchAsyncPostUserImage(data));
        }));
        console.log(files);

        // ローディングを終了し、リストを空に
        setDisabled(false);
        setFiles([]);
    }

    // サムネイルの作成
    const thumbs = files.map((file, index) => (
        <ImageListItem key={file.preview} cols={file.width > 1500 ? 2 : 1} rows={1}>
            <img src={file.preview} alt={file.data.name} />
        </ImageListItem>
    ));

    return (
        <div id="image_register">
            <Grid container className="container" spacing={3} justify="center">
                <Grid item xs={11} sm={9} md={8} lg={6}>
                    <Card variant="outlined" elevation={3} className="card">
                        <CardHeader 
                            title={
                                <Typography className="header_title">
                                    Image Register
                                </Typography>
                            }
                            className="header">
                        </CardHeader>
                        <CardContent>
                            <Paper className="dropzone" {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Typography className="drag-drop-info">ファイルをドロップ</Typography>
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
                            <aside className="thumbs-container">
                              <Hidden smDown>
                                <Grid item md={12}>
                                  <ImageList cellHeight={200} className="gridlist" cols={3}>
                                  {thumbs}
                                  </ImageList>
                                </Grid>
                              </Hidden>
                              <Hidden mdUp>
                                <Grid item sm={12}>
                                  <ImageList cellHeight={200} className="gridlist" cols={2}>
                                  {thumbs}
                                  </ImageList>
                                </Grid>
                              </Hidden>
                            </aside>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default ImageRegister
