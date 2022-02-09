import React from 'react';

// imported react router
import { Link } from 'react-router-dom';

// imported react bootstrap
import { Card, Col, Container, Row } from 'react-bootstrap';

// home page stylesheet
import '../styles/home/home.scss';

// redux
import { createCanvas } from '../redux/slice/canvasSlice';
import { useSelector, useDispatch } from 'react-redux';
import { FaShapes } from 'react-icons/fa';

const Home = () => {
  const dispatch = useDispatch();
  const canvasCollection = useSelector((state) => state.canvas.canvasCollection);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  console.log(isAuthenticated);

  const newCanvas = () => ({
    id: canvasCollection.length + 1,
    title: 'Untitled Canvas',
    description: 'My First Canvas',
    shapes: [],
  });

  return (
    <>
      {!isAuthenticated && (
        <div id='landing-page'>
          <h1 className='text-white'>Welcome to JoulesLabs Canvas</h1>
          <h5 className='text-uppercase'>Draw your imagination</h5>
        </div>
      )}
      {isAuthenticated && (
        <Container>
          <div id='your-canvases' className='my-5'>
            <h2>Your Canvases</h2>
            <Row md={4} className='g-4'>
              <Col>
                <Link to={`canvas/${canvasCollection.length + 1}`} className='text-decoration-none'>
                  <Card
                    className='d-flex align-items-center justify-content-center p-4 shadow border-0'
                    onClick={() => dispatch(createCanvas(newCanvas()))}
                  >
                    <Card.Title as='h4' className='text-center'>
                      Create a new Canvas
                    </Card.Title>
                    <FaShapes className='icon' />
                  </Card>
                </Link>
              </Col>
              {canvasCollection?.map(({ id, title }, key) => (
                <Col key={key}>
                  <Link to={`canvas/${id}`} className='text-decoration-none'>
                    <Card className='d-flex align-items-center justify-content-center p-4 shadow border-0'>
                      <Card.Title className='text-center'>{title}</Card.Title>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      )}
    </>
  );
};

export default Home;
