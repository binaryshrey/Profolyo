import React from 'react';
import { EditorLayout } from '../../../hooks/EditorContext';
import { EditorScrollArea } from '../../../components/editor-scroll-area';
import ProfileContent from '../../widgets/Profile/ProfileContent';
import LinksContent from '../../widgets/Links/LinksContent';

const EditorControllerContent = () => {
  const { selectedWidget } = EditorLayout();

  return (
    <div className="m-2">
      <EditorScrollArea className="overflow-hidden h-84vh">
        {selectedWidget === undefined && <p className="text-md flex justify-center items-center h-80vh">Select a widget to start customizing</p>}
        {selectedWidget?.component === 'Profile' && <ProfileContent />}
        {selectedWidget?.component === 'Links' && <LinksContent />}
      </EditorScrollArea>
    </div>
  );
};

export default EditorControllerContent;
