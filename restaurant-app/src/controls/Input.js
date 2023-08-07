import { TextField } from "@mui/material";
import React from "react";

export default function Input(props){

    const {name,value,label,variant,onChange,error=null ,...other}=props;
    return(
<TextField variant={variant || "outlined"} 
label={label} 
name={name}
value={value}
onChange={onChange}
{...other}{...(error &&{error:true, helperText:error})}></TextField>
    )
}