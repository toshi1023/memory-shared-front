import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import ComponentStyles from '../../../styles/common/componentStyle';
import { useHistory } from "react-router-dom";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { fetchGetErrorMessages, fetchAsyncGetNreadCount, fetchCredStart, fetchCredEnd } from '../../pages/appSlice';
import { fetchAsyncGetPosts, selectPosts, fetchAsyncGetComments, fetchAsyncPostGroupHistory, selectGroupPages } from '../../pages/groups/groupSlice';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PostAddIcon from '@material-ui/icons/PostAdd';
import { GROUP_CARD, MODAL_DATA } from '../../types/groupsTypes';
import PostModal from './PostModal';
import DateFormat from '../../../functions/dateFormat';
import Loading from '../common/Loading';
import { AppDispatch } from '../../../stores/store';
import BasePagination from '../common/BasePagination';

type GET_COMMENTS = {
  post_id: number,
  group_id: number
}

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
    },
    postButton: {
      background: 'rgb(236, 234, 234)',
      color: 'rgb(145, 144, 144)'
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    postTitle: {
      color: 'rgb(179, 165, 165)'
    },
    postFrame: {
      background: 'rgb(243, 239, 239)',
      padding: '20px'
    },
    postList: {
      margin: '15px'
    },
    postMeta: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '5px'
    },
    postBox: {
      height: 'auto',
      margin: '0 auto',
      background: 'white',
      borderRadius: '10px',
      cursor: 'pointer'
    },
    postContent: {
      fontSize: '1.1rem',
      padding: '10px',
      textAlign: 'left',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    },
    disabledButton: {
      background: '#e6e1e1',
      border: '1px solid #e6e1e1',
      borderRadius: '30px',
      boxSizing: 'border-box',
      fontSize: '16px',
      fontWeight: 'bold',
    }
}));

/**
 * グループの詳細表示用カード
 * @param props 
 * @returns 
 */
