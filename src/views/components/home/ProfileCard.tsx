import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { PROFILE_CARD } from "../../types/homeTypes";

const useStyles = makeStyles({
  root: {
    boxShadow: '1px 1.3px rgb(168, 168, 168)'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  editButton: {
    fontWeight: 'bold',
    color: 'rgb(168, 168, 168)'
  }
});

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
        <Typography className={classes.pos} color="textSecondary">
            {props.data.image_file}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.data.name}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.data.hobby}
        </Typography>
        {
          props.data.gender ? 
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                男性
            </Typography>
          :
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                女性
            </Typography>
        }
        <Typography variant="h6" component="h4">
            {props.data.email}
        </Typography>
        <Typography variant="body2" component="p">
            {props.data.description}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" className={classes.editButton}>プロフィールを編集する</Button>
      </CardActions>
    </Card>
  );
}

export default ProfileCard;