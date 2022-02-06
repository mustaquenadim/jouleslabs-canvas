import React from 'react';
import { Line } from 'react-konva';

const TriangleShape = () => {
  return (
    <>
      <Line closed points={[0, 100, 100, 100, 0, 0]} fill='red' />
    </>
  );
};

export default TriangleShape;
