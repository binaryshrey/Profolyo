import React from 'react';
import { Label } from '../../../components/label';
import { EditorLayout } from '../../../hooks/EditorContext';
import { EditorScrollArea } from '../../../components/editor-scroll-area';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../../components/select';

const EditorControllerDesign = () => {
  const { profileCardElevation, setProfileCardElevation, profileCardBackground, setProfileCardBackground, selectedWidget } = EditorLayout();

  console.log('selectedWidget', selectedWidget);

  const getValue = (value) => {
    return `${selectedWidget?.size}-${value}`;
  };

  const getBG = (value) => {
    return `${selectedWidget?.size}-${value}`;
  };

  return (
    <div className="m-2">
      <EditorScrollArea className="overflow-hidden h-84vh">
        {selectedWidget === undefined && <p className="text-md flex justify-center items-center h-80vh">Select a widget to start customizing</p>}
        {selectedWidget?.type === 'Profile' && (
          <>
            <div className="w-full flex flex-col gap-2 ">
              <div className="pl-1 pr-1">
                <Label htmlFor="elevation" className="mt-8">
                  Widget Background
                </Label>
                <Select onValueChange={setProfileCardBackground}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Widget Background" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Widget Background</SelectLabel>
                      <SelectItem value={getValue('transparent')}>Transparent</SelectItem>
                      <SelectItem value={getValue('theme')}>Theme</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 mt-8">
              <div className="pl-1 pr-1">
                <Label htmlFor="elevation" className="mt-8">
                  Widget Elevation
                </Label>
                <Select onValueChange={setProfileCardElevation}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Widget Elevation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Widget Elevation</SelectLabel>
                      <SelectItem value={getValue('none')}>None</SelectItem>
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
      </EditorScrollArea>
    </div>
  );
};

export default EditorControllerDesign;
