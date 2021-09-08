import React from 'react';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../pages/appSlice';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * ロード用サークルアニメーションを生成する関数
 * @returns 
 */
const Loading: React.FC = () => {
    const isLoading = useSelector(selectLoading);

    return (
        <div>
            {
                isLoading ? 
                    <CircularProgress style={{ color: 'rgb(56, 56, 56)', marginLeft: '10px' }} size={'1rem'} />
                :
                    ''
            }
        </div>
    );
}

export default Loading