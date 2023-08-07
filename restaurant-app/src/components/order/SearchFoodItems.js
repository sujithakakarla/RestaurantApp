import React, { useEffect, useState } from "react";
import { ENDPIONTS, createAPIEndpoint } from "../../api";
import { IconButton, InputBase, List, ListItem, ListItemSecondaryAction, ListItemText, Paper, makeStyles } from "@mui/material";
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import styled from "styled-components";
import PlusOneTwoToneIcon from '@mui/icons-material/PlusOneTwoTone';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';

export default function SearchFoodItems(props)
{
    const{values,setValues}=props;
    
    let orderedFoodItems= values.orderDetails;

    const [foodItems, setFoodItems]= useState([]);
    const [searchList, setSearchList]= useState([]);
    const [searchKey, setSearchKey]= useState('');
    
useEffect(()=>{
createAPIEndpoint(ENDPIONTS.FOODITEM).fetchAll().
then(res=>{
    setFoodItems(res.data)
    setSearchList(res.data)
}).catch(err=>console.log(err))
    },[])


    useEffect(()=>{
        let x= [...foodItems];
        x=x.filter(y=>{
            return y.foodItemName.toLowerCase().includes(searchKey.toLocaleLowerCase())
            && orderedFoodItems.every(item => item.foodItemId != y.foodItemId)
            
        });
        setSearchList(x);

    },[searchKey, orderedFoodItems])

    const addFoodItem= foodItem =>{
        let x={
            orderMasterId: values.orderMasterId,
            orderDetailId:0,
            foodItemId:foodItem.foodItemId,
            quantity:1,
            foodItemPrice: foodItem.price,
            foodItemName: foodItem.foodItemName
        }
        setValues({
            ...values, orderDetails: [...values.orderDetails, x]
        })
    }
    return(
<>

        <Paper style={{padding:'2px 4px',alignItems:'center',display:'flex'}}>
            <InputBase style={{flex:1}}value={searchKey}placeholder="Search Food Items" onChange={e=>setSearchKey(e.target.value)}></InputBase>
            <IconButton><SearchTwoToneIcon></SearchTwoToneIcon></IconButton>
        </Paper>
         <List>
            {
            searchList.map((item,idx)=>(
                    <ListItem key={idx} onClick={e=> addFoodItem(item)}>
                        <ListItemText primary={item.foodItemName}
                        secondary={'$'+ item.price}></ListItemText>

                        <ListItemSecondaryAction>
                            <IconButton onClick={e=> addFoodItem(item)}>
                                <PlusOneTwoToneIcon/>
                            <ArrowForwardIosTwoToneIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                        
                    </ListItem>
            ))
            }
            
        </List>

        </>
    )
}