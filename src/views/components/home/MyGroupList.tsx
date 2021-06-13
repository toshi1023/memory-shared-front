import React from 'react';
import ComponentStyles from '../../../styles/common/componentStyle';
import _ from 'lodash';
import { GROUP_LIST } from '../../types/homeTypes';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 300,
            '&:hover': {
                background: "rgb(209, 208, 208)",
            }
        },
        media: {
            height: 70,
        }
    })
);

const MyGroupList: React.FC<GROUP_LIST> = (props) => {
  const classes = useStyles();
  const componentStyles = ComponentStyles();

  return (
      <div>
          <Grid container spacing={1}>
            {_.map(props.data, value => (
                    <Grid item xs={12} sm={6} md={4} key={value.id}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h4">
                                        {value.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" className={componentStyles.albums}>
                                        {value.album_count}<span className={componentStyles.unit}>個のアルバムを作成中</span>
                                    </Typography>
                                    <Typography component="p" className={componentStyles.participants}>
                                        {value.participants}<span className={componentStyles.unit}>人参加中</span>
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
      </div>
  );
}

export default MyGroupList