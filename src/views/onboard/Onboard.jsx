import { UserAuth } from '../../hooks/AuthContext';

const Onboard = () => {
  const { logOut, session } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 onClick={handleSignOut}>Onboard</h1>
    </div>
  );
};

export default Onboard;
