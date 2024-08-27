import React from 'react';
import { Button } from '../../components/button';
import { RiMacLine, RiSmartphoneLine, RiTabletLine } from '@remixicon/react';
import EditorContentLayout from './EditorContentLayout';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/tooltip';

const EditorContent = ({ userData }) => {
  const [layoutMode, setLayoutMode] = React.useState('md');

  const handleLayoutMode = (mode) => {
    setLayoutMode(mode);
  };

  React.useEffect(() => {
    const editorLayoutSize = () => {
      if (window.innerWidth >= 1024) {
        setLayoutMode('md');
      } else if (window.innerWidth < 1024 && window.innerWidth >= 767) {
        setLayoutMode('sm');
      } else {
        setLayoutMode('xs');
      }
    };

    editorLayoutSize();

    window.addEventListener('resize', editorLayoutSize);
    return () => window.removeEventListener('resize', editorLayoutSize);
  }, []);

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="w-16"></div>
        <div className="bg-profolyoDark rounded-md w-56 sm:w-80 m-2 flex justify-center">
          <p className="text-xs sm:text-sm text-zinc-700 p-1">profolyo.me/{userData?.UserName}/</p>
        </div>
        <div className="mr-2 flex">
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="xs" variant="ghost" className={layoutMode === 'xs' ? `bg-profolyoDark` : ''} onClick={() => handleLayoutMode('xs')}>
                    <RiSmartphoneLine className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mobile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="hidden sm:block">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="xs" variant="ghost" className={layoutMode === 'sm' ? `bg-profolyoDark` : ''} onClick={() => handleLayoutMode('sm')}>
                    <RiTabletLine className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tablet</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="hidden sm:block">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="xs" variant="ghost" className={layoutMode === 'md' ? `bg-profolyoDark` : ''} onClick={() => handleLayoutMode('md')}>
                    <RiMacLine className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Desktop</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
      <div className="border border-profolyoDark"></div>
      <div className="overflow-y-auto h-84vh">
        <div className={`bg-profolyo mx-auto w-full ${layoutMode === 'md' ? 'max-w-6xl' : layoutMode === 'sm' ? 'max-w-3xl' : 'max-w-sm'}`}>
          {layoutMode === 'md' && <EditorContentLayout userData={userData} rowHeight={120} layoutMode={layoutMode} />}
          {layoutMode === 'sm' && <EditorContentLayout userData={userData} rowHeight={160} layoutMode={layoutMode} />}
          {layoutMode === 'xs' && <EditorContentLayout userData={userData} rowHeight={160} layoutMode={layoutMode} />}
        </div>
      </div>
    </div>
  );
};

export default EditorContent;
