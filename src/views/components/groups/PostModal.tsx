import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import _ from 'lodash';
import ComponentStyles from '../../../styles/common/componentStyle';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { fetchAsyncGetToken, fetchGetErrorMessages, fetchGetInfoMessages } from '../../pages/appSlice';
import { selectComments, fetchAsyncPostComment, fetchAsyncDeletePost, fetchAsyncDeleteComment } from '../../pages/groups/groupSlice';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ReplyIcon from '@material-ui/icons/Reply';
import CloseIcon from '@material-ui/icons/Close';
import DateFormat from '../../../functions/dateFormat';
import { POST_MODAL } from '../../types/groupsTypes';
import { AppDispatch } from '../../../stores/store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
        fontSize: '1.1rem',
        textAlign: 'left',
        color: 'rgb(179, 165, 165)'
    },
    content: {
        textAlign: 'left',
        padding: '10px 0 20px 0',
        whiteSpace: 'pre-line',
        maxHeight: '18vh',
        overflow: 'auto',
        marginBottom: '10px'
    },
    commentFrame: {
        width: '100%',
        borderRadius: '5px',
        background: 'rgb(243, 239, 239)',
        maxHeight: '42vh',
        overflow: 'auto'
    },
    commentArea: {
        display: 'flex',
        padding: '5px 15px 5px 15px'
    },
    commentBox: {
        background: 'white',
        borderRadius: '10px',
        margin: '0 auto',
    },
    mycommentBox: {
        background: 'white',
        borderRadius: '10px',
        margin: '0 auto',
        cursor: 'pointer'
    },
    comment: {
        padding: '5px 10px 5px 10px'
    },
    commentField: {
        fontSize: '1.2rem',
        padding: '20px 0 20px 0',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconButton: {
        backgroundColor: 'rgb(253, 200, 103)',
        marginLeft: '3px',
        width: 'auto',
        '&:hover': {
            backgroundColor: 'rgb(253, 200, 103)',
        }
    },
    replyIcon: {
        fontSize: '1.5rem',
        color: '#fff'
    },
    textfield: {
        width: '75vw',
        height: 'auto',
        backgroundColor: 'white'
    },
    labelFont: {
        fontSize: '.8rem'
    },
    deleteButton: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '40%',
        borderRadius: '30px',
        fontWeight: 'bold',
        justifyContent: 'center'
    }
  }),
);

