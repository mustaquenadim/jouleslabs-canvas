import React from 'react';
import { Dropdown } from 'react-bootstrap';

// imported react icons
import { BiRectangle, BiCircle } from 'react-icons/bi';
import { IoTriangleOutline } from 'react-icons/io5';
import { FaRegStar } from 'react-icons/fa';
import { MdFormatShapes } from 'react-icons/md';

const ShapeSelection = ({
  handleCreateRect,
  handleCreateCircle,
  handleCreateTriangle,
  handleCreateStar,
  handleAddText,
}) => {
  return (
    <Dropdown className='mb-3'>
      <Dropdown.Toggle id='shape-dropdown' className='shape-dropdown-toggle w-100 shadow-none'>
        Add Shape
      </Dropdown.Toggle>
      <Dropdown.Menu className='w-100'>
        <Dropdown.Item onClick={handleCreateRect}>
          <BiRectangle className='me-1' /> Rectangle
        </Dropdown.Item>
        <Dropdown.Item onClick={handleCreateCircle}>
          <BiCircle className='me-1' /> Circle
        </Dropdown.Item>
        <Dropdown.Item onClick={handleCreateTriangle}>
          <IoTriangleOutline className='me-1' /> Triangle
        </Dropdown.Item>
        <Dropdown.Item onClick={handleCreateStar}>
          <FaRegStar className='me-1' /> Star
        </Dropdown.Item>
        <Dropdown.Item onClick={handleAddText}>
          <MdFormatShapes className='me-1' /> Text
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ShapeSelection;
