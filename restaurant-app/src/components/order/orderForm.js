import React, { useEffect, useState } from 'react';
import Form from "../Layouts/Form";
import { Button, ButtonGroup, Grid, InputAdornment } from "@mui/material";
import Input from "../../controls/Input";
import Select from "../../controls/Select";
import ReplayIcon from '@mui/icons-material/Replay';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import styled, { css } from 'styled-components';
import ReorderIcon from '@mui/icons-material/Reorder';
import { createAPIEndpoint, ENDPIONTS } from "../../api/index";
import { roundTo2DecimalPoint } from '../../utils';
import Notification from '../Layouts/Notification';
import Popup from '../Layouts/Popup';
import OrderList from './OrderList';

const pMethods = [
  { id: 'none', title: 'Select' },
  { id: 'Cash', title: 'Cash' },
  { id: 'Card', title: 'Card' },
];

const AdornmentText = styled(InputAdornment)`
  & .MuiTypography-root {
    color: #f3b33d;
    font-weight: bolder;
    font-size: 1.5em;
  }
`;

const SubmitButtonGroup = styled(ButtonGroup)`
  background-color: #f3b33d;
  color: #000;
  margin: ${(props) => props.spacing || '8px'};   & .MuiButton-label {
    text-transform: none;
  }
  &:hover {
    background-color: #f3b33d;
  }
`;

export default function OrderForm(props) {

  const { values,setValues, errors,setErrors, handleInputChange,resetFormControls } = props;
  const [customerList, setCustomerList] = useState([]);
  const [orderListVisibility, setOrderListVisibility] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [notify, setNotify] = useState({ isOpen: false })

  useEffect(() => {
    createAPIEndpoint(ENDPIONTS.CUSTOMER).fetchAll()
      .then((res) => {
             let customerList = res.data.map((item) => ({
                id: item.customerId,
               title: item.customerName,
        }));
        customerList = [{ id: 0, title: 'Select' }].concat(customerList);
        setCustomerList(customerList);
      })
      .catch((err) => console.log(err));
  }, []);
  

  useEffect(()=>{
    let gTotal= values.orderDetails.reduce((tempTotal,item)=>{
        
      return tempTotal + (item.quantity * item.foodItemPrice);
    },0);
    setValues({...values,gTotal: roundTo2DecimalPoint(gTotal)})

  },[JSON.stringify(values.orderDetails)]);


  useEffect(()=>{
    if(orderId==0)
    resetFormControls();
    else{
        createAPIEndpoint(ENDPIONTS.ORDER).fetchById(orderId)
        .then(res=>{
            setValues(res.data);
            setErrors({});
        })
        .catch(err=>console.log(err))
    }
  },[orderId])


  const validateForm=()=>{
    let temp={};
    temp.customerId= values.customerId !=0 ? "":"This Field is Required.";
    temp.pMethod= values.pMethod !="none"? "": "This Filed is Required.";
    temp.orderDetails= values.orderDetails.length !=0 ?" ": "Please select atleast one food Item.";
    setErrors({ ...temp });
    return Object.values(temp).every(x => x === "");
  }


  const resetForm = () => {
    resetFormControls();
    setOrderId(0);
}

  const submitOrder = e => {
    e.preventDefault();
    if (validateForm()) {
        if (values.orderMasterId == 0) {
            createAPIEndpoint(ENDPIONTS.ORDER).create(values)
                .then(res => {
                    resetFormControls();
                    setNotify({isOpen:true, message:'New order is created.'});
                })
                .catch(err => console.log(err));
        }
        else {
            createAPIEndpoint(ENDPIONTS.ORDER).update(values.orderMasterId, values)
                .then(res => {
                    setOrderId(0);
                    setNotify({isOpen:true, message:'The order is updated.'});
                })
                .catch(err => console.log(err));
        }
    }

}

const openListOfOrders = () =>{
  setOrderListVisibility(true);
}

  return (
    <>
    <Form onSubmit={submitOrder}>
      <Grid container> 
        <Grid item xs={6}>
          <Input
            disabled
            label="Order Number"
            name="orderNumber"
            value={values.orderNumber}
            InputProps={{
              startAdornment: <AdornmentText position='start'>#</AdornmentText>,
            }}
          ></Input>
          <Select
            label="Customer"
            name="customerId"
            value={values.customerId}
            onChange={handleInputChange}
            options={customerList}
            error={errors.customerId}
          ></Select>
        </Grid>
        <Grid item xs={6}>
          <Select
            label="Payment Method"
            name="pMethod"
            value={values.pMethod}
            onChange={handleInputChange}
            options={pMethods}
            error={errors.pMethod}
          ></Select>
          <Input
            disabled
            label="Grand Total"
            value={values.gTotal}
            name="gTotal"
            InputProps={{
              startAdornment: <AdornmentText position='start'>$</AdornmentText>,
            }}
          ></Input>
          <SubmitButtonGroup spacing='8px'>
            <Button size='large' endIcon={<RestaurantMenuIcon />} type='submit'>Submit</Button>
            <Button size='small' onClick={resetForm} startIcon={<ReplayIcon />} />
          </SubmitButtonGroup>
          <Button size="large" onClick={openListOfOrders}startIcon={<ReorderIcon />}>Orders</Button>
        </Grid>
      </Grid>
    </Form>
    <Popup title="List of Orders" openPopup={orderListVisibility} setOpenPopup={setOrderListVisibility}>
      <OrderList {...{setOrderId,setOrderListVisibility,resetFormControls,setNotify}} />
    </Popup>
    <Notification {...{notify,setNotify}}/>
    </>
  );
  
}
