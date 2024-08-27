import React from 'react';
import { Button } from '../../components/button';
import { ScrollArea } from '../../components/scroll-area';
import { RiApps2Line } from '@remixicon/react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from '../../components/dialog';
import WidgetNavBar from './WidgetNavBar';
import WidgetContent from './WidgetContent';
import { EditorLayout } from '../../hooks/EditorContext';

const WidgetContainer = ({ userData }) => {
  const { openWidgetContainer, setOpenWidgetContainer } = EditorLayout();

  return (
    <>
      <Dialog open={openWidgetContainer} onOpenChange={setOpenWidgetContainer}>
        <DialogTrigger asChild>
          <Button size="xs" variant="outline">
            <RiApps2Line className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1368px] h-95vh p-0">
          <DialogTitle className="hidden">Widgets</DialogTitle>
          <DialogDescription className="hidden">Widgets</DialogDescription>
          <div className="flex">
            <div className="w-1/5 bg-zinc-100 p-4 rounded">
              <WidgetNavBar />
            </div>
            <div className="w-4/5 p-4 rounded">
              <ScrollArea className="overflow-hidden">
                <WidgetContent userData={userData} />
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WidgetContainer;
