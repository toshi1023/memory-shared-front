import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { NEWS_CARD } from '../../types/newsTypes';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    title: {
        fontSize: '0.8rem',
        textAlign: 'left',
    },
    content: {
        fontSize: '1rem',
        textAlign: 'left',
        padding: '20px 20px 0 20px'
    }
});

const NewsCard: React.FC<NEWS_CARD> = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title}>
                    {props.data.title}
                </Typography>
                <Typography className={classes.content} color="textSecondary">
                    {props.data.content}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default NewsCard
