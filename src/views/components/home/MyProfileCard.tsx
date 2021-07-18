import React from 'react';
import ComponentStyles from '../../../styles/common/componentStyle';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { PROFILE_CARD } from "../../types/homeTypes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      boxShadow: '1px 1.3px rgb(168, 168, 168)'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    pos: {
      marginBottom: 12,
    },
    editButton: {
      fontWeight: 'bold',
      color: 'rgb(168, 168, 168)'
    }
}));

/**
 * プロフィール表示用カード
 * @param props 
 * @returns 
 */
const MyProfileCard: React.FC<PROFILE_CARD> = (props) => {
  const classes = useStyles();
  const componentStyles = ComponentStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={1}>

          <Grid item xs={4}>
            <Avatar src={props.data.image_file} className={componentStyles.imageAvatar} />
          </Grid>
          <Grid item xs={8}>
            <Grid container>

              <Grid item xs={4}>
                <Typography className={componentStyles.title}>
                  ユーザ名 :
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography className={componentStyles.content} color="textSecondary" gutterBottom>
                  {props.data.name}
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography className={componentStyles.title}>
                  趣味 :
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography className={componentStyles.content} color="textSecondary" gutterBottom>
                  {props.data.hobby}
                </Typography>
              </Grid>
              
              <Grid item xs={4}>
                <Typography className={componentStyles.title}>
                  性別 :
                </Typography>
              </Grid>
              <Grid item xs={8}>
                {
                  props.data.gender ? 
                    <Typography className={componentStyles.content} color="textSecondary" gutterBottom>
                        男性
                    </Typography>
                  :
                    <Typography className={componentStyles.content} color="textSecondary" gutterBottom>
                        女性
                    </Typography>
                }
              </Grid>
            
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Typography className={componentStyles.description} color="textSecondary" gutterBottom>
              {props.data.description}
            </Typography>
          </Grid>
          
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" className={classes.editButton}>プロフィールを編集する</Button>
      </CardActions>
    </Card>
  );
}

export default MyProfileCard;