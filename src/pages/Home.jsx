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

const Home = () => {
  const dispatch = useDispatch();
  const canvasCollection = useSelector((state) => state.canvas.canvasCollection);
  console.log(canvasCollection);

  const newCanvas = () => ({
    id: canvasCollection.length + 1,
    title: 'Untitled Canvas',
    description: 'My First Canvas',
    shapes: [
      {
        id: 1,
        name: 'Rectangle 1',
        shape: 'Rectangle',
        x: 250,
        y: 250,
        width: 100,
        height: 100,
        fill: '#040404',
      },
    ],
  });

  return (
    <>
      <Container id='home-page'>
        <div id='my-canvasses'>
          <h2>My Canvasses</h2>
          <Row md={4}>
            <Col>
              <Card
                className='d-flex align-items-center justify-content-center'
                onClick={() => dispatch(createCanvas(newCanvas()))}
              >
                <Link to='canvas/1'>
                  <Card.Title as='h3' className='text-center'>
                    Create a new Canvas
                  </Card.Title>
                </Link>
              </Card>
            </Col>
            {canvasCollection?.map(({ id, title }, key) => (
              <Col key={key}>
                <Link to={`canvas/${id}`} className='text-decoration-none'>
                  <Card className='d-flex align-items-center justify-content-center'>
                    <Card.Title className='text-center'>{title}</Card.Title>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Home;
