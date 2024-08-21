import React from 'react';
import { Button } from '../../components/button';
import { RiMacLine, RiTabletLine } from '@remixicon/react';

const EditorContent = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <div></div>
        <div className="bg-zinc-200 rounded-md w-80 m-2 flex justify-center">
          <p className="text-sm text-zinc-700 p-1">profolyo.me/shreyansh/</p>
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
    </div>
  );
};

export default EditorContent;
