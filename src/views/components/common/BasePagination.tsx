import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import { BASE_PAGINATION } from '../../types/commonTypes';

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > *': {
                marginTop: theme.spacing(2),
            },
        },
    }),
);

/**
 * ページネーション用関数
 * @returns 
 */
const BasePagination: React.FC<BASE_PAGINATION> = (props) => {
    const classes = useStyles();

    /**
     * データ取得
     */
    const handleGetData = (page: number) => {
        props.callback(page);
    }

    return (
        <div className={classes.root}>
            <Pagination 
                count={props.count} 
                onChange={(e, page) => handleGetData(page)}
            />
        </div>
    );
}

export default BasePagination