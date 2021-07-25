import React, { useState } from 'react';
import { SEARCH } from '../../types/commonTypes';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 107,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

/**
 * セレクトボックス用関数
 * @returns 
 */
const SelectBox = (props: SEARCH<string>) => {
    const classes = useStyles();
    const [value, setValue] = useState("");

    /**
     * 選択値の取得
     * @param event 
     */
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValue(event.target.value as string);
        props.callback(event.target.value as string);
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">{props.label}</InputLabel>
            <Select
                labelId="select-label"
                id="select-component"
                value={value}
                onChange={handleChange}
            >
                <MenuItem value="old">古い順</MenuItem>
                <MenuItem value="new">新しい順</MenuItem>
                <MenuItem value="name_asc">名前順(前)</MenuItem>
                <MenuItem value="name_desc">名前順(後)</MenuItem>
            </Select>
        </FormControl>
    )
}

export default SelectBox
