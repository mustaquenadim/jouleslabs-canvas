import { useRef, useState, useEffect } from 'react';

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
import { AiFillDelete } from 'react-icons/ai';

// imported react konva components
import { Stage, Layer } from 'react-konva';

// stylesheet
import '../styles/Canvas/Canvas.scss';

// imported components
import RectangleShape from '../components/canvas/RectangleShape';
import Properties from '../components/canvas/Properties';
import CircleShape from '../components/canvas/CircleShape';
import StarShape from '../components/canvas/StarShape';
import AddText from '../components/canvas/AddText';
import ShapeSelection from '../components/canvas/ShapeSelection';
import TriangleShape from '../components/canvas/TriangleShape';

// redux
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Canvas = () => {
  const [canvas, setCanvas] = useState({});
  const [shape, setShape] = useState({});
  const [selectedId, selectShape] = useState(null);

  const canvasCollection = useSelector((state) => state.canvas.canvasCollection);
  const { id } = useParams();

  useEffect(() => {
    const canvasData = canvasCollection?.filter((kanvas) => id == kanvas?.id);
    setCanvas(canvasData[0]);
  }, [id, canvasCollection]);

  // creates a new rectangle shape
  const newRect = () => ({
    id: canvas?.shapes?.length + 1,
    name: 'Rectangle 1',
    shape: 'Rectangle',
    x: 250,
    y: 250,
    width: 100,
    height: 100,
    fill: '#D9E7D7',
  });

  // new circle shape
  const newCircle = () => ({
    id: canvas?.shapes?.length + 1,
    name: 'Circle 1',
    shape: 'Circle',
    x: 250,
    y: 250,
    radius: 50,
    fill: '#D9E7D7',
  });

  // new triangle shape
  const newTriangle = () => ({
    id: canvas?.shapes?.length + 1,
    name: 'Triangle 1',
    shape: 'Triangle',
    x: 250,
    y: 250,
    x1: 0,
    y1: 100,
    x2: 100,
    y2: 100,
    x3: 0,
    y3: 0,
    fill: '#D9E7D7',
  });

  // new star shape
  const newStar = () => ({
    id: canvas?.shapes?.length + 1,
    name: 'Star 1',
    shape: 'Star',
    x: 250,
    y: 250,
    numPoints: 5,
    innerRadius: 20,
    outerRadius: 40,
    fill: '#D9E7D7',
  });

  // write text
  const newText = () => ({
    id: canvas?.shapes?.length + 1,
    name: 'Text 1',
    shape: 'Text',
    textEditVisible: false,
    x: 0,
    y: 0,
    width: 400,
    text: 'Simple Text',
    fontFamily: 'Calibri',
    fontSize: 30,
    fontStyle: 'normal',
    align: 'left',
    fill: '#D9E7D7',
  });

  // create a rectangle
  const handleCreateRect = () => {
    const currentShapes = { ...canvas, shapes: [...canvas.shapes, { ...newRect() }] };
    setCanvas(currentShapes);
  };

  // create a circle
  const handleCreateCircle = () => {
    const currentShapes = { ...canvas, shapes: [...canvas.shapes, { ...newCircle() }] };
    setCanvas(currentShapes);
  };

  // create a star
  const handleCreateStar = () => {
    const currentShapes = { ...canvas, shapes: [...canvas.shapes, { ...newStar() }] };
    setCanvas(currentShapes);
  };

  // create a triangle
  const handleCreateTriangle = () => {
    const currentShapes = { ...canvas, shapes: [...canvas.shapes, { ...newTriangle() }] };
    setCanvas(currentShapes);
  };

  // write text
  const handleAddText = () => {
    const currentShapes = { ...canvas, shapes: [...canvas.shapes, { ...newText() }] };
    setCanvas(currentShapes);
  };

  const [newEditedText, setNewEditedText] = useState({});
  const handleTextareaKeyDown = (e) => {
    if (e.keyCode === 13) {
      let { newTextObj } = this.state;

      newTextObj.textEditVisible = false;
      this.setState({
        newTextObj,
      });
    }
  };

  const handleTextEdit = (e) => {
    let { newTextObj } = this.state;
    newTextObj.textValue = e.target.value;
    this.setState({
      newTextObj,
    });
  };

  const handleTextDoubleClick = (e) => {
    const absPos = e.target.getAbsolutePosition();
    let { newTextObj } = this.state;
    newTextObj.textEditVisible = true;
    newTextObj.textX = absPos.x;
    newTextObj.textY = absPos.y;
    this.setState({
      newTextObj,
    });
  };

  // responsive stage
  // const [stageWidth, setStageWidth] = useState(1000);
  // window.resize(fitStageIntoParentContainer());
  // const fitStageIntoParentContainer = () => {
  //   const width = this.container.offsetWidth;
  //   setStageWidth(width);
  // };

  // deselect when clicked on empty area
  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
      setShape({});
    }
  };

  // save canvas
  const handleSaveData = () => {
    console.log('saving data on localstorage!');
    localStorage.setItem('canvas', [...canvas]);
    // localStorage.clear();
  };

  // export canvas
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

  // changing properties
  const onChangeHandler = (e) => {
    if (e.target.name === 'width') {
      console.log(Number(e.target.value));
      const shape = canvas?.shapes?.slice();
      shape[selectedId].width = parseInt(e.target.value);
      setCanvas({ ...canvas, shapes: shape });
    }
    if (e.target.name === 'height') {
      const shape = canvas?.shapes?.slice();
      shape[selectedId].height = Number(e.target.value);
      setCanvas({ ...canvas, shapes: shape });
    }
    if (e.target.name === 'x') {
      const shape = canvas?.shapes?.slice();
      shape[selectedId].x = parseInt(e.target.value);
      setCanvas({ ...canvas, shapes: shape });
    }
    if (e.target.name === 'y') {
      const shape = canvas?.shapes?.slice();
      shape[selectedId].y = Number(e.target.value);
      setCanvas({ ...canvas, shapes: shape });
    }
    if (e.target.name === 'fill') {
      const shape = canvas?.shapes?.slice();
      shape[selectedId].fill = e.target.value;
      setCanvas({ ...canvas, shapes: shape });
    }
  };

  return (
    <>
      <Container id='canvas-page' className='my-5'>
        <Row className='py-4 g-4'>
          {/* left column */}
          <Col md={3}>
            {/* shape dropdown */}
            <ShapeSelection
              handleCreateRect={handleCreateRect}
              handleCreateCircle={handleCreateCircle}
              handleCreateStar={handleCreateStar}
              handleCreateTriangle={handleCreateTriangle}
              handleAddText={handleAddText}
            />
            {/* end shape dropdown */}

            {/* shapes */}
            <Card className='shape-items p-4 border-0'>
              <h3 className='text-center'>Shapes</h3>

              {canvas?.shapes?.map(({ id, name }, key) => (
                <InputGroup key={key} className='mb-3 border d-flex align-items-center'>
                  <FormControl
                    type='text'
                    placeholder='Add a Shape first'
                    defaultValue={name}
                    aria-label='title'
                    aria-describedby='title'
                    className='border-0 shadow-none'
                  />
                  <AiFillDelete className='icon' />
                </InputGroup>
              ))}
            </Card>
            {/* end shapes */}
          </Col>
          {/* end left column */}

          {/* mid column */}
          <Col md={6}>
            {/* canvas title */}
            <InputGroup className='mb-3'>
              <FormControl
                type='text'
                defaultValue={canvas.title}
                placeholder='Enter Canvas Name'
                aria-label='title'
                aria-describedby='title'
                className='border-0 text-center shadow-none'
                plaintext
              />
            </InputGroup>
            {/* end canvas title */}

            {/* canvas */}
            <div
              id='artboard'
              className='border'
              // ref={(node) => {
              //   this.container = node;
              // }}
            >
              <Stage
                // width={this.state.stageWidth}
                width={window.innerWidth}
                height={window.innerHeight}
                onMouseDown={checkDeselect}
                onTouchStart={checkDeselect}
                ref={stageRef}
              >
                <Layer>
                  {canvas?.shapes?.map((shape, key) => {
                    if (shape?.shape === 'Rectangle') {
                      return (
                        <RectangleShape
                          key={key}
                          shapeProps={shape}
                          isSelected={key === selectedId}
                          onSelect={() => {
                            selectShape(key);
                            setShape(shape);
                          }}
                          onChange={(newAttrs) => {
                            const rects = canvas?.shapes?.slice();
                            rects[key] = newAttrs;
                            setCanvas({ ...canvas, shapes: rects });
                            setShape(shape);
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
                            setShape(shape);
                          }}
                          onChange={(newAttrs) => {
                            const circle = canvas?.shapes?.slice();
                            circle[key] = newAttrs;
                            setCanvas({ ...canvas, shapes: circle });
                            setShape(shape);
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
                            setShape(shape);
                          }}
                          onChange={(newAttrs) => {
                            const circle = canvas?.shapes?.slice();
                            circle[key] = newAttrs;
                            setCanvas({ ...canvas, shapes: circle });
                            setShape(shape);
                          }}
                        />
                      );
                    } else if (shape?.shape === 'Star') {
                      return (
                        <StarShape
                          key={key}
                          shapeProps={shape}
                          isSelected={key === selectedId}
                          onSelect={() => {
                            selectShape(key);
                            setShape(shape);
                          }}
                          onChange={(newAttrs) => {
                            const circle = canvas?.shapes?.slice();
                            circle[key] = newAttrs;
                            setCanvas({ ...canvas, shapes: circle });
                            setShape(shape);
                          }}
                        />
                      );
                    } else if (shape?.shape === 'Text') {
                      return (
                        <AddText
                          key={key}
                          shapeProps={shape}
                          isSelected={key === selectedId}
                          onSelect={() => {
                            selectShape(key);
                            setShape(shape);
                          }}
                          onDblClick={(e) => handleTextDoubleClick(e)}
                          onChange={(newAttrs) => {
                            const circle = canvas?.shapes?.slice();
                            circle[key] = newAttrs;
                            setCanvas({ ...canvas, shapes: circle });
                            setShape(shape);
                          }}
                        />
                      );
                    }
                  })}
                </Layer>
              </Stage>
              <textarea
                value={newEditedText.textValue}
                style={{
                  display: newEditedText.textEditVisible ? 'block' : 'none',
                  position: 'absolute',
                  top: newEditedText.y + 'px',
                  left: newEditedText.x + 'px',
                }}
                onChange={(e) => handleTextEdit(e)}
                onKeyDown={(e) => handleTextareaKeyDown(e)}
              />
            </div>
            {/* end canvas */}
          </Col>
          {/* end mid column */}

          {/* right column */}
          <Col md={3}>
            {/* save and export button */}
            <div className='d-flex justify-content-between mb-3'>
              <Button className='save-btn w-100 me-3' onClick={handleSaveData}>
                Save
              </Button>
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
            <Properties selectedId={selectedId} shape={shape} onChangeHandler={onChangeHandler} />
            {/* end properties */}
          </Col>
          {/* end right column */}
        </Row>
      </Container>
    </>
  );
};

export default Canvas;
