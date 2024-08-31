import React from 'react';
import { EditorLayout } from '../../../hooks/EditorContext';

const LinksInfo = () => {
  return (
    <div className="rounded-lg flex flex-col justify-center h-full p-4">
      <p className="font-semibold text-3xl">Links</p>
      <p className="text-md text-zinc-500 mt-2">Add links to your blogs, projects or social media.</p>
    </div>
  );
};

export default LinksInfo;
