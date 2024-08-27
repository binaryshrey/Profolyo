import React, { useRef, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { EditorLayout } from '../../hooks/EditorContext';
import { ToggleGroup, ToggleGroupItem } from '../../components/toggle-group';
import ProfileInfo from '../widgets/Profile/ProfileInfo';
import ProfileSmall from '../widgets/Profile/ProfileSmall';
import ProfileMedium from '../widgets/Profile/ProfileMedium';
import ProfileLarge from '../widgets/Profile/ProfileLarge';

const ResponsiveGridLayout = WidthProvider(Responsive);

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

const componentMap = {
  ProfileInfo,
  ProfileSmall,
  ProfileMedium,
  ProfileLarge,
};

const EditorContentLayout = ({ userData, rowHeight, layoutMode }) => {
  const { profolyoEditorLayout, updateProfolyoEditorLayout, updateLayoutAfterDrag } = EditorLayout();
  console.log(profolyoEditorLayout);

  const [mode, setMode] = React.useState(layoutMode);
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
    updateLayoutAfterDrag(mode, newItem);
    console.log('layout', layout);
    console.log('newItem', newItem);
    console.log(profolyoEditorLayout);
  };

  // const updateLayout = (widget, size) => {
  //   const updatedLayout = { ...profolyoEditorLayout };

  //   Object.keys(updatedLayout).forEach((breakpoint) => {
  //     const sizeAttributes = layoutElementSize[breakpoint][size];
  //     updatedLayout[breakpoint] = updatedLayout[breakpoint].map((item) => {
  //       if (item.i === widget.i) {
  //         return { ...item, w: sizeAttributes.w, h: sizeAttributes.h, size };
  //       }
  //       return item;
  //     });
  //   });

  //   updateProfolyoEditorLayout(updatedLayout);
  // };

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
      <ResponsiveGridLayout layouts={profolyoEditorLayout} breakpoints={breakpoints} cols={cols} rowHeight={rowHeight} width={120} isResizable={false} isDraggable={true} onDragStart={handleDragStart} onDragStop={handleDragStop}>
        {profolyoEditorLayout[mode]?.map(({ i, x, y, w, h, size, type, component }) => {
          const Component = componentMap[component];
          return (
            <div key={i}>
              <Component userData={userData} clickToAdd={false} />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};

export default EditorContentLayout;
