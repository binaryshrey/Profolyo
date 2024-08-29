import React, { useRef, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { v4 as uuidv4 } from 'uuid';
import ProfileInfo from './Profile/ProfileInfo';
import ProfileSmall from './Profile/ProfileSmall';
import ProfileMedium from './Profile/ProfileMedium';
import ProfileLarge from './Profile/ProfileLarge';
import ProfileXLarge from './Profile/ProfileXLarge';

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
    { i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'small', component: 'ProfileInfo', type: 'Profile' },
    { i: uuidv4(), x: 1, y: 0, w: 1, h: 2, size: 'small', component: 'ProfileSmall', type: 'Profile' },
    { i: uuidv4(), x: 0, y: 1, w: 2, h: 2, size: 'medium', component: 'ProfileMedium', type: 'Profile' },
    { i: uuidv4(), x: 2, y: 0, w: 2, h: 4, size: 'large', component: 'ProfileLarge', type: 'Profile' },
    { i: uuidv4(), x: 3, y: 1, w: 4, h: 4, size: 'xlarge', component: 'ProfileXLarge', type: 'Profile' },
  ],
};

const componentMap = {
  ProfileInfo,
  ProfileSmall,
  ProfileMedium,
  ProfileLarge,
  ProfileXLarge,
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

const WidgetContent = () => {
  return (
    <div className="mt-8 bg-profolyo">
      <ResponsiveGridLayout layouts={layout} breakpoints={breakpoints} cols={cols} rowHeight={120} width={120} isResizable={false} isDraggable={false}>
        {layout?.md.map((item) => {
          const Component = componentMap[item.component];
          return (
            <div key={item.i}>
              <Component clickToAdd={true} widget={item} viewMode={true} />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};

export default WidgetContent;
