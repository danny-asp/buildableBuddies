import { useParams, useNavigate } from "react-router-dom";
import React, {useState} from "react";
import {  useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice.js";
import Rating from "../components/Rating";
import Message from "../components/Message.jsx";
import Loader from "../components/Loader.jsx";

import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id: productId } = useParams();
  
  const [qty, setQty] = useState(1)

  const {data:product, isLoading, error} = useGetProductDetailsQuery(productId)

  const addToCartHandler = () => {
    dispatch(addToCart({...product, qty}))
    navigate("/cart")
  }


  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Back
      </Link>
      {isLoading ? <Loader/> : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (<><Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>Item description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>
                    Qty:
                    </Col>
                    <Col>
                    <Form.Control as="select" value={qty} onChange={(e)=>setQty(Number(e.target.value))}>
                      {[...Array(product.countInStock).keys()].map((key)=> (
                        <option key={key}>{key + 1}</option>
                      ))}
                    </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button onClick={addToCartHandler} className="btn btn-block" type="button" disabled={product.countInStock === 0} >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row></>)}
      
    </>
  );
};

export default ProductScreen;
