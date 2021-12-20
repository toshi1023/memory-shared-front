import React, { useEffect, useState } from 'react';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { CIRCULAR_COUNT } from '../../types/commonTypes';

const CircularProgressWithLabel = (props: CircularProgressProps & { value: number }) => {
    return (
        <Grid container justify="center">
            <Hidden xsDown>
                <Grid item sm={11}>
                    <Box style={{ margin: '0 auto' }} display="inline-flex">
                        <CircularProgress 
                            style={{ width: '10vw', height: 'auto' }}
                            variant="determinate" {...props} />
                        <Box
                            top={0}
                            left={0}
                            bottom={0}
                            right={0}
                            position="absolute"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography variant="caption" component="div" color="textSecondary" style={{ fontSize: '1.2rem' }}>
                                {`${Math.round(props.value,)}%`}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Hidden>
            <Hidden smUp>
                <Grid item xs={11}>
                    <Box style={{ margin: '0 auto' }} display="inline-flex">
                        <CircularProgress 
                            style={{ width: '15vw', height: 'auto' }}
                            variant="determinate" {...props} />
                        <Box
                            top={0}
                            left={0}
                            bottom={0}
                            right={0}
                            position="absolute"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography variant="caption" component="div" color="textSecondary">
                                {`${Math.round(props.value,)}%`}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Hidden>
        </Grid>
    );
}

/**
 * 画像・動画アップロード時の進捗率表示用関数
 * @param props 
 * @returns 
 */
const CircularCount: React.FC<CIRCULAR_COUNT> = (props) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            switch(props.data) {
                case 2000:
                    setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 50));
                    break;
                case 4000:
                    setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 25));
                    break;
                case 6000:
                    setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 15));
                    break;
                case 10000:
                    setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
                    break;
            }
        }, 900);
        return () => {
            clearInterval(timer);
        };
    }, []);

  return <CircularProgressWithLabel value={progress} />;
}

export default CircularCount