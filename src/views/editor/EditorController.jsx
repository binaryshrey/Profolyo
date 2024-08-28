import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/tabs';
import EditorControllerContent from './EditorController/EditorControllerContent';

const EditorController = ({ userData }) => {
  return (
    <div className="mt-1">
      <Tabs defaultValue="content">
        <div className="items-center text-center">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
          </TabsList>
        </div>

        <div className="pl-8">
          <TabsContent value="content">
            <EditorControllerContent />
          </TabsContent>
          <TabsContent value="design">Design</TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default EditorController;
