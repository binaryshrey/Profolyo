import { Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditorContent from './EditorContent';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/Supabase';
import { Button } from '../../components/button';
import logo from '../../assets/profolyo-dark.svg';
import EditorController from './EditorController';
import { UserAuth } from '../../hooks/AuthContext';
import { showToast } from '../../components/Toasts';
import EditorPublishDialog from './EditorPublishDialog';
import WidgetContainer from '../widgets/WidgetContainer';
import { EditorLayout } from '../../hooks/EditorContext';
import linksmedia from '../../assets/linkmedia.png';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../components/tooltip';
import { RiPlayLine, RiSettingsLine, RiHome6Line, RiApps2Line, RiInformationLine } from '@remixicon/react';

const EditorContainer = () => {
  const navigate = useNavigate();
  const { session } = UserAuth();
  const { setProfolyoEditorUserData, profolyoEditorLayout } = EditorLayout();
  const VITE_SUPABASE_PROFOLYO_USERS_TABLENAME = import.meta.env.VITE_SUPABASE_PROFOLYO_USERS_TABLENAME;

  const [userData, setUserData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [showDialogURI, setShowDialogURI] = useState(false);
  const [savingPreview, setSavingPreview] = React.useState(false);
  const [savingPublish, setSavingPublish] = React.useState(false);
  const [copyToClipBoardConfirm, setCopyToClipBoardConfirm] = useState(false);

  React.useEffect(() => {
    const fetchProfolyoUser = async () => {
      try {
        setLoading(true);
        if (session) {
          const { data, error } = await supabase.from(VITE_SUPABASE_PROFOLYO_USERS_TABLENAME).select().eq('EmailID', session?.email);
          if (error) {
            throw error;
          }
          console.log('userData', data);
          setUserData(data);
          setProfolyoEditorUserData(data);
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

  const handleCopyToClipBoardConfirm = () => {
    setCopyToClipBoardConfirm(true);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        handleCopyToClipBoardConfirm();
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const closeDialogURI = () => {
    setShowDialogURI(false);
    navigate('/dashboard');
  };

  const openDialogURI = () => {
    setShowDialogURI(true);
  };

  const savePreview = async () => {
    if (profolyoEditorLayout['md'].length === 0) {
      showToast('Please add widgets to preview', 'error');
      return;
    }
    setSavingPreview(true);
    try {
      const { data, error } = await supabase.from(VITE_SUPABASE_PROFOLYO_USERS_TABLENAME).update({ ProfolyoLayout: profolyoEditorLayout }).eq('EmailID', session?.email);

      if (error) {
        throw error;
      }
      navigate('/preview');
    } catch (error) {
      showToast(`Error saving preview : ${error.message}`, 'error');
      console.error(error.message);
    } finally {
      setSavingPreview(false);
    }
  };

  const savePublish = async () => {
    if (profolyoEditorLayout['md'].length === 0) {
      showToast('Please add widgets to publish', 'error');
      return;
    }
    setSavingPublish(true);
    try {
      const { data, error } = await supabase.from(VITE_SUPABASE_PROFOLYO_USERS_TABLENAME).update({ ProfolyoLayout: profolyoEditorLayout }).eq('EmailID', session?.email);

      if (error) {
        throw error;
      }
      openDialogURI();
    } catch (error) {
      showToast(`Error publishing : ${error.message}`, 'error');
      console.error(error.message);
    } finally {
      setSavingPublish(false);
    }
  };

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

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="xs" variant="outline" onClick={savePreview}>
                    {savingPreview && <Loader2 className="h-4 w-4 animate-spin" />}
                    {!savingPreview && <RiPlayLine className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Preview</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <>
              <Button size="xs" onClick={savePublish}>
                {savingPublish && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                Publish
              </Button>
              {showDialogURI && <EditorPublishDialog showDialogURI={showDialogURI} setShowDialogURI={setShowDialogURI} profolyoURI={`profolyo.me/${userData[0]?.UserName}`} copyToClipBoardConfirm={copyToClipBoardConfirm} closeDialogURI={closeDialogURI} copyToClipboard={copyToClipboard} />}
            </>
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
            <p>You are currently in mobile view. Switch to tablet or desktop view to edit widgets.</p>
          </div>

          <div className="flex mt-4">
            <div className="w-full sm:w-70/100 bg-profolyo lg:w-4/5 h-90vh border border-4 rounded-xl border-profolyoDark">
              <EditorContent userData={userData[0]} />
            </div>
            <div className="w-30/100 hidden sm:block lg:w-1/5 h-90vh ">
              <EditorController />
            </div>
          </div>
        </>
      )}
      {!loading && userData.length == 0 && (
        <div className="w-screen h-screen flex justify-center items-center">
          <p>Unable To Initialize Editor. Try again after sometime.</p>
        </div>
      )}
    </div>
  );
};

export default EditorContainer;
