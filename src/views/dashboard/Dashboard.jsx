import React from 'react';
import { Loader2 } from 'lucide-react';
import cardBG from '../../assets/cardBG.png';
import { Button } from '../../components/button';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../utils/Supabase';
import { UserAuth } from '../../hooks/AuthContext';
import { showToast } from '../../components/Toasts';
import { EditorLayout } from '../../hooks/EditorContext';
import { RiQuillPenFill, RiDragDropFill } from '@remixicon/react';
import { EditorTabs, EditorTabsContent, EditorTabsList, EditorTabsTrigger } from '../../components/editor-tabs';

const Dashboard = () => {
  const navigate = useNavigate();
  const { session } = UserAuth();
  const { profolyoEditorLayout, setProfolyoEditorLayout } = EditorLayout();
  const VITE_SUPABASE_PROFOLYO_USERS_TABLENAME = import.meta.env.VITE_SUPABASE_PROFOLYO_USERS_TABLENAME;

  const [userData, setUserData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  console.log(profolyoEditorLayout);

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

  const handleNewProfolyo = () => {
    window.open('https://www.profolyo.me/editor', '_blank');
  };
  const handleEditProfolyo = () => {
    setProfolyoEditorLayout(userData[0]?.ProfolyoLayout);
    window.open('https://www.profolyo.me/editor', '_blank');
  };

  return (
    <div className="bg-white px-8">
      <p className="text-profolyo900 font-semibold text-xl md:text-2xl mb-4">Hello, {session?.user_metadata?.name.split(' ')[0]}! 👋</p>
      <div className="flex flex-shrink-0 border-t border-profolyoDark mt-4 mb-4"></div>
      {loading && (
        <div className="flex justify-center items-center mt-80">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
      {!loading && userData.length > 0 && (
        <>
          <EditorTabs defaultValue="all">
            <EditorTabsList>
              <EditorTabsTrigger value="all">All</EditorTabsTrigger>
              <EditorTabsTrigger value="published">Published</EditorTabsTrigger>
            </EditorTabsList>
            <EditorTabsContent value="all">
              <div className="flex gap-4">
                <div onClick={handleNewProfolyo} className=" w-48 h-48 border flex justify-center items-center border-2 border-profolyoDark bg-profolyo border-dashed rounded-lg cursor-pointer hover:opacity-90">
                  <Button variant="profolyoOutline">
                    <RiQuillPenFill className="h-4 w-4 m-2 text-profolyo900" />
                    <p className="text-profolyo900">Create New</p>
                  </Button>
                </div>
                {userData[0]?.ProfolyoLayout?.md.length > 0 && (
                  <>
                    <div onClick={handleEditProfolyo} className="w-48 h-48 relative border flex justify-center items-center border-2 border-profolyo bg-profolyoDark rounded-lg cursor-pointer  hover:opacity-90">
                      <img src={cardBG} alt="Card" className="w-full h-full object-cover rounded-lg" />
                      <Button variant="profolyoOutline" className="absolute">
                        <RiDragDropFill className="h-4 w-4 m-2 text-profolyo900" />
                        <p className="text-profolyo900">Edit</p>
                      </Button>
                      <p className="absolute bottom-4 left-4 text-profolyo900">@{userData[0]?.UserName}</p>
                    </div>
                  </>
                )}
              </div>
            </EditorTabsContent>
            <EditorTabsContent value="published">
              {userData[0]?.ProfolyoLayout?.md.length > 0 && (
                <>
                  <div onClick={handleEditProfolyo} className="w-48 h-48 relative border flex justify-center items-center border-2 border-profolyo bg-profolyoDark rounded-lg cursor-pointer  hover:opacity-90">
                    <img src={cardBG} alt="Card" className="w-full h-full object-cover rounded-lg" />
                    <Button variant="profolyoOutline" className="absolute">
                      <RiDragDropFill className="h-4 w-4 m-2 text-profolyo900" />
                      <p className="text-profolyo900">Edit</p>
                    </Button>
                    <p className="absolute bottom-4 left-4 text-profolyo900">@{userData[0]?.UserName}</p>
                  </div>
                </>
              )}
            </EditorTabsContent>
          </EditorTabs>
        </>
      )}
    </div>
  );
};

export default Dashboard;
