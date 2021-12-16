import React, { useEffect, useState } from 'react';
import CircularProgress, { CircularProgressProps } from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { CIRCULAR_COUNT } from '../../types/commonTypes';

const CircularProgressWithLabel = (props: CircularProgressProps & { value: number }) => {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props} />
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
                case 200:
                    setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 50));
                    break;
                case 400:
                    setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 25));
                    break;
                case 600:
                    setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 15));
                    break;
                case 1000:
                    setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
                    break;
            }
        }, props.data);
        return () => {
            clearInterval(timer);
        };
    }, []);

  return <CircularProgressWithLabel value={progress} />;
}

export default CircularCount