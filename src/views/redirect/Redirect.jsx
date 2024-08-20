import React from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from '../../utils/Supabase';
import { UserAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../components/Toasts';

const Redirect = () => {
  const navigate = useNavigate();
  const { session } = UserAuth();
  const VITE_SUPABASE_PROFOLYO_USERS_TABLENAME = import.meta.env.VITE_SUPABASE_PROFOLYO_USERS_TABLENAME;

  React.useEffect(() => {
    const handleNavigate = async () => {
      if (session) {
        if (Object.keys(session).length !== 0) {
          localStorage.setItem('email', JSON.stringify(session.email));
          const { data, error } = await supabase.from(VITE_SUPABASE_PROFOLYO_USERS_TABLENAME).select().eq('EmailID', session.email);
          if (error) {
            showToast(error.message, 'error');
          }
          if (data?.length > 0) {
            data[0].ProfolyoCreated ? navigate('/dashboard') : navigate('/editor');
          } else {
            navigate('/onboard');
          }
        }
      } else {
        navigate('/login');
      }
    };
    handleNavigate();
  }, [session]);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  );
};

export default Redirect;
