import { Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import React from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export default function Popup(props){

    const{title,children,openPopup, setOpenPopup}=props;


    return(
        <Dialog open={openPopup} maxWidth="md" >
            <DialogTitle>
            <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    <IconButton
                        onClick={() => { setOpenPopup(false) }}>
                        <CloseRoundedIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}