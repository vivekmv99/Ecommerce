import React, { useEffect, useState } from "react"
import { Link, useNavigate, useHistory, useLocation  } from "react-router-dom"
import { Form, Col, Row, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions"


function LoginScreen({  }) {
  const [email, setEmail ] = useState('')
  const [password, setPassword ] = useState('') 
  const history = useNavigate();
  
  const location = useLocation() 

  const dispatch = useDispatch()

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userLogin = useSelector(state => state.userLogin);

  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo){
        history(redirect)

    }
  }, [ history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' placeholder='Enter mail'
                value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter Password'
                value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group> 

            <Button type='submit' variant='primary'>Sing In</Button>
        </Form>
        
        <Row className='py-3'>
            <Col>
                New Customer ? <Link to={redirect ? `/register?redirect=${redirect}` : `/register`}>
                Register
                </Link>
            </Col>
        </Row>

    </FormContainer>
  )
}

export default LoginScreen;
