import React from 'react'
//import { List, ListItemText, Paper, ListItem, ListItemSecondaryAction, IconButton, ButtonGroup, Button } from '@material-ui/core';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Button, ButtonGroup, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Paper } from '@mui/material';
import { roundTo2DecimalPoint } from '../../utils';
import styled from 'styled-components';

const StyledPaper = styled(Paper)`
  margin: 15px 0px;
  &:hover {
    cursor: pointer;
  }
  &:hover .deleteButton {
    display: block;
  }
`;
const StyledButtonGroup = styled(ButtonGroup)`
  background-color: #E3E3E3;
  border-radius: 8px;
  & .MuiButtonBase-root {
    border: none;
    min-width: 25px;
    padding: 1px;
  }
  & button:nth-child(2) {
    font-size: 1.2em;
    color: #000;
  }
`;

const TotalPerItem = styled.span`
  font-weight: bolder;
  font-size: 1.2em;
  margin: 0px 10px;
`;
export default function OrderedFoodItems(props) {

    const { values,setValues} = props;
    let orderedFoodItems= values.orderDetails;

    const removeFoodItem = (index,id)=>{
        let x= {...values};
        x.orderDetails=x.orderDetails.filter((_,i)=> i!=index);
        setValues({...x});
    }

    const updateQuantity=(idx,value)=>{
        let x= {...values};
        let foodItem = x.orderDetails[idx];
        if(foodItem.quantity + value > 0)
        {
            foodItem.quantity += value;
            setValues({...x});
        }

    }

    return (
        
        <List>
            {
                orderedFoodItems.length ==0 ?
                <ListItem>
                    <ListItemText primary="Please select Food Items"
                    primaryTypographyProps={{
                        style:{
                            textAlign:'center',
                            fontStyle:'italic'
                        }
                    }}
                    />
                </ListItem>
       
       : orderedFoodItems.map((item, idx) => (
                    <StyledPaper key={idx} >
                        <ListItem>
                            <ListItemText
                                primary={item.foodItemName}
                                primaryTypographyProps={{
                                component:'h1',
                                style:{
                                    fontWeight:'500',
                                    fontSize:'1.2em'
                                }
                               }}
                               secondary={
                                <>
                                <StyledButtonGroup size='small' className='ButtonGroup'>
                                    <Button onClick={e=>updateQuantity(idx,-1)}>-</Button>
                                    <Button disabled>{item.quantity}</Button>
                                    <Button onClick={e=>updateQuantity(idx,+
                                        1)}>+</Button>

                                </StyledButtonGroup>
                                <TotalPerItem>{'$'+ roundTo2DecimalPoint(item.quantity * item.foodItemPrice)}</TotalPerItem>
                                </>
                               }
                               secondaryTypographyProps={{
                                component:'div'
                               }}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    disableRipple onClick={e=> removeFoodItem(idx,item.orderDetailsId)}
                                >
                                    <DeleteTwoToneIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </StyledPaper>
                ))
            }
        </List>
        
    )
}