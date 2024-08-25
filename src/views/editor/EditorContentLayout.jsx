import React, { useRef, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { v4 as uuidv4 } from 'uuid';
import { ToggleGroup, ToggleGroupItem } from '../../components/toggle-group';

const ResponsiveGridLayout = WidthProvider(Responsive);

const layout = {
  xs: [
    { i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'small', text: 'xs:Small' },
    { i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'medium', text: 'xs:Medium' },
    { i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'large', text: 'xs:Large' },
    { i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'empty', text: 'xs:Empty' },
  ],
  sm: [
    { i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'small', text: 'sm:Small' },
    { i: uuidv4(), x: 0, y: 0, w: 2, h: 2, size: 'medium', text: 'sm:Medium' },
    { i: uuidv4(), x: 0, y: 0, w: 4, h: 4, size: 'large', text: 'sm:Large' },
    { i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'empty', text: 'sm:Empty' },
  ],
  md: [
    { i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'small', text: 'md:Small' },
    { i: uuidv4(), x: 0, y: 0, w: 2, h: 2, size: 'medium', text: 'md:Medium' },
    { i: uuidv4(), x: 0, y: 0, w: 2, h: 4, size: 'large', text: 'md:Large' },
    { i: uuidv4(), x: 0, y: 99, w: 1, h: 2, size: 'empty', text: 'md:Empty' },
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
    medium: { w: 2, h: 2 },
    large: { w: 4, h: 4 },
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
  md: 1023,
};

const EditorContentLayout = ({ rowHeight, layoutMode }) => {
  const [editorLayout, setEditorLayout] = React.useState(layout);
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedWidget, setSelectedWidget] = React.useState(null);
  const [mode, setMode] = React.useState(layoutMode);

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
      <ResponsiveGridLayout className="layout" breakpoints={breakpoints} layouts={editorLayout} cols={cols} rowHeight={rowHeight} width={120} isResizable={false} isDraggable={true} onDragStart={handleDragStart} onDragStop={handleDragStop}>
        {editorLayout[mode]?.map((item) =>
          item?.size !== 'empty' ? (
            <div key={item.i} className="relative" onClick={() => handleSelectedWidget(item)}>
              {selectedWidget?.i === item.i && widgetSizeToggle(item)}
              <div className={`bg-blue-300 rounded-lg  flex items-center justify-center h-full ${isDragging ? 'cursor-grabbing' : 'cursor-pointer'} ${selectedWidget?.i === item.i ? 'border-4 border-black z-100' : ''}`}>{item.text}</div>
            </div>
          ) : (
            <div key={item.i} className={`border border-2 border-dashed border-blue-300 bg-blue-100 rounded-lg  flex items-center justify-center h-full ${isDragging ? 'cursor-grabbing' : 'cursor-pointer'} ${selectedWidget?.i === item.i ? 'border-4 border-black z-100' : ''}`}>
              Add Widget
            </div>
          ),
        )}
      </ResponsiveGridLayout>
    </div>
  );
};

export default EditorContentLayout;
