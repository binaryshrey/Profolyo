/************************************************************ IMPORTS ************************************************************/

import * as React from 'react';
import { Link } from 'react-router-dom';
import ProfileForm from './ProfileForm';
import { Orbits } from '../../components/Orbits';
import { Button } from '../../components/button';
import logo from '../../assets/profolyo-dark.svg';
import { showToast } from '../../components/Toasts';
import { Progress } from '../../components/Progress';
import { RiArrowRightSLine } from '@remixicon/react';
import OnboardMenu from '../../components/OnboardMenu';
import { UserProfile } from '../../hooks/ProfileContext';

/************************************************************ IMPORTS ************************************************************/

const OnboardProfile = ({ incrementOnboardStep }) => {
  const { avatarURL, firstName, lastName, userName, bio, profession, skills, resumeURL } = UserProfile();

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(50), 500);
    return () => clearTimeout(timer);
  }, []);

  const validateProfileForm = () => {
    if (!firstName || !lastName || !userName || !bio || !profession || !skills) {
      showToast('Please fill in all the fields.', 'error');
      return false;
    } else if (skills.length < 3 || skills.length > 10) {
      showToast('Please add between 3 to 10 skills.', 'error');
      return false;
    } else {
      console.log(avatarURL, firstName, lastName, userName, bio, profession, skills, resumeURL);
      setProgress(100);
      incrementOnboardStep();
    }
  };

  return (
    <div className="bg-white h-screen">
      <div className="flex">
        <div className="w-2/5 h-screen bg-profolyo">
          <div className="h-screen flex flex-col justify-between">
            <Link to="/">
              <div className="flex items-center">
                <img src={logo} alt="Profolyo" className="h-6 ml-6 mt-6" />
                <h4 className="ml-2 text-gray-900 mt-6 text-xl">Profolyo</h4>
              </div>
            </Link>

            <Orbits />

            <div className="flex flex-col gap-2 m-6 mb-12">
              <p className="text-black font-semibold text-profolyo900">Step One</p>
              <p className="text-black text-2xl font-bold text-profolyo900">Create Your Account</p>
              <p className="text-black text-profolyo900">
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
            <OnboardMenu />
          </div>
          <div className="m-6">
            <p className="text-profolyo900 text-2xl font-bold -mt-16">Configure and Personalize</p>
            <p className="text-profolyo900 text-zinc-600 mt-1">Let's get your profolyo set up in less than a minute.</p>
          </div>
          <ProfileForm />
          <div className="fixed bottom-0 h-20 w-3/5 backdrop-blur-sm bg-white/50 flex justify-end items-center">
            <Button className="m-6" onClick={validateProfileForm}>
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
