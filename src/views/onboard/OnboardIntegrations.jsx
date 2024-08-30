/************************************************************ IMPORTS ************************************************************/

import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/profolyo-dark.svg';
import { Progress } from '../../components/Progress';
import { Button } from '../../components/button';
import { RiArrowLeftSLine } from '@remixicon/react';
import OnboardMenu from '../../components/OnboardMenu';
import { MarqueeIntegrations } from '../../components/MarqueeIntegrations';
import ConnectApps from './ConnectApps';
import { UserProfile } from '../../hooks/ProfileContext';
import { UserAuth } from '../../hooks/AuthContext';
import { supabase } from '../../utils/Supabase';
import { showToast } from '../../components/Toasts';
import { useNavigate } from 'react-router-dom';

/************************************************************ IMPORTS ************************************************************/

const OnboardIntegrations = ({ decrementOnboardStep }) => {
  const navigate = useNavigate();
  const { session } = UserAuth();
  const { avatarURL, firstName, lastName, userName, bio, profession, skills, appConnections, resumeURL } = UserProfile();
  const VITE_SUPABASE_PROFOLYO_USERS_TABLENAME = import.meta.env.VITE_SUPABASE_PROFOLYO_USERS_TABLENAME;
  const VITE_SUPABASE_PROFOLYO_USERNAMES_TABLENAME = import.meta.env.VITE_SUPABASE_PROFOLYO_USERNAMES_TABLENAME;

  const [progress, setProgress] = React.useState(0);
  const [doneLoading, setDoneLoading] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(50), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleDone = async () => {
    setDoneLoading(true);
    try {
      const { error } = await supabase.from(VITE_SUPABASE_PROFOLYO_USERS_TABLENAME).insert({
        Created: new Date().toLocaleString('en-US'),
        Updated: new Date().toLocaleString('en-US'),
        FirstName: firstName,
        LastName: lastName,
        UserName: userName,
        EmailID: session?.user_metadata?.email,
        AvatarURL: avatarURL,
        UserBio: bio,
        UserProfession: profession,
        UserSkills: skills,
        ConnectedApps: appConnections,
        UserID: session?.id,
        Onboarded: true,
        ProfolyoCreated: false,
        UserResumeURL: resumeURL,
      });
      if (error) throw error;

      await supabase.from(VITE_SUPABASE_PROFOLYO_USERNAMES_TABLENAME).insert({
        Created: new Date().toLocaleString('en-US'),
        Updated: new Date().toLocaleString('en-US'),
        UserName: userName,
        UserID: session?.id,
      });

      setProgress(100);
      showToast('Profile Updated!', 'success');
      navigate('/editor');
    } catch (error) {
      console.error(error.message);
      showToast(`Error updating profile : ${error.message}`, 'error');
    } finally {
      setDoneLoading(false);
    }
  };

  return (
    <div className="bg-white h-screen">
      <div className="flex">
        <div className="w-2/5 h-screen bg-profolyo">
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

          <ConnectApps />

          <div className="fixed bottom-0 h-20 w-3/5 backdrop-blur bg-white/50 flex justify-between items-center">
            <Button className="m-8" variant="outline" onClick={decrementOnboardStep}>
              <RiArrowLeftSLine className="h-6 w-6" />
              Previous
            </Button>
            {doneLoading && (
              <Button className="m-8" disabled>
                <Loader2 className="h-4 w-4 animate-spin" />
                Done
              </Button>
            )}
            {!doneLoading && (
              <Button className="m-8" onClick={handleDone}>
                Done
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardIntegrations;
