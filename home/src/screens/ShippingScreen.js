import React, { useEffect, useState } from "react";
import { Link, useNavigate, useHistory, useLocation } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions"


function ShippingScreen() {

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const dispatch = useDispatch()
  const history = useNavigate();


  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
      e.preventDefault()
      // console.log('submited')
      dispatch(saveShippingAddress({address, city, postalCode, country}))
      history('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>

      <Form.Group controId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Address"
            value={address ? address : ''}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controId="city">
          <Form.Label>city</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="city"
            value={city ? city : ''}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controId="postalCode">
          <Form.Label>Postal code</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Postal code"
            value={postalCode ? postalCode : ''}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controId="country">
          <Form.Label>country</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="country"
            value={country ? country : ''}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>Continue</Button>


      </Form>
    </FormContainer>
  )
}

export default ShippingScreen