const PostModal: React.FC<POST_MODAL> = (props) => {
    const classes = useStyles();
    const componentStyles = ComponentStyles();
    const [value, setValue] = useState<string>('');
    const { id } = useParams<{ id: string }>();
    // redux
    const dispatch: AppDispatch = useDispatch();
    const comments = useSelector(selectComments);

    /**
     * 投稿削除
     * @param id 
     */
     const handleDeletePost = async () => {
        if(window.confirm('投稿を削除しますか？')) {
            // 引数データの生成
            const data = {
                id: props.data.id,
                group_id: +id
            }
            // XSRF-TOKENの取得
            await dispatch(fetchAsyncGetToken());
            // 投稿削除処理
            const dpostRes = await dispatch(fetchAsyncDeletePost(data));
            if(fetchAsyncDeletePost.fulfilled.match(dpostRes)) {
                dpostRes.payload.info_message ? 
                    dispatch(fetchGetInfoMessages(dpostRes.payload.info_message))
                :
                    dispatch(fetchGetErrorMessages(dpostRes.payload.error_message))
            }

            // モーダルを強制クローズ
            props.callback(false);
        }
    }

    /**
     * コメント削除
     * @param id 
     */
    const handleDeleteComment = async (comment_id: number, content: string) => {
        if(window.confirm(`
            コメントを削除しますか？
            内容: ${content}
        `)) {
            // 引数データの生成
            const data = {
                id: comment_id,
                post_id: props.data.id,
                group_id: +id
            }
            // XSRF-TOKENの取得
            await dispatch(fetchAsyncGetToken());
            // コメント削除処理
            const dcommentRes = await dispatch(fetchAsyncDeleteComment(data));
            if(fetchAsyncDeleteComment.fulfilled.match(dcommentRes)) {
                dcommentRes.payload.info_message ? 
                    dispatch(fetchGetInfoMessages(dcommentRes.payload.info_message))
                :
                    dispatch(fetchGetErrorMessages(dcommentRes.payload.error_message))
            }
        }
    }

    /**
     * コメント登録
     * @param val 
     */
    const handleSubmit = async (val: string) => {
        if(!val) {
            dispatch(fetchGetErrorMessages('コメントが入力されていません'));
            return;
        }

        // 保存データの生成
        const data = {
            content: val,
            user_id: +localStorage.loginId,
            post_id: props.data.id,
            group_id: +id
        }

        // XSRF-TOKENの取得
        await dispatch(fetchAsyncGetToken());
        // コメント登録処理
        const rcommentRes = await dispatch(fetchAsyncPostComment(data));
        if(fetchAsyncPostComment.fulfilled.match(rcommentRes)) {
            rcommentRes.payload.info_message ? 
                dispatch(fetchGetInfoMessages(rcommentRes.payload.info_message))
            :
                dispatch(fetchGetErrorMessages(rcommentRes.payload.error_message))

            // コメント入力欄の値をリセット
            const pc_commentInput = document.getElementById('pc_comment_input') as HTMLTextAreaElement;
            if(pc_commentInput !== null) {
                pc_commentInput.value = '';
            }
            const ipad_commentInput = document.getElementById('ipad_comment_input') as HTMLTextAreaElement;
            if(ipad_commentInput !== null) {
                ipad_commentInput.value = '';
            }
            const mobile_commentInput = document.getElementById('mobile_comment_input') as HTMLTextAreaElement;
            if(mobile_commentInput !== null) {
                mobile_commentInput.value = '';
            }
            setValue('');
        }
    }

    return (
        <Grid container justify="center">

            {/* PC */}
            <Hidden smDown>
                <Grid item md={7}>
                    <Modal
                        className={componentStyles.modal}
                        open={props.open}
                        onClose={() => props.callback(false)}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={props.open}>
                        <div className={componentStyles.paper}>
                            <CloseIcon className={componentStyles.closeIcon} onClick={() => props.callback(false)} />
                            <Typography className={classes.title}>内容</Typography>
                            <Typography className={classes.content}>{props.data.content}</Typography>
                            <Typography className={classes.title}>コメント</Typography>
                            <div className={classes.commentFrame}>
                                {
                                    _.map(comments, value => (
                                        <div key={value.id}>
                                            <div className={classes.commentArea}>
                                                <div style={{ width: '10%' }}>
                                                    <Avatar src={value.user.image_url} />
                                                    <Typography>{value.user.name}</Typography>
                                                </div>
                                                {
                                                    value.user_id === +localStorage.loginId ? 
                                                        <div className={classes.mycommentBox} style={{ width: '90%' }} onClick={() => handleDeleteComment(value.id, value.content)}>
                                                            <Typography className={classes.comment}>{value.content}</Typography>
                                                        </div>
                                                    :
                                                        <div className={classes.commentBox} style={{ width: '90%' }}>
                                                            <Typography className={classes.comment}>{value.content}</Typography>
                                                        </div>
                                                }
                                            </div>
                                            <Typography style={{ textAlign: 'right', marginRight: '1rem' }}>{DateFormat(value.created_at, true)}</Typography>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={classes.commentField}>
                                <TextField
                                    id="pc_comment_input"
                                    className={classes.textfield}
                                    name="message"
                                    label="コメントを投稿"
                                    variant="outlined"
                                    multiline
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                <IconButton 
                                    color="primary" 
                                    aria-label="add"
                                    className={classes.iconButton}
                                    onClick={() => handleSubmit(value)}
                                >
                                    <ReplyIcon className={classes.replyIcon} />
                                </IconButton>
                            </div>
                            {
                                props.data.user_id === +localStorage.loginId ? 
                                    <Button 
                                        variant="contained" 
                                        color="secondary" 
                                        className={classes.deleteButton}
                                        onClick={handleDeletePost}
                                    >
                                        投稿を削除する
                                    </Button>
                                :
                                    ''
                            }
                        </div>
                        </Fade>
                    </Modal>
                </Grid>
            </Hidden>

            {/* iPad版 */}
            <Hidden xsDown mdUp>
                <Grid item sm={8}>
                    <Modal
                        className={componentStyles.modal}
                        open={props.open}
                        onClose={() => props.callback(false)}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={props.open}>
                        <div className={componentStyles.paper}>
                            <CloseIcon className={componentStyles.closeIcon} onClick={() => props.callback(false)} />
                            <Typography className={classes.title}>内容</Typography>
                            <Typography className={classes.content}>{props.data.content}</Typography>
                            <Typography className={classes.title}>コメント</Typography>
                            <div className={classes.commentFrame}>
                                {
                                    _.map(comments, value => (
                                        <div key={value.id}>
                                            <div className={classes.commentArea}>
                                                <div style={{ width: '14%' }}>
                                                    <Avatar src={value.user.image_url} />
                                                    <Typography>{value.user.name}</Typography>
                                                </div>
                                                {
                                                    value.user_id === +localStorage.loginId ? 
                                                        <div className={classes.mycommentBox} style={{ width: '90%' }} onClick={() => handleDeleteComment(value.id, value.content)}>
                                                            <Typography className={classes.comment}>{value.content}</Typography>
                                                        </div>
                                                    :
                                                        <div className={classes.commentBox} style={{ width: '90%' }}>
                                                            <Typography className={classes.comment}>{value.content}</Typography>
                                                        </div>
                                                }
                                            </div>
                                            <Typography style={{ textAlign: 'right', marginRight: '1rem' }}>{DateFormat(value.created_at, true)}</Typography>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={classes.commentField}>
                                <TextField
                                    id="ipad_comment_input"
                                    className={classes.textfield}
                                    name="message"
                                    label="コメントを投稿"
                                    variant="outlined"
                                    multiline
                                    onChange={(e) => setValue(e.target.value)}
                                />
                                <IconButton 
                                    color="primary" 
                                    aria-label="add"
                                    className={classes.iconButton}
                                    onClick={() => handleSubmit(value)}
                                >
                                    <ReplyIcon className={classes.replyIcon} />
                                </IconButton>
                            </div>
                            {
                                props.data.user_id === +localStorage.loginId ? 
                                    <Button 
                                        variant="contained" 
                                        color="secondary" 
                                        className={classes.deleteButton}
                                        onClick={handleDeletePost}
                                    >
                                        投稿を削除する
                                    </Button>
                                :
                                    ''
                            }
                        </div>
                        </Fade>
                    </Modal>
                </Grid>
            </Hidden>

            {/* スマホ版 */}
            <Hidden smUp>
                <Grid item xs={11}>
                    <Modal
                        className={componentStyles.modal}
                        open={props.open}
                        onClose={() => props.callback(false)}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}
                    >
                        <Fade in={props.open}>
                            <div className={componentStyles.paper} style={{ width: '80%' }}>
                                <CloseIcon className={componentStyles.closeIcon} onClick={() => props.callback(false)} />
                                <Typography className={classes.title}>内容</Typography>
                                <Typography className={classes.content}>{props.data.content}</Typography>
                                <Typography className={classes.title}>コメント</Typography>
                                <div className={classes.commentFrame}>
                                    {
                                        _.map(comments, value => (
                                            <div key={value.id}>
                                                <div className={classes.commentArea}>
                                                    <div style={{ width: '17%' }}>
                                                        <Avatar src={value.user.image_url} />
                                                        <Typography>{value.user.name}</Typography>
                                                    </div>
                                                    {
                                                        value.user_id === +localStorage.loginId ? 
                                                            <div className={classes.mycommentBox} style={{ width: '90%' }} onClick={() => handleDeleteComment(value.id, value.content)}>
                                                                <Typography className={classes.comment}>{value.content}</Typography>
                                                            </div>
                                                        :
                                                            <div className={classes.commentBox} style={{ width: '90%' }}>
                                                                <Typography className={classes.comment}>{value.content}</Typography>
                                                            </div>
                                                    }
                                                </div>
                                                <Typography style={{ textAlign: 'right', marginRight: '1rem', fontSize: '0.8rem' }}>{DateFormat(value.created_at, true)}</Typography>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className={classes.commentField}>
                                    <div style={{ width: '75vw' }}>
                                        <TextField
                                            id="mobile_comment_input"
                                            className={classes.textfield}
                                            style={{ width: '100%' }}
                                            name="message"
                                            label="コメントを投稿"
                                            variant="outlined"
                                            multiline
                                            fullWidth={true}
                                            onChange={(e) => setValue(e.target.value)}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.labelFont
                                                }
                                            }}
                                        />
                                    </div>
                                    <div style={{ width: 'auto' }}>
                                        <IconButton 
                                            color="primary" 
                                            aria-label="add"
                                            className={classes.iconButton}
                                            onClick={() => handleSubmit(value)}
                                        >
                                            <ReplyIcon className={classes.replyIcon} />
                                        </IconButton>
                                    </div>
                                </div>
                                {
                                    props.data.user_id === +localStorage.loginId ? 
                                        <Button 
                                            variant="contained" 
                                            color="secondary" 
                                            className={classes.deleteButton} 
                                            style={{ width: '50%' }}
                                            onClick={handleDeletePost}
                                        >
                                            投稿を削除する
                                        </Button>
                                    :
                                        ''
                                }
                            </div>
                        </Fade>
                    </Modal>
                </Grid>
            </Hidden>
        </Grid>
    )
}

export default PostModal
