import React, { useEffect, useState } from 'react';

// imported react router
import { Link } from 'react-router-dom';

// imported react bootstrap
import { Card, Col, Container, Row } from 'react-bootstrap';

// home page stylesheet
import '../styles/home/home.scss';

// imported fake data
import canvassesData from '../data/canvassesData.json';

const Home = () => {
  const [canvasses, setCanvasses] = useState([]);

  useEffect(() => {
    setCanvasses(canvassesData);
  }, []);

  // handle create new canvas
  const handleCreateNewCanvas = () => {
    console.log('handleCreateNewCanvas, creates a new canvas');
  };

  return (
    <>
      <Container id='home-page'>
        <div id='my-canvasses'>
          <h2>My Canvasses</h2>
          <Row md={4}>
            <Col>
              <Card
                className='d-flex align-items-center justify-content-center'
                onClick={handleCreateNewCanvas}
              >
                <Card.Title as='h3' className='text-center'>
                  Create a new Canvas
                </Card.Title>
              </Card>
            </Col>
            {canvasses?.map(({ id, title }, key) => (
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
