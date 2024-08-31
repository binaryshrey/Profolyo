import React from 'react';
import { EditorLayout } from '../../../hooks/EditorContext';
import { EditorScrollArea } from '../../../components/editor-scroll-area';
import ProfileContent from '../../widgets/Profile/ProfileContent';

const EditorControllerContent = () => {
  const { selectedWidget } = EditorLayout();

  return (
    <div className="m-2">
      <EditorScrollArea className="overflow-hidden h-84vh">
        {selectedWidget === undefined && <p className="text-md flex justify-center items-center h-80vh">Select a widget to start customizing</p>}
        {selectedWidget?.component === 'Profile' && <ProfileContent />}
      </EditorScrollArea>
    </div>
  );
};

export default EditorControllerContent;
