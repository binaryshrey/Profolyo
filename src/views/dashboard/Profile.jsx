/************************************************************ IMPORTS ************************************************************/

import { UserAuth } from '../../hooks/AuthContext';
import { Button } from '../../components/button';

/************************************************************ IMPORTS ************************************************************/

const Profile = () => {
  // global vars
  const { logOut, session } = UserAuth();

  // methods
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  const imgURL = session?.user_metadata?.picture !== undefined ? session?.user_metadata?.picture : session?.user_metadata?.avatar_url;

  return (
    <div className="h-screen px-2">
      <div className="bg-profolyo border border-profolyoDark rounded-md p-5 w-full h-48 relative flex justify-center">
        <div className="absolute -bottom-12 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white ">
          <img className="h-full w-full rounded-full" src={imgURL} alt="Profile" />
        </div>
      </div>
      <div className="bg-profolyo border border-profolyoDark rounded-md p-5 w-full flex justify-between items-center mt-32">
        <p className="text-profolyo900 text-sm font-semibold">Name</p>
        <p className="text-profolyo900 text-sm">{session?.user_metadata?.name}</p>
      </div>
      <div className="bg-profolyo border border-profolyoDark rounded-md p-5 w-full flex justify-between items-center mt-2">
        <p className="text-profolyo900 text-sm font-semibold">Email ID</p>
        <p className="text-profolyo900 text-sm">{session?.user_metadata?.email}</p>
      </div>
      <div className="bg-profolyo border border-profolyoDark rounded-md p-5 w-full flex justify-between items-center mt-2">
        <p className="text-profolyo900 text-sm font-semibold">Need a break?</p>
        <Button variant="profolyo" className="dark" onClick={handleSignOut}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Profile;
