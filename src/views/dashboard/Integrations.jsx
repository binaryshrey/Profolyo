import React from 'react';
import ConnectApps from '../onboard/ConnectApps';

const Integrations = () => {
  return (
    <div>
      <div className="ml-8 mb-8">
        <p className="text-2xl font-bold -mt-16 text-profolyo900">Integrations and Connected Apps</p>
        <p className="text-profolyo900 text-zinc-600 mt-1">Supercharge your profolyo and connect the apps you use everyday.</p>
      </div>

      <ConnectApps />
    </div>
  );
};

export default Integrations;
