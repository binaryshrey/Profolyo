import React, { useRef, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { v4 as uuidv4 } from 'uuid';
import { ToggleGroup, ToggleGroupItem } from '../../components/toggle-group';

const ResponsiveGridLayout = WidthProvider(Responsive);

// Define layout for each breakpoint
const layout = {
  xs: [
    { i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'small' },
    { i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'medium' },
    { i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'large' },
  ],
  sm: [
    { i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'small' },
    { i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'medium' },
    { i: uuidv4(), x: 0, y: 0, w: 2, h: 2, size: 'large' },
  ],
  md: [
    { i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'small' },
    { i: uuidv4(), x: 0, y: 0, w: 2, h: 2, size: 'medium' },
    { i: uuidv4(), x: 0, y: 0, w: 2, h: 4, size: 'large' },
  ],
};

const layoutElementSize = {
  xs: {
    small: { w: 1, h: 2 },
    medium: { w: 1, h: 2 },
    large: { w: 1, h: 2 },
  },
  sm: {
    small: { w: 1, h: 2 },
    medium: { w: 1, h: 2 },
    large: { w: 2, h: 2 },
  },
  md: {
    small: { w: 1, h: 2 },
    medium: { w: 2, h: 2 },
    large: { w: 2, h: 4 },
  },
};

const cols = {
  xs: 1,
  sm: 2,
  md: 4,
};

const breakpoints = {
  xs: 480,
  sm: 767,
  md: 996,
};

const EditorContentLayout = () => {
  const [editorLayout, setEditorLayout] = React.useState(layout);
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedWidget, setSelectedWidget] = React.useState(null);

  const handleSelectedWidget = (widget) => {
    setSelectedWidget(widget);
  };

  const handleDragStart = (layout, oldItem, newItem) => {
    setIsDragging(true);
  };

  const handleDragStop = (layout, oldItem, newItem) => {
    setIsDragging(false);
  };

  const updateLayout = (widget, size) => {
    console.log('initial layout', editorLayout);
    const updatedLayout = { ...editorLayout };

    Object.keys(updatedLayout).forEach((breakpoint) => {
      const sizeAttributes = layoutElementSize[breakpoint][size];
      updatedLayout[breakpoint] = updatedLayout[breakpoint].map((item) => {
        if (item.i === widget.i) {
          return { ...item, w: sizeAttributes.w, h: sizeAttributes.h, size };
        }
        return item;
      });
    });

    console.log('updated layout', updatedLayout);
    setEditorLayout(updatedLayout);
  };

  const widgetSizeToggle = (widget) => {
    return (
      <div className="bg-black w-10 h-40 rounded-full absolute items-center flex flex-col justify-center -ml-11 z-10">
        <ToggleGroup type="single" className="flex flex-col" defaultValue={widget.size}>
          <ToggleGroupItem value="small" size="xs" variant="outlineDark" className="w-8" onClick={() => updateLayout(widget, 'small')}>
            <p className="text-sm">S</p>
          </ToggleGroupItem>
          <ToggleGroupItem value="medium" size="xs" variant="outlineDark" className="w-8" onClick={() => updateLayout(widget, 'medium')}>
            <p className="text-sm">M</p>
          </ToggleGroupItem>
          <ToggleGroupItem value="large" size="xs" variant="outlineDark" className="w-8" onClick={() => updateLayout(widget, 'large')}>
            <p className="text-sm">L</p>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    );
  };

  return (
    <div>
      <ResponsiveGridLayout className="layout" breakpoints={breakpoints} layouts={editorLayout} cols={cols} rowHeight={120} width={120} isResizable={false} isDraggable={true} onDragStart={handleDragStart} onDragStop={handleDragStop}>
        {editorLayout.md.map((item) => (
          <div key={item.i} className="relative" onClick={() => handleSelectedWidget(item)}>
            {selectedWidget?.i === item.i && widgetSizeToggle(item)}
            <div className={`bg-blue-300 rounded-lg  flex items-center justify-center h-full ${isDragging ? 'cursor-grabbing' : 'cursor-pointer'} ${selectedWidget?.i === item.i ? 'border-4 border-black z-100' : ''}`}>{item.size}</div>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default EditorContentLayout;
