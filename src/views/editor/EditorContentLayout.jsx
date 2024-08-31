import 'react-resizable/css/styles.css';
import 'react-grid-layout/css/styles.css';
import { RiApps2Line } from '@remixicon/react';
import React, { useRef, useEffect } from 'react';
import Profile from '../widgets/Profile/Profile';
import { EditorLayout } from '../../hooks/EditorContext';
import ProfileInfo from '../widgets/Profile/ProfileInfo';
import LinksInfo from '../widgets/Links/LinksInfo';
import Links from '../widgets/Links/Links';
import ImagesInfo from '../widgets/Images/ImagesInfo';
import Images from '../widgets/Images/Images';
import { Responsive, WidthProvider } from 'react-grid-layout';

const ResponsiveGridLayout = WidthProvider(Responsive);

const EditorContentLayout = ({ rowHeight, layoutMode }) => {
  const { profolyoEditorLayout, addProfolyoWidgetToEditor, updateLayoutAfterDrag } = EditorLayout();

  console.log('profolyoEditorLayout', profolyoEditorLayout);

  const cols = { xs: 1, sm: 4, md: 4 };
  const breakpoints = { xs: 480, sm: 500, md: 767 };
  const componentMap = { ProfileInfo, Profile, LinksInfo, Links, ImagesInfo, Images };

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
