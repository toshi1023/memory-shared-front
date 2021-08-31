import React from 'react';
import _ from 'lodash';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { POST_MODAL } from '../../types/groupsTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    title: {
        fontSize: '1.1rem',
        textAlign: 'left',
        color: 'rgb(179, 165, 165)'
    },
    content: {
        textAlign: 'left'
    },
    commentArea: {
        width: '80%',
        border: '1px solid rgb(179, 165, 165)'
    }
  }),
);

const PostModal: React.FC<POST_MODAL> = (props) => {
    const classes = useStyles();

    return (
        <Grid container justify="center">
            <Grid item xs={11} sm={8} md={7}>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={props.open}
                    onClose={() => props.callback(false)}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={props.open}>
                    <div className={classes.paper}>
                        <Typography className={classes.title}>内容</Typography>
                        <Typography className={classes.content}>{props.data.content}</Typography>
                        <div className={classes.commentArea}>
                            {
                                _.map(props.data.comment, value => (
                                    <Typography>{value.content}</Typography>
                                ))
                            }
                        </div>
                    </div>
                    </Fade>
                </Modal>
            </Grid>
        </Grid>
    )
}

export default PostModal
