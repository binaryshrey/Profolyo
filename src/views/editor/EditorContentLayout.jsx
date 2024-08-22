import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Wrap Responsive with WidthProvider
const ResponsiveGridLayout = WidthProvider(Responsive);

// Define layout for each breakpoint
const layout = {
  xxs: [
    { i: 'a', x: 0, y: 0, w: 1, h: 1 },
    { i: 'b', x: 0, y: 1, w: 1, h: 1 },
    { i: 'c', x: 0, y: 2, w: 1, h: 1 },
    { i: 'd', x: 0, y: 3, w: 1, h: 1 },
  ],
  xs: [
    { i: 'a', x: 0, y: 0, w: 2, h: 2 },
    { i: 'b', x: 0, y: 2, w: 2, h: 2 },
    { i: 'c', x: 0, y: 4, w: 2, h: 2 },
    { i: 'd', x: 0, y: 4, w: 2, h: 2 },
  ],
  sm: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 0, y: 2, w: 2, h: 2 },
    { i: 'c', x: 2, y: 0, w: 2, h: 4 },
    { i: 'd', x: 1, y: 0, w: 1, h: 2 },
  ],
  md: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 0, y: 2, w: 2, h: 2 },
    { i: 'c', x: 2, y: 0, w: 2, h: 4 },
    { i: 'd', x: 1, y: 0, w: 1, h: 2 },
  ],
  lg: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 0, y: 2, w: 2, h: 2 },
    { i: 'c', x: 2, y: 0, w: 2, h: 4 },
    { i: 'd', x: 1, y: 0, w: 1, h: 2 },
  ],
  xl: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 0, y: 2, w: 2, h: 2 },
    { i: 'c', x: 2, y: 0, w: 2, h: 4 },
    { i: 'd', x: 1, y: 0, w: 1, h: 2 },
  ],
};

const cols = {
  xxs: 1,
  xs: 1,
  sm: 4,
  md: 4,
  lg: 4,
  xl: 4,
};

const EditorContentLayout = () => {
  console.log();
  return (
    <div className="overflow-auto w-full p-4 bg-gray-100">
      <ResponsiveGridLayout className="layout" layouts={layout} cols={cols} rowHeight={100} width={100} isResizable={false} isDraggable={true}>
        <div key="a" className="bg-blue-500 text-white flex items-center justify-center h-full">
          Small Square
        </div>
        <div key="b" className="bg-green-500 text-white flex items-center justify-center h-full">
          Rectangle
        </div>
        <div key="c" className="bg-red-500 text-white flex items-center justify-center h-full">
          Large Square
        </div>
        <div key="d" className="bg-red-500 text-white flex items-center justify-center h-full">
          Small Square
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default EditorContentLayout;
