import React from 'react';
import { Button } from '../../components/button';
import { RiMacLine, RiTabletLine } from '@remixicon/react';
import EditorContentLayout from './EditorContentLayout';

const EditorContent = ({ userData }) => {
  const [layoutMode, setLayoutMode] = React.useState('desktop');

  const handleLayoutMode = (mode) => {
    setLayoutMode(mode);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="w-16"></div>
        <div className="bg-zinc-200 rounded-md w-56 sm:w-80 m-2 flex justify-center">
          <p className="text-xs sm:text-sm text-zinc-700 p-1">profolyo.me/{userData?.UserName}/</p>
        </div>
        <div className="mr-2">
          <Button size="xs" variant="ghost" className={layoutMode === 'mobile' ? `bg-zinc-200` : ''} onClick={() => handleLayoutMode('mobile')}>
            <RiTabletLine className="h-4 w-4" />
          </Button>
          <Button size="xs" variant="ghost" className={layoutMode === 'desktop' ? `bg-zinc-200` : ''} onClick={() => handleLayoutMode('desktop')}>
            <RiMacLine className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="border border-zinc-200"></div>
      <div className="overflow-y-auto h-84vh">
        <div className={`bg-gray-200 mx-auto w-full ${layoutMode === 'desktop' ? 'max-w-6xl' : 'max-w-sm'}`}>
          <EditorContentLayout />
        </div>
      </div>
    </div>
  );
};

export default EditorContent;
