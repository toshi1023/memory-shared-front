import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import ComponentStyles from '../../../styles/common/componentStyle';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { fetchGetErrorMessages, fetchGetInfoMessages, fetchCredStart, fetchCredEnd } from '../../pages/appSlice';
import { selectComments } from '../../pages/groups/groupSlice';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import ReplyIcon from '@material-ui/icons/Reply';
import CloseIcon from '@material-ui/icons/Close';
import DateFormat from '../../../functions/dateFormat';
import { POST_MODAL } from '../../types/groupsTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
        fontSize: '1.1rem',
        textAlign: 'left',
        color: 'rgb(179, 165, 165)'
    },
    content: {
        textAlign: 'left',
        padding: '10px 0 20px 0'
    },
    commentFrame: {
        width: '100%',
        borderRadius: '5px',
        background: 'rgb(243, 239, 239)'
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
    replyIcon: {
        fontSize: '1.5rem',
        color: 'blue',
        width: '100%'
    },
    textfield: {
        width: '85%',
        backgroundColor: 'white'
    }
  }),
);

const PostModal: React.FC<POST_MODAL> = (props) => {
    const classes = useStyles();
    const componentStyles = ComponentStyles();
    // redux
    const comments = useSelector(selectComments);

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
                                                <div className={classes.commentBox} style={{ width: '90%' }}>
                                                    <Typography className={classes.comment}>{value.content}</Typography>
                                                </div>
                                            </div>
                                            <Typography style={{ textAlign: 'right', marginRight: '1rem' }}>{DateFormat(value.created_at, true)}</Typography>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={classes.commentField}>
                                <TextField
                                    className={classes.textfield}
                                    name="message"
                                    label="コメントを投稿"
                                    variant="outlined"
                                    multiline
                                />
                                <IconButton 
                                    color="primary" 
                                    aria-label="add"
                                >
                                    <ReplyIcon className={classes.replyIcon} />
                                </IconButton>
                            </div>
                        </div>
                        </Fade>
                    </Modal>
                </Grid>
            </Hidden>

            {/* iPad版 */}
            <Hidden mdUp>
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
                                                <div className={classes.commentBox} style={{ width: '86%' }}>
                                                    <Typography className={classes.comment}>{value.content}</Typography>
                                                </div>
                                            </div>
                                            <Typography style={{ textAlign: 'right', marginRight: '1rem' }}>{DateFormat(value.created_at, true)}</Typography>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={classes.commentField}>
                                <TextField
                                    className={classes.textfield}
                                    name="message"
                                    label="コメントを投稿"
                                    variant="outlined"
                                    multiline
                                />
                                <IconButton 
                                    color="primary" 
                                    aria-label="add"
                                >
                                    <ReplyIcon className={classes.replyIcon} />
                                </IconButton>
                            </div>
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
                                                    <div className={classes.commentBox} style={{ width: '83%' }}>
                                                        <Typography className={classes.comment} style={{ fontSize: '0.9rem' }}>{value.content}</Typography>
                                                    </div>
                                                </div>
                                                <Typography style={{ textAlign: 'right', marginRight: '1rem', fontSize: '0.8rem' }}>{DateFormat(value.created_at, true)}</Typography>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className={classes.commentField}>
                                    <TextField
                                        className={classes.textfield}
                                        name="message"
                                        label="コメントを投稿"
                                        variant="outlined"
                                        multiline
                                    />
                                    <IconButton 
                                        color="primary" 
                                        aria-label="add"
                                    >
                                        <ReplyIcon className={classes.replyIcon} />
                                    </IconButton>
                                </div>
                            </div>
                        </Fade>
                    </Modal>
                </Grid>
            </Hidden>
        </Grid>
    )
}

export default PostModal
