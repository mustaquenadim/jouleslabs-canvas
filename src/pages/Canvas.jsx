import React, { useRef, useState } from 'react';

// imported fake data
import shapesData from '../data/shapesData.json';
import canvasData from '../data/canvasData.json';

// imported react bootstrap components
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  FormControl,
  InputGroup,
  Row,
} from 'react-bootstrap';

// imported react icons
import { BiRectangle, BiCircle } from 'react-icons/bi';
import { IoTriangleOutline } from 'react-icons/io5';

// imported react konva
import { Stage, Layer } from 'react-konva';

// stylesheet
import '../styles/Canvas/Canvas.scss';

// imported components
import RectangleShape from '../components/canvas/RectangleShape';
import Properties from '../components/canvas/Properties';
import CircleShape from '../components/canvas/CircleShape';
import TriangleShape from '../components/canvas/TriangleShape';

const Canvas = () => {
  const [shapes, setShapes] = useState(shapesData);
  const [selectedId, selectShape] = useState(null);

  // creates a new rectangle shape
  const newRect = () => ({
    id: 1,
    name: 'Rectangle 1',
    shape: 'Rectangle',
    x: 250,
    y: 250,
    width: 100,
    height: 100,
    fill: '#D9E7D7',
  });

  // creates a new circle shape
  const newCircle = () => ({
    id: 1,
    name: 'Circle 1',
    shape: 'Circle',
    x: 0,
    y: 0,
    radius: 50,
    fill: '#D9E7D7',
  });

  // create a rectangle
  const handleCreateRect = (e) => {
    console.log('this is rectangle');
    setShapes([...shapes, { ...newRect() }]);
  };

  // create a circle
  const handleCreateCircle = () => {
    console.log('this is circle');
    setShapes([...shapes, { ...newCircle() }]);
  };

  // deselect when clicked on empty area
  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const downloadURI = (uri, name) => {
    const link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const stageRef = useRef(null);

  const handleExportAsPNG = () => {
    const uri = stageRef.current.toDataURL();
    downloadURI(uri, 'stage.png');
  };

  const handleExportAsSVG = () => {
    alert("Sorry! We're not able to export as SVG.");
  };

  console.log(shapes);

  return (
    <>
      <Container id='canvas-page'>
        <Row className='py-4 g-4'>
          {/* left column */}
          <Col md={3}>
            {/* shape dropdown */}
            <Dropdown className='mb-3'>
              <Dropdown.Toggle
                id='shape-dropdown'
                className='shape-dropdown-toggle w-100 shadow-none'
              >
                Add Shape
              </Dropdown.Toggle>
              <Dropdown.Menu className='w-100'>
                <Dropdown.Item onClick={handleCreateRect}>
                  <BiRectangle className='me-1' /> Rectangle
                </Dropdown.Item>
                <Dropdown.Item onClick={handleCreateCircle}>
                  <BiCircle className='me-1' /> Circle
                </Dropdown.Item>
                <Dropdown.Item>
                  <IoTriangleOutline className='me-1' /> Triangle
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* end shape dropdown */}

            {/* shapes */}
            <Card className='p-4 border-0'>
              <h3 className='text-center'>Shapes</h3>
              <InputGroup className='mb-3 border'>
                <FormControl
                  type='text'
                  placeholder='Add a Shape first'
                  aria-label='title'
                  aria-describedby='title'
                  className='border-0 text-center shadow-none'
                />
              </InputGroup>
            </Card>
            {/* end shapes */}
          </Col>
          {/* end left column */}

          {/* mid column */}
          <Col md={6}>
            {/* canvas */}
            <InputGroup className='mb-3'>
              <FormControl
                type='text'
                defaultValue='Untitled Canvas'
                placeholder='Enter Canvas Name'
                aria-label='title'
                aria-describedby='title'
                className='border-0 text-center shadow-none'
                plaintext
              />
            </InputGroup>
            <div id='artboard' className='border'>
              <Stage
                width={500}
                height={500}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
                ref={stageRef}
              >
                <Layer>
                  {shapes.map((shape, key) => {
                    if (shape?.shape === 'Rectangle') {
                      return (
                        <RectangleShape
                          key={key}
                          shapeProps={shape}
                          isSelected={key === selectedId}
                          onSelect={() => {
                            selectShape(key);
                          }}
                          onChange={(newAttrs) => {
                            const rects = shapes.slice();
                            rects[key] = newAttrs;
                            setShapes(rects);
                          }}
                        />
                      );
                    } else if (shape?.shape === 'Circle') {
                      return (
                        <CircleShape
                          key={key}
                          shapeProps={shape}
                          isSelected={key === selectedId}
                          onSelect={() => {
                            selectShape(key);
                          }}
                          onChange={(newAttrs) => {
                            const rects = shapes.slice();
                            rects[key] = newAttrs;
                            setShapes(rects);
                          }}
                        />
                      );
                    } else if (shape?.shape === 'Triangle') {
                      return (
                        <TriangleShape
                          key={key}
                          shapeProps={shape}
                          isSelected={key === selectedId}
                          onSelect={() => {
                            selectShape(key);
                          }}
                          onChange={(newAttrs) => {
                            const rects = shapes.slice();
                            rects[key] = newAttrs;
                            setShapes(rects);
                          }}
                        />
                      );
                    }
                  })}
                </Layer>
              </Stage>
            </div>
            {/* end canvas */}
          </Col>
          {/* end mid column */}

          {/* right column */}
          <Col md={3}>
            {/* save and export button */}
            <div className='d-flex justify-content-between mb-3'>
              <Button className='save-btn w-100 me-3'>Save</Button>
              <Dropdown className='w-100'>
                <Dropdown.Toggle id='export-dropdown' className='export-dropdown-toggle w-100'>
                  Export
                </Dropdown.Toggle>
                <Dropdown.Menu className='w-100'>
                  <Dropdown.Item onClick={handleExportAsPNG}>PNG</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleExportAsSVG}>SVG</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {/* end save and export button */}

            {/* properties */}
            <Properties />
            {/* end properties */}
          </Col>
          {/* end right column */}
        </Row>
      </Container>
    </>
  );
};

export default Canvas;
