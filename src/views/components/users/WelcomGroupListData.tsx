import React from 'react';
import { useHistory } from "react-router-dom";
import ComponentStyles from '../../../styles/common/componentStyle';
import _ from 'lodash';
import { WELCOME_GROUP_LIST_DATA } from '../../types/usersTypes';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 300,
            '&:hover': {
                background: "rgb(209, 208, 208)",
            },
            marginBottom: theme.spacing(2)
        },
        media: {
            height: 130,
        }
    })
);

const WelcomeGroupListData: React.FC<WELCOME_GROUP_LIST_DATA> = (props) => {
    const classes = useStyles();
    const componentStyles = ComponentStyles();
    const history = useHistory();

    return (
        <div>
            {/* PC版 & iPad版 */}
            <Hidden xsDown>
                <Grid container spacing={2}>
                {_.map(props.data, value => (
                    <Grid item sm={6} lg={4} key={value.id}>
                        <Card className={classes.root} onClick={() => history.push(`/groups/${value.name}/${value.id}`)}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={value.image_url}
                                    title={value.image_file}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h4">
                                        {value.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" className={componentStyles.albums}>
                                        {value.albums ? value.albums.length : 0}<span className={componentStyles.unit}>個のアルバムを作成中</span>
                                    </Typography>
                                    <Typography component="p" className={componentStyles.participants}>
                                        {value.group_histories ? value.group_histories.length : 0}<span className={componentStyles.unit}>人参加中</span>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
                </Grid>
            </Hidden>

            {/* スマホ版 */}
            <Hidden smUp>
                <Grid container justify="center" spacing={2}>
                {_.map(props.data, value => (
                    <Grid item xs={10} key={value.id}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={value.image_url}
                                    title={value.image_file}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6" component="h4">
                                        {value.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p" className={componentStyles.albums}>
                                        {value.albums ? value.albums.length : 0}<span className={componentStyles.unit}>個のアルバムを作成中</span>
                                    </Typography>
                                    <Typography component="p" className={componentStyles.participants}>
                                        {value.group_histories ? value.group_histories.length : 0}<span className={componentStyles.unit}>人参加中</span>
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
                </Grid>
            </Hidden>
        </div>
    );
}

export default WelcomeGroupListData