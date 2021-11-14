import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ComponentStyles from '../../../styles/common/componentStyle';
import _ from 'lodash';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { fetchGetErrorMessages } from '../../pages/appSlice';
import { fetchAsyncGetAlbums, selectGroupPages } from '../../pages/groups/groupSlice';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { ALBUM_LIST_DATA } from '../../types/groupsTypes';
import BasePagination from '../common/BasePagination';
import { AppDispatch } from '../../../stores/store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 400,
            '&:hover': {
                background: "rgb(209, 208, 208)",
            },
            marginBottom: theme.spacing(2)
        }
    })
);

/**
 * アルバム一覧表示用関数
 * @param props 
 * @returns 
 */
const AlbumListData: React.FC<ALBUM_LIST_DATA> = (props) => {
    const classes = useStyles();
    const componentStyles = ComponentStyles();
    const history = useHistory();
    const { id, name } = useParams<{ id: string, name: string }>();
    // redux
    const dispatch: AppDispatch = useDispatch();
    const groupPages = useSelector(selectGroupPages);

    /**
     * データの取得(ページネーション処理)
     * @param page 
     */
    const handleGetData = async (page: number) => {
        // アルバム情報取得
        const albumsRes = await dispatch(fetchAsyncGetAlbums({id: +id, page: page}));
        if(fetchAsyncGetAlbums.fulfilled.match(albumsRes) && albumsRes.payload.error_message) {
            dispatch(fetchGetErrorMessages(albumsRes.payload.error_message));
            return;
        }
    }

    return (
        <div>
            <Grid container spacing={2}>
            {_.map(props.data, value => (
                <Grid item xs={6} sm={6} lg={4} key={value.id}>
                    <Card className={classes.root} onClick={() => history.push(`/groups/${name}/${id}/albums/${value.name}/${value.id}`)}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                className={componentStyles.imageSize}
                                image={value.image_url}
                                title={value.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="h4">
                                    {value.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
            </Grid>
            {
                props.data.length === 0 ? 
                    ''
                :
                    <BasePagination count={groupPages.a_lastpage} callback={handleGetData} />
            }
        </div>
    )
}

export default AlbumListData
