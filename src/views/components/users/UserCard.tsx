import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import ComponentStyles from '../../../styles/common/componentStyle';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import MailIcon from '@material-ui/icons/Mail';
import GroupModal from './GroupModal';
import { USER_CARD } from '../../types/usersTypes';

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
    iconBackGround: {
      backgroundColor: 'rgb(126, 170, 252)'
    },
    inviteButton: {
      background: 'rgb(236, 234, 234)',
      color: 'rgb(145, 144, 144)',
      marginLeft: theme.spacing(1)
    }
}));

/**
 * ユーザのプロフィール表示用カード
 * @param props 
 * @returns 
 */
const UserCard: React.FC<USER_CARD> = (props) => {
  const classes = useStyles();
  const componentStyles = ComponentStyles();
  const history = useHistory();
  const { id, name } = useParams<{ id: string, name: string }>();
  const [open, setOpen] = useState(false);

  /**
   * モーダル表示制御用関数
   * @param value 
   */
  const handleOpen = (value: boolean) => {
      setOpen(value);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={4} md={3}>
            <Avatar src={props.data.image_url} className={componentStyles.imageAvatar} />
          </Grid>
          <Grid item xs={8} md={9}>
            <Grid container>
              <Grid item xs={4} md={3}>
                <Typography className={componentStyles.title}>
                  ユーザ名 :
                </Typography>
              </Grid>
              <Grid item xs={8} md={9}>
                <Typography className={componentStyles.content} color="textSecondary" gutterBottom>
                  {props.data.name}
                </Typography>
              </Grid>

              <Grid item xs={4} md={3}>
                <Typography className={componentStyles.title}>
                  性別 :
                </Typography>
              </Grid>
              <Grid item xs={8} md={9}>
                {
                  props.data.gender ? 
                    <Typography className={componentStyles.content} color="textSecondary" gutterBottom>
                        女性
                    </Typography>
                  :
                    <Typography className={componentStyles.content} color="textSecondary" gutterBottom>
                        男性
                    </Typography>
                }
              </Grid>

              <Grid item xs={4} md={3}>
                <Typography className={componentStyles.title}>
                  趣味 :
                </Typography>
              </Grid>
              <Grid item xs={8} md={9}>
                <Typography className={componentStyles.content} color="textSecondary" gutterBottom>
                  {props.data.hobby}
                </Typography>
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
      <CardActions className={componentStyles.footerContainer}>
        <Typography component="p">
          ユーザとの関係 : 
        </Typography>
      </CardActions>
      <CardActions className={componentStyles.footerContainer}>
        {
            props.data.message_relations1 && props.data.message_relations1.length > 0 || props.data.message_relations2 && props.data.message_relations2.length > 0 ? 
                <Chip label="トーク中" className={componentStyles.chip} color="primary" />
            :
                ''
        }
        {
            props.data.families1 && props.data.families1.length > 0 || props.data.families2 && props.data.families2.length > 0 ? 
                <Chip label="ファミリー" className={componentStyles.chip && componentStyles.yellow} />
            :
                ''
        }
      </CardActions>
      <CardActions>
        <Button 
          size="small" 
          className={classes.inviteButton}
          onClick={() => handleOpen(true)}
        >
          グループに招待する
        </Button>  
        <div className={componentStyles.offset}></div>
        <Tooltip title="トークを始める" classes={{tooltip: componentStyles.tooltip}}>
          <Button onClick={() => history.push(`/talk/${name}/${id}`)}>
            <Avatar className={classes.iconBackGround}>
              <MailIcon />
            </Avatar>
          </Button>  
        </Tooltip>
      </CardActions>

      {/* 招待グループリストの表示用モーダル */}
      {
        open ? 
          <GroupModal callback={handleOpen} open={open} data={{user_id: props.data.id}} />
        :
          ''
      }
    </Card>
  );
}

export default UserCard;