import React from 'react';
import { Button } from '../../components/button';
import OnboardMenu from '../../components/OnboardMenu';
import logo from '../../assets/profolyo-dark.svg';
import { Link } from 'react-router-dom';
import { RiPlayLine, RiSettingsLine, RiHome6Line } from '@remixicon/react';

const EditorContainer = () => {
  return (
    <div className="bg-white h-screen">
      <nav className="flex items-center justify-between">
        <Link to="/dashboard" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="Profolyo" className="h-6 ml-6 mt-5" />
        </Link>
        <div className="mr-6 mt-6">
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
    </div>
  );
};

export default EditorContainer;
