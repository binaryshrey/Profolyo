import React from 'react';
import { Button } from '../../components/button';
import { RiMacLine, RiTabletLine } from '@remixicon/react';
import EditorContentLayout from './EditorContentLayout';
import { ScrollArea } from '../../components/scroll-area';

const EditorContent = ({ userData }) => {
  console.log(userData);
  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div></div>
        <div className="bg-zinc-200 rounded-md w-56 sm:w-80 m-2 flex justify-center">
          <p className="text-xs sm:text-sm text-zinc-700 p-1">profolyo.me/{userData?.UserName}/</p>
        </div>
        <div className="mr-2">
          <Button size="xs" variant="ghost">
            <RiTabletLine className="h-4 w-4" />
          </Button>
          <Button size="xs" variant="ghost">
            <RiMacLine className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="border border-zinc-200"></div>
      <div className="overflow-y-auto h-84vh">
        <div className="max-w-5xl mx-auto md:px-8 px-4 w-full">
          <EditorContentLayout />
          <EditorContentLayout />
          <EditorContentLayout />
        </div>
      </div>
    </div>
  );
};

export default EditorContent;
