import React from 'react';
import { Label } from '../../../components/label';
import { EditorLayout } from '../../../hooks/EditorContext';
import { ScrollArea } from '../../../components/scroll-area';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../../components/select';

const EditorControllerDesign = () => {
  const { profileCardElevation, setProfileCardElevation, selectedWidget } = EditorLayout();

  console.log('selectedWidget', selectedWidget);

  const getValue = (value) => {
    return `${selectedWidget?.type}-${value}`;
  };

  return (
    <div className="m-2">
      <ScrollArea className="overflow-hidden h-84vh">
        {selectedWidget === undefined && <p className="text-md flex justify-center items-center h-80vh">Select a widget to start customizing</p>}
        {selectedWidget?.type === 'Profile' && (
          <>
            <div className="w-full flex flex-col gap-2 ">
              <div className="pl-1 pr-1">
                <Label htmlFor="elevation" className="mt-8">
                  Card Elevation
                </Label>
                <Select onValueChange={setProfileCardElevation}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Card Elevation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Card Elevation</SelectLabel>
                      <SelectItem value={getValue('low')}>Low</SelectItem>
                      <SelectItem value={getValue('medium')}>Medium</SelectItem>
                      <SelectItem value={getValue('high')}>High</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}
      </ScrollArea>
    </div>
  );
};

export default EditorControllerDesign;
