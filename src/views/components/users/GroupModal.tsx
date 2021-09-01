import React from 'react';
import _ from 'lodash';
import ComponentStyles from '../../../styles/common/componentStyle';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { GROUP_MODAL } from '../../types/usersTypes';

import group_list from '../../../data/group_list_data.json';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
        fontSize: '1.1rem',
        textAlign: 'left',
        color: 'rgb(179, 165, 165)'
    },
    groupListFrame: {
        width: '100%',
        borderRadius: '5px',
        background: 'rgb(243, 239, 239)'
    },
    groupListBox: {
        background: 'white',
        borderRadius: '10px',
        display: 'flex'
    },
    privateFlg: {
        textAlign: 'right'
    }
  }),
);

const GroupModal: React.FC<GROUP_MODAL> = (props) => {
    const classes = useStyles();
    const componentStyles = ComponentStyles();

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
                            <Typography className={classes.title}>招待可能なグループ一覧</Typography>
                            <div className={classes.groupListFrame}>
                                {
                                    _.map(group_list, value => (
                                        <div className={classes.groupListBox} key={value.id}>
                                            <Avatar src={value.image_file} />
                                            <Typography>{value.name}</Typography>
                                            <Typography className={classes.privateFlg}>
                                                {
                                                    value.private_flg ? 
                                                        '公開'
                                                    :
                                                        '非公開'
                                                }
                                            </Typography>
                                        </div>
                                    ))
                                }
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
                            <Typography className={classes.title}>招待可能なグループ一覧</Typography>
                            <div className={classes.groupListFrame}>
                                {
                                    _.map(group_list, value => (
                                        <div className={classes.groupListBox} key={value.id}>
                                            <Avatar src={value.image_file} />
                                            <Typography>{value.name}</Typography>
                                            <Typography className={classes.privateFlg}>
                                                {
                                                    value.private_flg ? 
                                                        '公開'
                                                    :
                                                        '非公開'
                                                }
                                            </Typography>
                                        </div>
                                    ))
                                }
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
                                <Typography className={classes.title}>招待可能なグループ一覧</Typography>
                                <div className={classes.groupListFrame}>
                                    {
                                        _.map(group_list, value => (
                                            <div className={classes.groupListBox} key={value.id}>
                                                <Avatar src={value.image_file} />
                                                <Typography>{value.name}</Typography>
                                                <Typography className={classes.privateFlg}>
                                                    {
                                                        value.private_flg ? 
                                                            '公開'
                                                        :
                                                            '非公開'
                                                    }
                                                </Typography>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </Fade>
                    </Modal>
                </Grid>
            </Hidden>
        </Grid>
    )
}

export default GroupModal
