import ComponentStyles from '../../../styles/common/componentStyle';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { GROUP_CARD } from '../../types/groupsTypes';


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
    iconBackGround: {
      backgroundColor: 'rgb(126, 170, 252)'
    }
}));

/**
 * グループの詳細表示用カード
 * @param props 
 * @returns 
 */
const GroupCard: React.FC<GROUP_CARD> = (props) => {
  const classes = useStyles();
  const componentStyles = ComponentStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        
        <Grid container spacing={1}>
          <Grid item xs={4} md={3}>
            <Avatar src={props.data.image_file} className={componentStyles.imageAvatar} />
          </Grid>
          <Grid item xs={8} md={9}>
            <Grid container>

              <Grid item xs={5} md={3}>
                <Typography className={componentStyles.title}>
                  グループ名 : 
                </Typography>
              </Grid>
              <Grid item xs={7} md={9}>
                <Typography className={componentStyles.content} color="textSecondary" gutterBottom>
                  {props.data.name}
                </Typography>
              </Grid>

              <Grid item xs={5} md={3}>
                <Typography className={componentStyles.title}>
                  公開設定 : 
                </Typography>
              </Grid>
              <Grid item xs={7} md={9}>
                <Typography className={componentStyles.content} color="textSecondary" gutterBottom>
                  {
                    props.data.private_flg ? 
                        <Typography className={componentStyles.privateFlgTrue}>
                            非公開
                        </Typography>
                    :
                        <Typography className={componentStyles.privateFlgFalse}>
                            公開
                        </Typography>
                  }
                </Typography>
              </Grid>
              
              <Grid item xs={5} md={3}>
                <Typography className={componentStyles.title}>
                  メンバー : 
                </Typography>
              </Grid>
              <Grid item xs={7} md={9}>
                <Typography component="p" className={componentStyles.participants}>
                    {props.data.participants}<span className={componentStyles.unit}>人参加中</span>
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
            props.data.status_type === 'ホスト' ? 
                <Chip label="ホスト" className={componentStyles.chip} color="secondary" />
            :
                ''
        }
        {
            props.data.status_type === 'メンバー' ? 
                <Chip label="メンバー" className={componentStyles.chip && componentStyles.green} />
            :
                ''
        }
        {
            props.data.status_type === '申請中' ? 
                <Chip label="申請中" className={componentStyles.chip && componentStyles.yellow} />
            :
                ''
        }  
        <div className={componentStyles.offset}></div>
        {
          props.data.status_type !== null ? 
            <Button><Chip label="申請する" className={componentStyles.chip && componentStyles.chipButton} color="primary" /></Button>
          :
            ''
        }
      </CardActions>
    </Card>
  );
}

export default GroupCard;