import React from 'react';
import ConnectApps from '../onboard/ConnectApps';
import { showToast } from '../../components/Toasts';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../../hooks/AuthContext';
import { supabase } from '../../utils/Supabase';
import { UserProfile } from '../../hooks/ProfileContext';
import { Loader2 } from 'lucide-react';

const Integrations = () => {
  const navigate = useNavigate();
  const { session } = UserAuth();
  const { setAppConnections } = UserProfile();
  const VITE_SUPABASE_PROFOLYO_USERS_TABLENAME = import.meta.env.VITE_SUPABASE_PROFOLYO_USERS_TABLENAME;

  const [loading, setLoading] = React.useState(false);
  const [userData, setUserData] = React.useState([]);

  React.useEffect(() => {
    const fetchProfolyoUser = async () => {
      try {
        setLoading(true);
        if (session) {
          const { data, error } = await supabase.from(VITE_SUPABASE_PROFOLYO_USERS_TABLENAME).select().eq('EmailID', session?.email);
          if (error) {
            throw error;
          }
          setUserData(data);
          if (data.length > 0) {
            setAppConnections(data[0]?.ConnectedApps);
          }
        } else {
          navigate('/login');
        }
      } catch (error) {
        showToast(error.message, 'error');
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfolyoUser();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <p className="text-2xl font-bold mx-8 text-profolyo900">Integrations and Connected Apps</p>
        <p className="text-profolyo900  mx-8">
          Supercharge your profolyo and connect the apps you use everyday<span className="text-xs text-profolyo900"> (widgets coming soon)</span>
        </p>
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-80">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
      {!loading && userData.length > 0 && <ConnectApps container={true} />}
    </div>
  );
};

export default Integrations;
