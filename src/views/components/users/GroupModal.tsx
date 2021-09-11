import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ComponentStyles from '../../../styles/common/componentStyle';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { fetchGetErrorMessages, fetchGetInfoMessages, fetchCredStart, fetchCredEnd } from '../../pages/appSlice';
import { fetchAsyncGetInviteGroups, selectIgoups, fetchAsyncPostInviteGroup } from '../../pages/users/userSlice';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import _ from 'lodash';
import Loading from '../common/Loading';
import { GROUP_MODAL, API_GROUP_INVITE_PROPS } from '../../types/usersTypes';
import { AppDispatch } from '../../../stores/store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
        fontSize: '1.1rem',
        textAlign: 'left',
        color: 'rgb(179, 165, 165)',
        margin: '5px 0 5px 0'
    },
    groupListFrame: {
        borderRadius: '5px',
        padding: '10px',
        background: 'rgb(243, 239, 239)'
    },
    groupListBox: {
        background: 'white',
        borderRadius: '10px',
        margin: '15px 20px 15px 20px',
        display: 'flex',
        cursor: 'pointer'
    },
    avatar: {
        margin: '5px'
    },
    groupInfo: {
        display: 'flex',
        alignItems: 'center'
    },
    privateTrue: {
        color: 'blue',
        fontSize: '0.9rem',
        paddingRight: '5px'
    },
    privateFalse: {
        color: 'red',
        fontSize: '0.9rem',
        paddingRight: '5px'
    },
    submitArea: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
  }),
);

