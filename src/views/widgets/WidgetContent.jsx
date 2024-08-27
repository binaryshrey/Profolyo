import React, { useRef, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { v4 as uuidv4 } from 'uuid';
import ProfileInfo from './Profile/ProfileInfo';
import ProfileSmall from './Profile/ProfileSmall';
import ProfileMedium from './Profile/ProfileMedium';
import ProfileLarge from './Profile/ProfileLarge';

const ResponsiveGridLayout = WidthProvider(Responsive);

const layout = {
  xs: [
    { i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'content', text: 'xs:content' },
    { i: uuidv4(), x: 1, y: 0, w: 1, h: 2, size: 'small', text: 'xs:Small' },
    { i: uuidv4(), x: 0, y: 1, w: 2, h: 2, size: 'medium', text: 'xs:Medium' },
    { i: uuidv4(), x: 2, y: 0, w: 2, h: 4, size: 'large', text: 'xs:Large' },
  ],
  sm: [
    { i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'content', text: 'sm:content' },
    { i: uuidv4(), x: 1, y: 0, w: 1, h: 2, size: 'small', text: 'sm:Small' },
    { i: uuidv4(), x: 0, y: 1, w: 2, h: 2, size: 'medium', text: 'sm:Medium' },
    { i: uuidv4(), x: 2, y: 0, w: 2, h: 4, size: 'large', text: 'sm:Large' },
  ],
  md: [
    { i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'small', type: 'ProfileInfo', component: 'ProfileInfo' },
    { i: uuidv4(), x: 1, y: 0, w: 1, h: 2, size: 'small', type: 'ProfileSmall', component: 'ProfileSmall' },
    { i: uuidv4(), x: 0, y: 1, w: 2, h: 2, size: 'medium', type: 'ProfileMedium', component: 'ProfileMedium' },
    { i: uuidv4(), x: 2, y: 0, w: 2, h: 4, size: 'large', type: 'ProfileLarge', component: 'ProfileLarge' },
  ],
};

const componentMap = {
  ProfileInfo,
  ProfileSmall,
  ProfileMedium,
  ProfileLarge,
};

const cols = {
  xs: 1,
  sm: 4,
  md: 4,
};

const breakpoints = {
  xs: 480,
  sm: 500,
  md: 767,
};

const WidgetContent = ({ userData, closeWidgetContainer }) => {
  const [widgetLayout, setWidgetLayout] = React.useState(layout);
  const [selectedWidget, setSelectedWidget] = React.useState(null);

  const handleSelectedWidget = (widget) => {
    setSelectedWidget(widget);
  };

  return (
    <div className="mt-8">
      <ResponsiveGridLayout layouts={widgetLayout} breakpoints={breakpoints} cols={cols} rowHeight={120} width={120} isResizable={false} isDraggable={false}>
        {widgetLayout?.md.map(({ i, x, y, w, h, size, type, component }) => {
          const Component = componentMap[component];
          return (
            <div key={i}>
              <Component userData={userData} clickToAdd={true} closeWidgetContainer={closeWidgetContainer} />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};

export default WidgetContent;
