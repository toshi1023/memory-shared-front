import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { selectNewsInfo } from '../../pages/news/newsSlice';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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

const NewsCard: React.FC = () => {
    const classes = useStyles();
    const newsinfo = useSelector(selectNewsInfo);

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title}>
                    {newsinfo.title}
                </Typography>
                <Typography className={classes.content} color="textSecondary">
                    {newsinfo.content}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default NewsCard
