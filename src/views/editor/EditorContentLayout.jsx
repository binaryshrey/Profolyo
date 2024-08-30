import React, { useRef, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { EditorLayout } from '../../hooks/EditorContext';
import ProfileInfo from '../widgets/Profile/ProfileInfo';
import ProfileSmall from '../widgets/Profile/ProfileSmall';
import ProfileMedium from '../widgets/Profile/ProfileMedium';
import ProfileLarge from '../widgets/Profile/ProfileLarge';
import ProfileXLarge from '../widgets/Profile/ProfileXLarge';
import { RiApps2Line } from '@remixicon/react';
import LinksInfo from '../widgets/Links/LinksInfo';
import LinksSmall from '../widgets/Links/LinksSmall';
import LinksMedium from '../widgets/Links/LinksMedium';
import LinksLarge from '../widgets/Links/LinksLarge';

const ResponsiveGridLayout = WidthProvider(Responsive);

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
  ProfileXLarge,
  LinksInfo,
  LinksSmall,
  LinksMedium,
  LinksLarge,
};

const EditorContentLayout = ({ rowHeight, layoutMode }) => {
  const { profolyoEditorLayout, addProfolyoWidgetToEditor, updateLayoutAfterDrag } = EditorLayout();

  const [mode, setMode] = React.useState(layoutMode);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragStart = (layout, oldItem, newItem) => {
    setIsDragging(true);
  };

  const handleDragStop = (layout, oldItem, newItem) => {
    setIsDragging(false);
    updateLayoutAfterDrag(mode, newItem);
  };

  return (
    <div>
      {profolyoEditorLayout[mode].length === 0 && (
        <div className="flex gap-2 justify-center items-center h-80vh">
          <span>Click </span>
          <RiApps2Line className="h-4 w-4" />
          <span>to add widgets</span>
        </div>
      )}

      {profolyoEditorLayout[mode].length !== 0 && (
        <ResponsiveGridLayout layouts={profolyoEditorLayout} breakpoints={breakpoints} cols={cols} rowHeight={rowHeight} width={120} isResizable={false} isDraggable={true} onDragStart={handleDragStart} onDragStop={handleDragStop}>
          {profolyoEditorLayout[mode]?.map((item) => {
            const Component = componentMap[item.component];
            return (
              <div key={item.i}>
                <Component clickToAdd={false} widget={item} mode={mode} viewMode={false} />
              </div>
            );
          })}
        </ResponsiveGridLayout>
      )}
    </div>
  );
};

export default EditorContentLayout;
