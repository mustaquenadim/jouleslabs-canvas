import React from 'react';
import { Card, FormControl, InputGroup } from 'react-bootstrap';

const Properties = () => {
  return (
    <div>
      <Card className='p-3 border-0'>
        <h3 className='text-center'>Properties</h3>
        <InputGroup className='mb-3'>
          <InputGroup.Text id='shape' className='bg-white border-0'>
            Shape
          </InputGroup.Text>
          <FormControl
            type='text'
            defaultValue='Rectangle'
            placeholder='Enter Shape'
            aria-label='shape'
            aria-describedby='shape'
            className='border-0 text-end shadow-none'
          />
        </InputGroup>

        <InputGroup className='mb-3'>
          <InputGroup.Text id='width' className='bg-white border-0'>
            Width
          </InputGroup.Text>
          <FormControl
            type='number'
            defaultValue='123'
            min='0'
            placeholder='Enter Width'
            aria-label='width'
            aria-describedby='width'
            className='border-0 text-end shadow-none'
          />
        </InputGroup>

        <InputGroup className='mb-3'>
          <InputGroup.Text id='height' className='bg-white border-0'>
            Height
          </InputGroup.Text>
          <FormControl
            type='number'
            defaultValue='123'
            min='0'
            placeholder='Enter Height'
            aria-label='height'
            aria-describedby='height'
            className='border-0 text-end shadow-none'
          />
        </InputGroup>

        <InputGroup className='mb-3'>
          <InputGroup.Text id='x-axis' className='bg-white border-0'>
            X Axis
          </InputGroup.Text>
          <FormControl
            type='number'
            defaultValue='123'
            placeholder='Enter X'
            aria-label='x-axis'
            aria-describedby='x-axis'
            className='border-0 text-end shadow-none'
          />
        </InputGroup>

        <InputGroup className='mb-3'>
          <InputGroup.Text id='y-axis' className='bg-white border-0'>
            Y Axis
          </InputGroup.Text>
          <FormControl
            type='number'
            defaultValue='123'
            placeholder='Enter Y'
            aria-label='y-axis'
            aria-describedby='y-axis'
            className='border-0 text-end shadow-none'
          />
        </InputGroup>

        <InputGroup className='mb-3'>
          <InputGroup.Text id='color' className='bg-white border-0'>
            Color
          </InputGroup.Text>
          <FormControl
            type='color'
            defaultValue='#D9E7D7'
            placeholder='Enter Color'
            aria-label='color'
            aria-describedby='color'
            className='border-0 text-end shadow-none'
          />
        </InputGroup>
      </Card>
    </div>
  );
};

export default Properties;
