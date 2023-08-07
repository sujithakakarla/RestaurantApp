import { Alert, Snackbar } from "@mui/material";
import React from "react";

export default function Notification(props){

    const { notify,setNotify}=props;
    const handleClose = (event,reason)=>{
        if(reason === 'clickaway')
        {
            return;
        }
        setNotify({
            ...notify, isOpen: false
        })
    }

    return(
        <Snackbar autoHideDuration={3000} open={notify.isOpen} anchorOrigin={{vertical:'top', horizontal:'right'}}
        onClose={handleClose}>
            <Alert onClose={handleClose}>
                {notify.message}
            </Alert>
        </Snackbar>
    )
}