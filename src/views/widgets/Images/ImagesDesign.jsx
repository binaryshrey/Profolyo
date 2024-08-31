import React from 'react';
import { Label } from '../../../components/label';
import { EditorLayout } from '../../../hooks/EditorContext';

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../../components/select';

const ImagesDesign = () => {
  const { selectedWidget, updateCardElevation, updateCardBackground } = EditorLayout();

  return (
    <>
      <div className="w-full flex flex-col gap-2 ">
        <div className="pl-1 pr-1">
          <Label htmlFor="elevation" className="mt-8">
            Widget Background
          </Label>
          <Select defaultValue={selectedWidget?.data?.background} onValueChange={(val) => updateCardBackground(selectedWidget.i, val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Widget Background" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Widget Background</SelectLabel>
                <SelectItem value={'transparent'}>Transparent</SelectItem>
                <SelectItem value={'theme'}>Theme</SelectItem>
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
          <Select defaultValue={selectedWidget?.data?.elevation} onValueChange={(val) => updateCardElevation(selectedWidget.i, val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Widget Elevation" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Widget Elevation</SelectLabel>
                <SelectItem value={'none'}>None</SelectItem>
                <SelectItem value={'low'}>Low</SelectItem>
                <SelectItem value={'medium'}>Medium</SelectItem>
                <SelectItem value={'high'}>High</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};

export default ImagesDesign;
