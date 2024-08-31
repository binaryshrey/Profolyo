import React from 'react';
import { EditorLayout } from '../../../hooks/EditorContext';
import { EditorScrollArea } from '../../../components/editor-scroll-area';

import ProfileDesign from '../../widgets/Profile/ProfileDesign';
import LinksDesign from '../../widgets/Links/LinksDesign';

const EditorControllerDesign = () => {
  const { selectedWidget } = EditorLayout();

  return (
    <div className="m-2">
      <EditorScrollArea className="overflow-hidden h-84vh">
        {selectedWidget === undefined && <p className="text-md flex justify-center items-center h-80vh">Select a widget to start customizing</p>}
        {selectedWidget?.component === 'Profile' && <ProfileDesign />}
        {selectedWidget?.component === 'Links' && <LinksDesign />}
      </EditorScrollArea>
    </div>
  );
};

export default EditorControllerDesign;
