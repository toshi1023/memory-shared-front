import React from 'react';
import ComponentStyles from '../../../styles/common/componentStyle';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { fetchGetErrorMessages } from '../../pages/appSlice';
import { fetchAsyncGetParticipant } from '../../pages/home/homeSlice';
import { GROUP_LIST } from '../../types/homeTypes';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BasePagination from '../common/BasePagination';
import { AppDispatch } from '../../../stores/store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 300,
            '&:hover': {
                background: "rgb(209, 208, 208)",
            },
            marginBottom: theme.spacing(2)
        }
    })
);

const MyGroupList: React.FC<GROUP_LIST> = (props) => {
  const classes = useStyles();
  const componentStyles = ComponentStyles();
  const history = useHistory();
  // redux
  const dispatch: AppDispatch = useDispatch();

  /**
   * データの取得
   * @param page 
   */
  const handleGetData = async (page: number) => {
    // 参加中グループ情報を取得
    const participantRes = await dispatch(fetchAsyncGetParticipant({ id: +localStorage.loginId, page: page }));
    if(fetchAsyncGetParticipant.fulfilled.match(participantRes) && participantRes.payload.error_message) {
        dispatch(fetchGetErrorMessages(participantRes.payload.error_message));
        return;
    }
  }

  return (
      <div>
          <Grid container spacing={2}>
            {_.map(props.data, value => (
                <Grid item xs={12} sm={6} lg={4} key={value.id} onClick={() => history.push(`/groups/${value.name}/${value.id}`)}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                // className={classes.media}
                                className={componentStyles.imageSize}
                                image={value.image_url}
                                title={value.image_file}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="h4">
                                    {value.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" className={componentStyles.albums}>
                                    {value.albums ? value.albums.length : 0}<span className={componentStyles.unit}>個のアルバムを作成中</span>
                                </Typography>
                                <Typography component="p" className={componentStyles.participants}>
                                    {value.group_histories ? value.group_histories.length : 0}<span className={componentStyles.unit}>人参加中</span>
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            {
                                value.private_flg ? 
                                    <Typography className={componentStyles.privateFlgTrue}>
                                        非公開
                                    </Typography>
                                :
                                    <Typography className={componentStyles.privateFlgFalse}>
                                        公開
                                    </Typography>
                            }
                        </CardActions>
                    </Card>
                </Grid>
            ))}
            </Grid>
            <BasePagination count={props.page.last_page} callback={handleGetData} />
      </div>
  );
}

export default MyGroupList