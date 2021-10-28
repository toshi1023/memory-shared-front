import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ComponentStyles from '../../../styles/common/componentStyle';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { fetchAsyncGetToken, fetchCredStart, fetchCredEnd, fetchGetErrorMessages, fetchGetInfoMessages } from '../../pages/appSlice';
import { fetchAsyncPutGroupHistory } from '../../pages/groups/groupSlice';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { HISTORY_UPDATE_MODAL } from '../../types/groupsTypes';
import Loading from '../common/Loading';
import { AppDispatch } from '../../../stores/store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        userContainer: {
            textAlign: 'center'
        },
        avatar: {
            margin: '0 auto',
            width: '15vw',
            height: 'auto',
        },
        userName: {
            fontSize: '1.8rem'
        },
        radioFrame: {
            width: '100%',
            borderRadius: '5px',
            background: 'rgb(243, 239, 239)',
            textAlign: 'center',
            margin: '15px 0 15px',
            padding: '10px 0 10px'
        },
        radio: {
            '&$checked': {
                color: '#4B8DF8'
            }
        },
        checked: {},
        ghlabel: {
            color: 'rgb(134, 133, 133)',
            marginRight: '15px',
            fontSize: '1.1rem'
        }
    })
)

/**
 * グループ参加申請の回答用モーダル
 * @returns 
 */
const HistoryUpdateModal: React.FC<HISTORY_UPDATE_MODAL> = (props) => {
    const classes = useStyles();
    const componentStyles = ComponentStyles();
    const { id } = useParams<{id: string}>();
    const [selectedValue, setSelectedValue] = useState(2);
    const [disabled, setDisabled] = useState(false);
    // redux
    const dispatch: AppDispatch = useDispatch();

    const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(+event.target.value);
    };

    /**
     * 回答処理
     * @returns 
     */
    const handleSubmit = async () => {
        setDisabled(true);
        await dispatch(fetchCredStart());

        // XSRF-TOKENの取得
        await dispatch(fetchAsyncGetToken());

        const data = {
            id: props.data.id,
            group_id: +id,
            user_id: props.data.user_id,
            status: selectedValue
        }

        // 回答結果を保存
        const result = await dispatch(fetchAsyncPutGroupHistory(data));
        if(fetchAsyncPutGroupHistory.fulfilled.match(result)) {
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
            <Hidden xsDown>
                <Grid item sm={6}>
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
                            <div className={classes.userContainer}>
                                <Avatar src={props.data.image_url} className={classes.avatar} />
                                <Typography className={classes.userName}>{props.data.user_name}</Typography>
                            </div>
                            <div className={classes.radioFrame}>
                                <Radio
                                    checked={selectedValue === 2}
                                    onChange={handleChangeRadio}
                                    value={2}
                                    name="status"
                                    classes={{root: classes.radio, checked: classes.checked}}
                                />
                                <span className={classes.ghlabel}>承認</span>
                                <Radio
                                    checked={selectedValue === 3}
                                    onChange={handleChangeRadio}
                                    value={3}
                                    name="status"
                                />
                                <span className={classes.ghlabel}>却下</span>
                            </div>
                            <div className={componentStyles.submitArea}>
                                {
                                    disabled ? 
                                        <Button className={componentStyles.disabledButton} style={{ width: '50%' }} disabled={disabled}>
                                            登録中<Loading />
                                        </Button>
                                    :
                                        <Button 
                                            className={componentStyles.submitButton} 
                                            style={{ width: '50%' }} 
                                            type="submit"
                                            onClick={handleSubmit}
                                        >
                                            登録
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
                                <div className={classes.userContainer}>
                                    <Avatar src={props.data.image_url} className={classes.avatar} style={{ width: '30vw' }} />
                                    <Typography className={classes.userName}>{props.data.user_name}</Typography>
                                </div>
                                <div className={classes.radioFrame}>
                                    <Radio
                                        checked={selectedValue === 2}
                                        onChange={handleChangeRadio}
                                        value={2}
                                        name="status"
                                        classes={{root: classes.radio, checked: classes.checked}}
                                    />
                                    <span className={classes.ghlabel}>承認</span>
                                    <Radio
                                        checked={selectedValue === 3}
                                        onChange={handleChangeRadio}
                                        value={3}
                                        name="status"
                                    />
                                    <span className={classes.ghlabel}>却下</span>
                                </div>
                                <div className={componentStyles.submitArea}>
                                    {
                                        disabled ? 
                                            <Button className={componentStyles.disabledButton} style={{ width: '60%' }} disabled={disabled}>
                                                登録中<Loading />
                                            </Button>
                                        :
                                            <Button 
                                                className={componentStyles.submitButton} 
                                                style={{ width: '60%' }} 
                                                type="submit"
                                                onClick={handleSubmit}
                                            >
                                                登録
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

export default HistoryUpdateModal