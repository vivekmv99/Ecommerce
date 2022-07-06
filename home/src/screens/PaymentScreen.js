import React, { useEffect, useState } from "react";
import { Link, useNavigate, useHistory, useLocation } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions"

function PaymentScreen() {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
  
    const dispatch = useDispatch()
    const history = useNavigate();

    const [ payementMethod, setPaymentMethod ] = useState('PayPal')

    if (!shippingAddress.address){
        history('/shipping')
    }

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(payementMethod))
        history('/placeorder')
        
    }

  return (
    <div>
    <FormContainer >
        
        <CheckoutSteps step1 step2 step3/>

        <Form onSubmit={submitHandler}>

            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check 
                    type='radio' 
                    label='PayPal or Credit Card' 
                    id='paypal'
                    name='paymentMethod'
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    >

                    </Form.Check>
                </Col>
            </Form.Group>

            <Button type="submit" variant="primary">Continue</Button>
        </Form>
    </FormContainer>
    </div>
  )
}

export default PaymentScreen