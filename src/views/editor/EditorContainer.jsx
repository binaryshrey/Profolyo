import React, { useState } from 'react';
import { Button } from '../../components/button';
import OnboardMenu from '../../components/OnboardMenu';
import logo from '../../assets/profolyo-dark.svg';
import { Link } from 'react-router-dom';
import { RiPlayLine, RiSettingsLine, RiHome6Line } from '@remixicon/react';
import EditorContent from './EditorContent';
import { UserAuth } from '../../hooks/AuthContext';
import EditorController from './EditorController';
import { showToast } from '../../components/Toasts';
import { supabase } from '../../utils/Supabase';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const EditorContainer = () => {
  const { session } = UserAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const VITE_SUPABASE_PROFOLYO_USERS_TABLENAME = import.meta.env.VITE_SUPABASE_PROFOLYO_USERS_TABLENAME;

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
          console.log(data);
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
    <div className="bg-white h-screen pr-6 pl-6">
      {/* nav */}
      <nav className="flex items-center justify-between">
        <Link to="/dashboard" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="Profolyo" className="h-6 mt-5" />
        </Link>
        <div className="mt-6">
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

      {/* editor */}
      {loading && (
        <div className="w-screen h-screen flex justify-center items-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
      {!loading && userData.length > 0 && (
        <div className="flex mt-4">
          <div className="w-4/5 h-screen bg-zinc-50 border border-2 rounded-xl border-zinc-200">
            <EditorContent userData={userData[0]} />
          </div>
          <div className="w-1/5 h-screen ">
            <EditorController userData={userData[0]} />
          </div>
        </div>
      )}
      {!loading && userData.length == 0 && (
        <div className="w-screen h-screen flex justify-center items-center">
          <p>Unable To Initialize Editor</p>
        </div>
      )}
    </div>
  );
};

export default EditorContainer;
