import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import products from "../products";
import { listProductDetails } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";

function ProductScreen({ match }) {
  const dispatch = useDispatch()
  const params = useParams();
 
  const productDetails = useSelector(state => state.productDetails)
  const { loading, error, products } = productDetails
  console.log(productDetails)
  useEffect(() => {
    
    dispatch(listProductDetails( params.id))

  }, [dispatch])

  // let product = {}
  let product = products
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {
        loading ?
          < Loader />
          : error
          ?  <Message variant="danger">{ error}</Message>
          : <Row>
          <Col md={6}>
            <Image src={product.image} alt="{product.name}" fluid />
          </Col>
  
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
  
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ₹{product.price}</ListGroup.Item>
              <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>₹{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button className="btn-block" style={{width:'100%'}} disabled={product.countInStock === 0} type='button'>Add to cart</Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      }
      
    </div>
  );
}

export default ProductScreen;
