import React from 'react';
import { EditorTabs, EditorTabsContent, EditorTabsList, EditorTabsTrigger } from '../../components/editor-tabs';
import EditorControllerContent from './EditorController/EditorControllerContent';
import EditorControllerDesign from './EditorController/EditorControllerDesign';

const EditorController = () => {
  return (
    <div className="mt-1">
      <EditorTabs defaultValue="content">
        <div className="items-center text-center">
          <EditorTabsList>
            <EditorTabsTrigger value="content">Content</EditorTabsTrigger>
            <EditorTabsTrigger value="design">Design</EditorTabsTrigger>
          </EditorTabsList>
        </div>

        <div className="pl-8">
          <EditorTabsContent value="content">
            <EditorControllerContent />
          </EditorTabsContent>
          <EditorTabsContent value="design">
            <EditorControllerDesign />
          </EditorTabsContent>
        </div>
      </EditorTabs>
    </div>
  );
};

export default EditorController;
