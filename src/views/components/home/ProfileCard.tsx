import React from 'react';
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
    profileAvatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      marginBottom: theme.spacing(1),
      display: 'inline-block',
    },
    title: {
      fontSize: 16,
      textAlign: 'right'
    },
    content: {
      fontSize: 18,
      textAlign: 'left'
    },
    description: {
      fontSize: 16,
      textAlign: 'left'
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
const ProfileCard: React.FC<PROFILE_CARD> = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Avatar src={props.data.image_file} className={classes.profileAvatar} />
        <Grid container spacing={1}>

          <Grid item xs={4} sm={3}>
            <Typography className={classes.title}>
              ユーザ名 :
            </Typography>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Typography className={classes.content} color="textSecondary" gutterBottom>
              {props.data.name}
            </Typography>
          </Grid>

          <Grid item xs={4} sm={3}>
            <Typography className={classes.title}>
              趣味 :
            </Typography>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Typography className={classes.content} color="textSecondary" gutterBottom>
              {props.data.hobby}
            </Typography>
          </Grid>
          
          <Grid item xs={4} sm={3}>
            <Typography className={classes.title}>
              性別 :
            </Typography>
          </Grid>
          <Grid item xs={8} sm={9}>
            {
              props.data.gender ? 
                <Typography className={classes.content} color="textSecondary" gutterBottom>
                    男性
                </Typography>
              :
                <Typography className={classes.content} color="textSecondary" gutterBottom>
                    女性
                </Typography>
            }
          </Grid>

          <Grid item xs={4} sm={3}>
            <Typography className={classes.title}>
              自己紹介 :
            </Typography>
          </Grid>
          <Grid item xs={8} sm={9}>
            <Typography className={classes.description} color="textSecondary" gutterBottom>
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

export default ProfileCard;