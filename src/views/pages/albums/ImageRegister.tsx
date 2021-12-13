import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import '../../../styles/common/common.scss';
import '../../../styles/albums/albums.scss';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography, Card, CardHeader, CardContent, Paper, Button, ImageList, ImageListItem } from '@material-ui/core';
import { fetchGetUrl, fetchAsyncGetToken, fetchCredStart, fetchCredEnd, fetchGetInfoMessages, fetchGetErrorMessages } from '../appSlice';
import { fetchAsyncPostUserImage } from './albumSlice';
import { AppDispatch } from '../../../stores/store';
import Loading from '../../components/common/Loading';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useDropzone } from 'react-dropzone';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      '& > *': {
        margin: theme.spacing(3),
      },
    },
    dropzone: {
      width: "100%",
      height: 200,
      boxSizing: "border-box",
      borderWidth: 2,
      borderColor: "#666666",
      borderStyle: "dashed",
      borderRadius: 5,
      verticalAlign: "top",
      marginRight: "2%",
    },
    thumbsContainer: {
      marginTop: 16,
    },
    gridList: {
      width: "100%",
      height: 450,
      transform: 'translateZ(0)',
    },
    titleBar: {
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
      color: 'white',
    },
    upButton: {
      color: "secondary",
      margin: theme.spacing(3),
    },
    circular: {
      textAlign: 'center',
    }
  }),
);

/**
 * 画像プレビュー用の型定義
 */
type MyFile = {
    data: File; 
    preview: string;
};

/**
 * アルバムに保存する画像アップロード用関数
 * @returns 
 */
const ImageRegister: React.FC = () => {
    const classes = useStyles();
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
    * ドロップした時の処理
    */
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // previewの追加
        setFiles(acceptedFiles.map(
        file => Object.assign({
            data: file, 
            preview: URL.createObjectURL(file)
        })));

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

        console.log("Upload result");
        console.log(result);

        // ローディングを終了し、リストを空に
        setDisabled(false);
        setFiles([]);
    }

    // タイルを敷き詰められるように、一部画像のサイズは大きくする
    const tile_cols = 3;
    let tile_featured: number[] | null[] = [];
    switch (files.length % tile_cols) {
      case 0:
        tile_featured = [];
        break;
      case 1:
        tile_featured = [0, files.length - 1];
        break;
      case 2:
        tile_featured = [0];
        break;
    }

    // サムネイルの作成
    const thumbs = files.map((file, index) => (
        <ImageListItem key={file.preview} cols={2} rows={1}>
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
                                    <Button className="c_disabled_button small" disabled={disabled} startIcon={<CloudUploadIcon />}>
                                        アップロード中<Loading />
                                    </Button>
                                :
                                    <Button onClick={handleSubmit} disabled={disabled} className="c_button small" startIcon={<CloudUploadIcon />}>
                                        アップロード
                                    </Button>
                            }
                            <aside className="thumbs-container">
                                <ImageList cellHeight={200} className="gridlist" cols={tile_cols}>
                                {thumbs}
                                </ImageList>
                            </aside>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}

export default ImageRegister
