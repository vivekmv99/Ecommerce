import React, { useEffect, useState } from "react";
import { Link, useNavigate, useHistory, useLocation } from "react-router-dom";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const history = useNavigate();

  const location = useLocation();

  const dispatch = useDispatch();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !=  confirmPassword){
        setMessage('Passwords do not match')
    }else{
        dispatch(register(name, email, password));
    }
    
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controId="Name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control  required type='email' placeholder='Enter mail'
                value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

        <Form.Group controId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control required
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controId="passwordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control required
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>Register</Button>
      </Form>
      <Row className='py-3'>
            <Col>
                Have an Account ? <Link to={redirect ? `/lofin?redirect=${redirect}` : `/login`}>
                Sign In
                </Link>
            </Col>
        </Row>

    </FormContainer>
  );
}

export default RegisterScreen;
