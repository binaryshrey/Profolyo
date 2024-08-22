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
    { i: 'e', x: 0, y: 3, w: 1, h: 1 },
  ],
  xs: [
    { i: 'a', x: 0, y: 0, w: 2, h: 2 },
    { i: 'b', x: 0, y: 2, w: 2, h: 2 },
    { i: 'c', x: 0, y: 4, w: 2, h: 2 },
    { i: 'd', x: 0, y: 4, w: 2, h: 2 },
    { i: 'e', x: 0, y: 3, w: 2, h: 2 },
  ],
  sm: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 0, y: 2, w: 2, h: 2 },
    { i: 'c', x: 2, y: 0, w: 2, h: 4 },
    { i: 'd', x: 1, y: 0, w: 1, h: 2 },
    { i: 'e', x: 0, y: 3, w: 1, h: 4 },
  ],
  md: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 0, y: 2, w: 2, h: 2 },
    { i: 'c', x: 2, y: 0, w: 2, h: 4 },
    { i: 'd', x: 1, y: 0, w: 1, h: 2 },
    { i: 'e', x: 0, y: 3, w: 1, h: 4 },
  ],
  lg: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 0, y: 2, w: 2, h: 2 },
    { i: 'c', x: 2, y: 0, w: 2, h: 4 },
    { i: 'd', x: 1, y: 0, w: 1, h: 2 },
    { i: 'e', x: 0, y: 3, w: 1, h: 4 },
  ],
  xl: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 0, y: 2, w: 2, h: 2 },
    { i: 'c', x: 2, y: 0, w: 2, h: 4 },
    { i: 'd', x: 1, y: 0, w: 1, h: 2 },
    { i: 'e', x: 0, y: 3, w: 1, h: 4 },
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
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragStop = () => {
    setIsDragging(false);
  };

  console.log();
  return (
    <div className="bg-gray-200 ">
      <ResponsiveGridLayout className="layout" layouts={layout} cols={cols} rowHeight={100} width={100} isResizable={false} isDraggable={true} onDragStart={handleDragStart} onDragStop={handleDragStop}>
        <div key="a" className={`bg-blue-300 rounded-lg  flex items-center justify-center h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
          Small Square
        </div>
        <div key="b" className={`bg-green-300 rounded-lg  flex items-center justify-center h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
          Horizontal - Rectangle
        </div>
        <div key="c" className={`bg-rose-300 rounded-lg  flex items-center justify-center h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
          Large Square
        </div>
        <div key="d" className={`bg-orange-300 rounded-lg  flex items-center justify-center h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
          Small Square
        </div>
        <div key="e" className={`bg-green-300 rounded-lg  flex items-center justify-center h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
          Vertical - Rectangle
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default EditorContentLayout;