const GroupModal: React.FC<GROUP_MODAL> = (props) => {
    const classes = useStyles();
    const componentStyles = ComponentStyles();
    const history = useHistory();
    const { id } = useParams<{id: string}>();
    const [disabled, setDisabled] = useState(false);
    // redux
    const dispatch: AppDispatch = useDispatch();
    const igroups = useSelector(selectIgoups);
    const [selectedValue, setSelectedValue] = useState(igroups[0].id ? igroups[0].id : 0);

    useEffect(() => {
        const renderGroupModal = async() => {
            // 招待用グループ情報を取得
            const igroupsRes = await dispatch(fetchAsyncGetInviteGroups({ id: +id }));
            if(fetchAsyncGetInviteGroups.fulfilled.match(igroupsRes) && igroupsRes.payload.error_message) {
                dispatch(fetchGetErrorMessages(igroupsRes.payload.error_message));
                return;
            }
        }
        renderGroupModal();
    }, [dispatch]);

    useEffect(() => {
        setSelectedValue(igroups[0].id ? igroups[0].id : 0);
    }, [igroups]);

    /**
     * グループの選択変更
     * @param value 
     */
    const handleChange = (value: number) => {
        setSelectedValue(value);
    };

    /**
     * グループ招待処理
     */
    const handleSubmit = async() => {
        setDisabled(true);
        await dispatch(fetchCredStart());

        const data: API_GROUP_INVITE_PROPS = {
            group_id: selectedValue,
            user_id: +id,
            status: 2
        }

        const result = await dispatch(fetchAsyncPostInviteGroup(data));
        if(fetchAsyncPostInviteGroup.fulfilled.match(result)) {
            if(result.payload.info_message) {
                dispatch(fetchGetInfoMessages(result.payload.info_message));
                await dispatch(fetchCredEnd());
                props.callback(false);
                return;
            }
            dispatch(fetchGetErrorMessages(result.payload.error_message));
        }
        await dispatch(fetchCredEnd());
        setDisabled(false);
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
                        <div className={componentStyles.paper} style={{ width: '40%' }}>
                            <CloseIcon className={componentStyles.closeIcon} onClick={() => props.callback(false)} />
                            <Typography className={classes.title}>招待するグループを選択してください</Typography>
                            <div className={classes.groupListFrame}>
                                {
                                    _.map(igroups, value => (
                                        <div 
                                            className={classes.groupListBox} 
                                            key={value.id} 
                                            onClick={() => handleChange(value.id)}
                                            style={selectedValue === value.id ? { background: '#f8cf77', color: 'white' } : undefined}
                                        >
                                            <div style={{ width: '15%' }}>
                                                <Avatar src={value.image_url} className={classes.avatar} />
                                            </div>
                                            <div className={classes.groupInfo} style={{ width: '75%' }}>
                                                <Typography>{value.name}</Typography>
                                            </div>
                                            <div className={classes.groupInfo} style={{ width: '20%' }}>
                                                <Typography>
                                                    {
                                                        value.private_flg ? 
                                                            <span className={classes.privateFalse}>非公開</span>
                                                        :
                                                            <span className={classes.privateTrue}>公開</span>
                                                    }
                                                </Typography>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={classes.submitArea}>
                                {
                                    disabled ? 
                                        <Button className={componentStyles.disabledButton} style={{ width: '50%' }} disabled={disabled}>
                                            招待中<Loading />
                                        </Button>
                                    :
                                        <Button onClick={handleSubmit} className={componentStyles.submitButton} style={{ width: '50%' }}>
                                            招待
                                        </Button>
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
                            <CloseIcon className={componentStyles.closeIcon} onClick={() => props.callback(false)} />
                            <Typography className={classes.title}>招待するグループを選択してください</Typography>
                            <div className={classes.groupListFrame}>
                                {
                                    _.map(igroups, value => (
                                        <div 
                                            className={classes.groupListBox} 
                                            key={value.id} 
                                            onClick={() => handleChange(value.id)}
                                            style={selectedValue === value.id ? { background: '#f8cf77', color: 'white' } : undefined}
                                        >
                                            <div style={{ width: '20%' }}>
                                                <Avatar src={value.image_url} className={classes.avatar} />
                                            </div>
                                            <div className={classes.groupInfo} style={{ width: '60%' }}>
                                                <Typography>{value.name}</Typography>
                                            </div>
                                            <div className={classes.groupInfo} style={{ width: '20%' }}>
                                                <Typography>
                                                    {
                                                        value.private_flg ? 
                                                            <span className={classes.privateFalse}>非公開</span>
                                                        :
                                                            <span className={classes.privateTrue}>公開</span>
                                                    }
                                                </Typography>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={classes.submitArea}>
                                {
                                    disabled ? 
                                        <Button className={componentStyles.disabledButton} style={{ width: '50%' }} disabled={disabled}>
                                            招待中<Loading />
                                        </Button>
                                    :
                                        <Button onClick={handleSubmit} className={componentStyles.submitButton} style={{ width: '50%' }}>
                                            招待
                                        </Button>
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
                                <CloseIcon className={componentStyles.closeIcon} onClick={() => props.callback(false)} />
                                <Typography className={classes.title}>招待するグループを選択してください</Typography>
                                <div className={classes.groupListFrame}>
                                    {
                                        _.map(igroups, value => (
                                            <div 
                                                className={classes.groupListBox} 
                                                key={value.id} 
                                                onClick={() => handleChange(value.id)}
                                                style={selectedValue === value.id ? { background: '#f8cf77', color: 'white' } : undefined}
                                            >
                                                <div style={{ width: '20%' }}>
                                                    <Avatar src={value.image_url} className={classes.avatar} />
                                                </div>
                                                <div className={classes.groupInfo} style={{ width: '55%' }}>
                                                    <Typography>{value.name}</Typography>
                                                </div>
                                                <div className={classes.groupInfo} style={{ width: '25%' }}>
                                                    <Typography>
                                                        {
                                                            value.private_flg ? 
                                                                <span className={classes.privateFalse}>非公開</span>
                                                            :
                                                                <span className={classes.privateTrue}>公開</span>
                                                        }
                                                    </Typography>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className={classes.submitArea}>
                                    {
                                        disabled ? 
                                            <Button className={componentStyles.disabledButton} style={{ width: '70%' }} disabled={disabled}>
                                                招待中<Loading />
                                            </Button>
                                        :
                                            <Button onClick={handleSubmit} className={componentStyles.submitButton} style={{ width: '70%' }}>
                                                招待
                                            </Button>
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
