import React from 'react';
import { RiApps2Line, RiUser4Line, RiInformationLine, RiEarthLine, RiBubbleChartLine } from '@remixicon/react';
import { ToggleGroup, ToggleGroupItem } from '../../components/toggle-group';

const WidgetNavBar = () => {
  return (
    <ToggleGroup type="single" defaultValue="all" className="flex flex-col justify-end">
      <ToggleGroupItem value="all" className="w-full flex justify-start gap-2" variant="widget">
        <RiApps2Line className="h-4 w-4" />
        <p>All</p>
      </ToggleGroupItem>
      <ToggleGroupItem value="profile" className="w-full flex justify-start gap-2" variant="widget">
        <RiUser4Line className="h-4 w-4" />
        <p>Profile</p>
      </ToggleGroupItem>
      <ToggleGroupItem value="links" className="w-full flex justify-start gap-2" variant="widget">
        <RiEarthLine className="h-4 w-4" />
        <p>Links</p>
      </ToggleGroupItem>
      <ToggleGroupItem value="apps" className="w-full flex justify-start gap-2" variant="widget">
        <RiBubbleChartLine className="h-4 w-4" />
        <p>Apps</p>
      </ToggleGroupItem>
    </ToggleGroup>
  );
};

export default WidgetNavBar;