const GroupCard: React.FC<GROUP_CARD> = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const componentStyles = ComponentStyles();
  const [disabled, setDisabled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState<MODAL_DATA>({
      id: 0,
      content: '',
      user_id: 0
  });
  // redux
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const groupPages = useSelector(selectGroupPages);

  /**
   * 投稿掲示板表示関数
   */
  const handleExpandClick = async () => {
      setExpanded(!expanded);
      // 投稿情報取得
      const postsRes = await dispatch(fetchAsyncGetPosts({id: props.data.id, page: null}));
      if(fetchAsyncGetPosts.fulfilled.match(postsRes) && postsRes.payload.error_message) {
          dispatch(fetchGetErrorMessages(postsRes.payload.error_message));
          return;
      }
  };

  /**
   * 投稿データの取得処理(ページネーション処理)
   */
  const handleGetData = async (page: number) => {
      // 投稿情報取得
      const postsRes = await dispatch(fetchAsyncGetPosts({id: props.data.id, page: page}));
      if(fetchAsyncGetPosts.fulfilled.match(postsRes) && postsRes.payload.error_message) {
          dispatch(fetchGetErrorMessages(postsRes.payload.error_message));
          return;
      }
  };

  /**
   * グループ参加申請処理
   * @returns 
   */
  const asyncPostGroupHistory = async () => {
    // ボタンを非活性化
    setDisabled(true);
    await dispatch(fetchCredStart());

    const data = {
      user_id: +localStorage.loginId,
      group_id: props.data.id,
      status: 1
    }
    const ghRes = await dispatch(fetchAsyncPostGroupHistory(data));
    if(fetchAsyncPostGroupHistory.fulfilled.match(ghRes) && ghRes.payload.error_message) {
      dispatch(fetchGetErrorMessages(ghRes.payload.error_message));
      return;
    }
    // ニュース未読数の取得
    const nreadCountRes = await dispatch(fetchAsyncGetNreadCount());
    if(fetchAsyncGetNreadCount.fulfilled.match(nreadCountRes) && nreadCountRes.payload.error_message) {
        dispatch(fetchGetErrorMessages(nreadCountRes.payload.error_message));
        return;
    }
    await dispatch(fetchCredEnd());
    setDisabled(false);
  }

  /**
   * モーダル表示制御用関数
   * @param value 
   */
  const handleOpen = (value: boolean) => {
      setOpen(value);
  };

  /**
   * コメント情報取得
   * @param value 
   * @returns 
   */
  const asyncGetComments = async (value: GET_COMMENTS) => {
    const commentsRes = await dispatch(fetchAsyncGetComments({ id: value.group_id, post_id: value.post_id }));
    if(fetchAsyncGetComments.fulfilled.match(commentsRes) && commentsRes.payload.error_message) {
        dispatch(fetchGetErrorMessages(commentsRes.payload.error_message));
        return;
    }
  }
  
  return (
    <Card className={classes.root}>
      <CardContent>
        
        <Grid container spacing={1}>
          <Grid item xs={4} md={3}>
            <Avatar src={props.data.image_url} className={componentStyles.imageAvatar} />
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
                        <Typography component="span" className={componentStyles.privateFlgTrue}>
                            非公開
                        </Typography>
                    :
                        <Typography component="span" className={componentStyles.privateFlgFalse}>
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
                    {props.data.group_histories ? props.data.group_histories.length : 0}<span className={componentStyles.unit}>人参加中</span>
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
      {
        props.data.host_user_id === +localStorage.loginId ?
          <>
            <CardActions className={componentStyles.footerContainer}>
              <Typography component="p">
                ユーザとの関係 : 
              </Typography>
            </CardActions>
            <CardActions className={componentStyles.footerContainer}>
              <Chip label="ホスト" className={componentStyles.chip} color="secondary" />
            </CardActions>
            <CardActions>
              <Button 
                size="small" 
                className={componentStyles.editButton}
                onClick={() => history.push(`/groups/${props.data.name}/${props.data.id}/editer`)}
              >
                グループを編集する
              </Button>  
              <div className={componentStyles.offset}></div>
              <Button 
                className={classes.postButton}
                onClick={handleExpandClick}
                aria-expanded={expanded}
              >
                投稿を確認
                <ExpandMoreIcon className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })} />
              </Button>
            </CardActions>
          </>
        :
          <>
            <CardActions className={componentStyles.footerContainer}>
              <Typography component="p">
                ユーザとの関係 : 
              </Typography>
            </CardActions>
            <CardActions className={componentStyles.footerContainer}>
              {
                  props.data.users && props.data.users[0] !== undefined &&  props.data.users[0].pivot.status === 2 ? 
                    <Chip label="メンバー" className={componentStyles.chip && componentStyles.green} />
                  :
                    props.data.users && props.data.users[0] !== undefined &&  props.data.users[0].pivot.status === 1 ? 
                      <Chip label="申請中" className={componentStyles.chip && componentStyles.yellow} />
                    :
                      ''
              }
              <div className={componentStyles.offset}></div>
              {
                props.data.users && props.data.users[0] !== undefined &&  props.data.users[0].pivot.status === 2 ? 
                  <Button 
                    className={classes.postButton}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                  >
                    投稿を確認
                    <ExpandMoreIcon className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })} />
                  </Button>
                :
                  props.data.users && props.data.users[0] !== undefined &&  props.data.users[0].pivot.status === 1 ? 
                    ''
                  :
                    disabled ? 
                      <Button className={classes.disabledButton} disabled={disabled}>
                        申請中<Loading />
                      </Button>
                    :
                      <Button onClick={asyncPostGroupHistory}><Chip label="申請する" className={componentStyles.chip && componentStyles.chipButton} color="primary" /></Button>
              }
            </CardActions>
          </>
      }

      {/* 掲示板 */}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Button className={componentStyles.registerButton} onClick={() => history.push(`/groups/${props.data.name}/${props.data.id}/post/register`)}>
            <PostAddIcon className={componentStyles.registerIcon} />投稿を作成
          </Button>
          <Typography paragraph className={classes.postTitle}>投稿</Typography>
          <div className={classes.postFrame}>
            {
              _.map(posts, value => (
                <>
                  <div className={classes.postList} key={value.id} onClick={() => { 
                      handleOpen(true); 
                      asyncGetComments({group_id: value.group_id, post_id: value.id}); 
                      setModalData({id: value.id, content: value.content, user_id: value.user_id}); 
                  }}>
                    <div className={classes.postMeta}>
                      <Avatar src={value.user.image_url} />
                      <Typography style={{ marginLeft: '8px', fontSize: '1.1rem' }}>{value.user.name}</Typography>
                    </div>
                    <div className={classes.postBox}>
                      <Typography className={classes.postContent} color="textSecondary">{value.content}</Typography>
                    </div>
                    <Typography style={{ textAlign: 'right' }}>{DateFormat(value.updated_at)}</Typography>
                  </div>
                </>
              ))
            }
            {
              posts[0] === undefined ? 
                ''
              :
                <BasePagination count={groupPages.p_lastpage} callback={handleGetData} />
            }
          </div>
          {/* 詳細表示モーダル */}
          <PostModal callback={handleOpen} data={modalData} open={open} />
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default GroupCard;