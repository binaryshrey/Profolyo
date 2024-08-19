/************************************************************ IMPORTS ************************************************************/

import * as React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/profolyo-dark.svg';
import { Progress } from '../../components/Progress';
import { Button } from '../../components/button';
import { UserAuth } from '../../hooks/AuthContext';

import { RiArrowRightSLine } from '@remixicon/react';
import ProfileMenu from '../../components/ProfileMenu';
import ProfileForm from './ProfileForm';

/************************************************************ IMPORTS ************************************************************/

const OnboardProfile = ({ incrementOnboardStep }) => {
  const { logOut, session } = UserAuth();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(50), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleNextStep = () => {
    const timer = setTimeout(() => {
      setProgress(100);
      incrementOnboardStep();
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

            <div className="flex flex-col gap-2 m-8 mb-12">
              <p className="text-black font-semibold">Step One</p>
              <p className="text-black text-2xl font-bold">Create Your Account</p>
              <p className="text-black text-zinc-600">
                Tell us more about yourselves, so we can provide a personalised <br />
                experience tailored to your needs and preferences.
              </p>
              <div className="flex gap-2 mt-8">
                <Progress value={progress} />
                <Progress value={0} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/5 h-screen">
          <div className="flex justify-end m-6">
            <ProfileMenu />
          </div>
          <div className="m-8">
            <p className="text-black text-2xl font-bold -mt-16">Configure and Personalize</p>
            <p className="text-black text-zinc-600 mt-1">Let's get your profolyo set up in less than a minute.</p>
          </div>
          <ProfileForm />
          <div className="fixed bottom-0 h-20 w-3/5 backdrop-blur bg-white/50 flex justify-end items-center">
            <Button className="m-8" onClick={handleNextStep}>
              Next
              <RiArrowRightSLine className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardProfile;
