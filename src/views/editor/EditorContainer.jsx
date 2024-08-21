import React from 'react';
import { Button } from '../../components/button';
import OnboardMenu from '../../components/OnboardMenu';
import logo from '../../assets/profolyo-dark.svg';
import { Link } from 'react-router-dom';
import { RiPlayLine, RiSettingsLine, RiHome6Line } from '@remixicon/react';
import EditorContent from './EditorContent';
import EditorController from './EditorController';

const EditorContainer = () => {
  return (
    <div className="bg-white h-screen pr-6 pl-6">
      {/* nav */}
      <nav className="flex items-center justify-between">
        <Link to="/dashboard" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="Profolyo" className="h-6 mt-5" />
        </Link>
        <div className="mt-6">
          <div className="flex gap-2">
            <Button size="xs" variant="outline">
              <RiHome6Line className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button size="xs" variant="outline">
              <RiSettingsLine className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button size="xs" variant="outline">
              <RiPlayLine className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button size="xs">Publish</Button>
          </div>
        </div>
      </nav>

      {/* editor */}
      <div className="flex mt-4">
        <div className="w-4/5 h-screen bg-zinc-50 border border-2 rounded-xl border-zinc-200">
          <EditorContent />
        </div>
        <div className="w-1/5 h-screen ">
          <EditorController />
        </div>
      </div>
    </div>
  );
};

export default EditorContainer;
