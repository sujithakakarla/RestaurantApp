import styled from '@emotion/styled';
import React from "react";

const useStyles = styled(theme=>({
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: theme.spacing(1)
        }
    }
}))
export default function Form(props){

    const classes= useStyles();
    const {children, ...other}=props;
    return(
        <form className={classes.root} noValidate autoComplete="off" {...other}>
            {children}
        </form>
    )
}