import React, { useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { SEARCH } from '../../types/commonTypes';
import { Grid, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
  }),
);

/**
 * 検索用コンポーネント
 * @param props 
 * @returns 
 */
const SearchText = (props: SEARCH<string>) => {
    const classes = useStyles();
    const [value, setValue] = useState<string | null>(null);

    /**
     * 検索の実行
     * @param word 
     */
    const searchHandler = (word: string | null) => {
        if (!word) {
            console.log('nullは実行できません');
            return;
        }
        props.callback(word);
        return;
    }

    /**
     * 入力値の取得
     * @param event 
     */
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    }

    /**
     * Enter key 実行時の処理
     * @param event 
     */
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // エンターキー押下時の処理
            searchHandler(value);
            // submitの無効(ページ再レンダーを無効化)
            event.preventDefault()
        }
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                    <SearchIcon onClick={() => searchHandler(value)} />
                </Grid>
                <Grid item>
                    <TextField label={props.label} onChange={handleChange} onKeyDown={handleKeyDown} />
                </Grid>
            </Grid>
        </div>
    )
}

export default SearchText
