/************************************************************ IMPORTS ************************************************************/

import * as React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/profolyo-dark.svg';
import { Progress } from '../../components/Progress';
import { Button } from '../../components/button';
import { RiArrowRightSLine, RiArrowLeftSLine } from '@remixicon/react';
import OnboardMenu from '../../components/OnboardMenu';
import { MarqueeIntegrations } from '../../components/MarqueeIntegrations';
import ConnectedApps from './ConnectApps';

/************************************************************ IMPORTS ************************************************************/

const OnboardIntegrations = ({ decrementOnboardStep }) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(50), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleDone = () => {
    const timer = setTimeout(() => {
      setProgress(100);
      console.log('Done');
    }, 500);
    return () => clearTimeout(timer);
  };

  return (
    <div className="bg-white h-screen">
      <div className="flex">
        <div className="w-2/5 h-screen bg-gray-100">
          <div className="h-screen flex flex-col justify-between">
            <Link to="/">
              <div className="flex items-center">
                <img src={logo} alt="Profolyo" className="h-6 ml-8 mt-6" />
                <h4 className="ml-2 text-gray-900 mt-6 text-xl">Profolyo</h4>
              </div>
            </Link>

            <MarqueeIntegrations />

            <div className="flex flex-col gap-2 m-8 mb-12">
              <p className="text-black font-semibold">Step Two</p>
              <p className="text-black text-2xl font-bold">Add Integrations</p>
              <p className="text-black text-zinc-600">
                Supercharge your profolyo and connect the apps <br />
                that you use everyday to your account.
              </p>
              <div className="flex gap-2 mt-8">
                <Progress value={100} />
                <Progress value={progress} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/5 h-screen">
          <div className="flex justify-end m-6">
            <OnboardMenu />
          </div>
          <div className=" m-8">
            <p className="text-black text-2xl font-bold -mt-16">Integrations and Connected Apps</p>
            <p className="text-black text-zinc-600 mt-1">Supercharge your profolyo and connect the apps you use everyday.</p>
          </div>

          <ConnectedApps />

          <div className="fixed bottom-0 h-20 w-3/5 backdrop-blur bg-white/50 flex justify-between items-center">
            <Button className="m-8" variant="outline" onClick={decrementOnboardStep}>
              <RiArrowLeftSLine className="h-6 w-6" />
              Previous
            </Button>
            <Button className="m-8" onClick={handleDone}>
              Done
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardIntegrations;
