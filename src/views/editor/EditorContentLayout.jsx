import React, { useRef, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Wrap Responsive with WidthProvider
const ResponsiveGridLayout = WidthProvider(Responsive);

// Define layout for each breakpoint
const layout = {
  xs: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 0, y: 1, w: 1, h: 2 },
    { i: 'c', x: 0, y: 2, w: 1, h: 2 },
    { i: 'd', x: 0, y: 3, w: 1, h: 2 },
    { i: 'e', x: 0, y: 4, w: 1, h: 2 },
  ],
  sm: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'd', x: 2, y: 0, w: 1, h: 2 },
    { i: 'b', x: 0, y: 0, w: 2, h: 2 },
    { i: 'c', x: 0, y: 0, w: 2, h: 4 },
    { i: 'e', x: 0, y: 0, w: 1, h: 4 },
  ],
  md: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 0, y: 0, w: 2, h: 2 },
    { i: 'c', x: 0, y: 0, w: 2, h: 4 },
    { i: 'd', x: 0, y: 0, w: 1, h: 2 },
    { i: 'e', x: 0, y: 0, w: 1, h: 4 },
  ],
  lg: [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 1, y: 0, w: 2, h: 2 },
    { i: 'c', x: 0, y: 0, w: 2, h: 4 },
    { i: 'd', x: 0, y: 0, w: 1, h: 2 },
    { i: 'e', x: 0, y: 0, w: 1, h: 4 },
  ],
};

const cols = {
  xs: 1,
  sm: 2,
  md: 4,
  lg: 4,
};

const breakpoints = {
  xs: 480,
  sm: 767,
  md: 996,
  lg: 1200,
};

const EditorContentLayout = () => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedWidget, setSelectedWidget] = React.useState(null);

  const handleSelectedWidget = (widget) => {
    setSelectedWidget(widget);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragStop = () => {
    setIsDragging(false);
  };

  return (
    <div>
      <ResponsiveGridLayout className="layout" breakpoints={breakpoints} layouts={layout} cols={cols} rowHeight={120} width={120} isResizable={false} isDraggable={true} onDragStart={handleDragStart} onDragStop={handleDragStop}>
        <div key="a" onClick={() => handleSelectedWidget('a')} className={`bg-blue-300 rounded-lg  flex items-center justify-center h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${selectedWidget === 'a' ? 'border-4 border-black' : ''}`}>
          Small Square
        </div>
        <div key="b" onClick={() => handleSelectedWidget('b')} className={`bg-green-300 rounded-lg  flex items-center justify-center h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${selectedWidget === 'b' ? 'border-4 border-black' : ''}`}>
          Horizontal - Rectangle
        </div>
        <div key="c" onClick={() => handleSelectedWidget('c')} className={`bg-rose-300 rounded-lg  flex items-center justify-center h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${selectedWidget === 'c' ? 'border-4 border-black' : ''}`}>
          Large Square
        </div>
        <div key="d" onClick={() => handleSelectedWidget('d')} className={`bg-orange-300 rounded-lg  flex items-center justify-center h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${selectedWidget === 'd' ? 'border-4 border-black' : ''}`}>
          Small Square
        </div>
        <div key="e" onClick={() => handleSelectedWidget('e')} className={`bg-green-300 rounded-lg  flex items-center justify-center h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${selectedWidget === 'e' ? 'border-4 border-black' : ''}`}>
          Vertical - Rectangle
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default EditorContentLayout;
