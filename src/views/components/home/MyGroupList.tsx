import React from 'react';
import ComponentStyles from '../../../styles/common/componentStyle';
import { useHistory } from 'react-router-dom';
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
            },
            marginBottom: theme.spacing(2)
        },
        media: {
            height: 130,
        }
    })
);

const MyGroupList: React.FC<GROUP_LIST> = (props) => {
  const classes = useStyles();
  const componentStyles = ComponentStyles();
  const history = useHistory();

  return (
      <div>
          <Grid container spacing={2}>
            {_.map(props.data, value => (
                <Grid item xs={12} sm={6} lg={4} key={value.id} onClick={() => history.push(`/groups/${value.name}/${value.id}`)}>
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
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
      </div>
  );
}

export default MyGroupList