import React, { useState } from 'react';
import _ from 'lodash';
import ComponentStyles from '../../../styles/common/componentStyle';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import { GROUP_MODAL } from '../../types/usersTypes';

import group_list from '../../../data/group_list_data.json';

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
    const [selectedValue, setSelectedValue] = useState(group_list[0].id);

    /**
     * グループの選択変更
     * @param value 
     */
    const handleChange = (value: number) => {
        setSelectedValue(value);
    };

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
                                    _.map(group_list, value => (
                                        <div 
                                            className={classes.groupListBox} 
                                            key={value.id} 
                                            onClick={() => handleChange(value.id)}
                                            style={selectedValue === value.id ? { background: '#f8cf77', color: 'white' } : undefined}
                                        >
                                            <div style={{ width: '15%' }}>
                                                <Avatar src={value.image_file} className={classes.avatar} />
                                            </div>
                                            <div style={{ width: '75%', alignItems: 'center' }}>
                                                <Typography>{value.name}</Typography>
                                            </div>
                                            <div style={{ width: '20%' }}>
                                                <Typography>
                                                    {
                                                        value.private_flg ? 
                                                            <span className={classes.privateTrue}>公開</span>
                                                        :
                                                            <span className={classes.privateFalse}>非公開</span>
                                                    }
                                                </Typography>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={classes.submitArea}>
                                <Button className={componentStyles.submitButton} style={{ width: '50%' }}>
                                    招待
                                </Button>
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
                                    _.map(group_list, value => (
                                        <div 
                                            className={classes.groupListBox} 
                                            key={value.id} 
                                            onClick={() => handleChange(value.id)}
                                            style={selectedValue === value.id ? { background: '#f8cf77', color: 'white' } : undefined}
                                        >
                                            <div style={{ width: '20%' }}>
                                                <Avatar src={value.image_file} className={classes.avatar} />
                                            </div>
                                            <div style={{ width: '60%', alignItems: 'center' }}>
                                                <Typography>{value.name}</Typography>
                                            </div>
                                            <div style={{ width: '20%' }}>
                                                <Typography>
                                                    {
                                                        value.private_flg ? 
                                                            <span className={classes.privateTrue}>公開</span>
                                                        :
                                                            <span className={classes.privateFalse}>非公開</span>
                                                    }
                                                </Typography>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className={classes.submitArea}>
                                <Button className={componentStyles.submitButton} style={{ width: '50%' }}>
                                    招待
                                </Button>
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
                                        _.map(group_list, value => (
                                            <div 
                                                className={classes.groupListBox} 
                                                key={value.id} 
                                                onClick={() => handleChange(value.id)}
                                                style={selectedValue === value.id ? { background: '#f8cf77', color: 'white' } : undefined}
                                            >
                                                <div style={{ width: '20%' }}>
                                                    <Avatar src={value.image_file} className={classes.avatar} />
                                                </div>
                                                <div style={{ width: '55%', alignItems: 'center' }}>
                                                    <Typography>{value.name}</Typography>
                                                </div>
                                                <div style={{ width: '25%' }}>
                                                    <Typography>
                                                        {
                                                            value.private_flg ? 
                                                                <span className={classes.privateTrue}>公開</span>
                                                            :
                                                                <span className={classes.privateFalse}>非公開</span>
                                                        }
                                                    </Typography>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className={classes.submitArea}>
                                    <Button className={componentStyles.submitButton} style={{ width: '70%' }}>
                                        招待
                                    </Button>
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
