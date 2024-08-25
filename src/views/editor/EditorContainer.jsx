import React, { useState } from 'react';
import { Button } from '../../components/button';
import logo from '../../assets/profolyo-dark.svg';
import { Link } from 'react-router-dom';
import { RiPlayLine, RiSettingsLine, RiHome6Line, RiApps2Line, RiInformationLine } from '@remixicon/react';
import EditorContent from './EditorContent';
import { UserAuth } from '../../hooks/AuthContext';
import EditorController from './EditorController';
import { showToast } from '../../components/Toasts';
import { supabase } from '../../utils/Supabase';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/tooltip';
import WidgetContainer from '../widgets/WidgetContainer';

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

  const EditorNavBar = ({ children, navName }) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="xs" variant="outline">
              {children}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{navName}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="bg-white h-screen pr-6 pl-6">
      {/* nav */}
      <nav className="flex items-center justify-between">
        <Link to="/dashboard" target="_blank" rel="noopener noreferrer">
          <img src={logo} alt="Profolyo" className="h-6 mt-5" />
        </Link>
        <div className="mt-6">
          <div className="flex gap-2">
            <EditorNavBar navName="Dashboard">
              <RiHome6Line className="h-4 w-4" />
            </EditorNavBar>

            <EditorNavBar navName="Settings">
              <RiSettingsLine className="h-4 w-4" />
            </EditorNavBar>

            <WidgetContainer />

            <EditorNavBar navName="Preview">
              <RiPlayLine className="h-4 w-4" />
            </EditorNavBar>

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
        <>
          <div className="p-4 text-xs flex gap-2 justify-center items-center bg-zinc-200 mt-4 rounded-xl sm:hidden">
            <RiInformationLine className="h-6 w-6" aria-hidden="true" />
            <p>You are currently in mobile view. Switch to tablet or desktop view to edit widgets</p>
          </div>

          <div className="flex mt-4">
            <div className="w-full sm:w-70/100 lg:w-4/5 h-90vh bg-zinc-50 border border-2 rounded-xl border-zinc-200">
              <EditorContent userData={userData[0]} />
            </div>
            <div className="w-30/100 hidden sm:block lg:w-1/5 h-90vh ">
              <EditorController userData={userData[0]} />
            </div>
          </div>
        </>
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
