/************************************************************ IMPORTS ************************************************************/

import { Loader2 } from 'lucide-react';
import { Label } from '../../components/label';
import { supabase } from '../../utils/Supabase';
import { Button } from '../../components/button';
import { UserAuth } from '../../hooks/AuthContext';
import { showToast } from '../../components/Toasts';
import { UserProfile } from '../../hooks/ProfileContext';
import React, { useState, useEffect, useRef } from 'react';
import { EditorInput } from '../../components/editor-input';
import { RiCloseCircleFill, RiCheckboxCircleFill } from '@remixicon/react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/dialog';

/************************************************************ IMPORTS ************************************************************/

const Settings = () => {
  const { session } = UserAuth();
  const { userName, updateUserName } = UserProfile();
  const [openDialogUserName, setOpenDialogUserName] = useState(false);
  const [showUserNameCheck, setShowUserNameCheck] = React.useState(false);
  const [userNameAvailable, setUserNameAvailable] = React.useState(false);
  const [userNameCheckLoading, setUserNameCheckLoading] = React.useState(false);

  const VITE_SUPABASE_PROFOLYO_USERNAMES_TABLENAME = import.meta.env.VITE_SUPABASE_PROFOLYO_USERNAMES_TABLENAME;
  const VITE_SUPABASE_PROFOLYO_USERS_TABLENAME = import.meta.env.VITE_SUPABASE_PROFOLYO_USERS_TABLENAME;

  React.useEffect(() => {
    const handleUserNameCheck = async () => {
      if (userName === '') return;
      setUserNameAvailable(false);
      setUserNameCheckLoading(true);
      try {
        const { data, error } = await supabase.from(VITE_SUPABASE_PROFOLYO_USERNAMES_TABLENAME).select();
        if (error) throw error;
        setUserNameAvailable(true);
        data.map((user) => {
          if (user.UserName === userName) {
            setUserNameAvailable(false);
          }
        });
        setShowUserNameCheck(true);
      } catch (error) {
        console.error('Error checking username:', error.message);
        showToast(`Error checking username: ${error.message}`, 'error');
      } finally {
        setUserNameCheckLoading(false);
      }
    };

    const timer = setTimeout(() => {
      if (userName) {
        handleUserNameCheck();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [userName]);

  const updateNewUserName = async () => {
    if (userName === '') return;
    try {
      const { data, error } = await supabase.from(VITE_SUPABASE_PROFOLYO_USERNAMES_TABLENAME).update({ UserName: userName }).eq('UserID', session?.id);
      await supabase.from(VITE_SUPABASE_PROFOLYO_USERS_TABLENAME).update({ UserName: userName }).eq('UserID', session?.id);
      if (error) throw error;
      showToast('UserName Updated Successfully!', 'success');
      setOpenDialogUserName(false);
    } catch (error) {
      console.error('Error updating username:', error.message);
      showToast(`Error updating username: ${error.message}`, 'error');
    }
  };

  return (
    <div className="bg-white">
      <p className="text-profolyo900 font-semibold text-xl md:text-2xl mb-4">Settings</p>
      <div className="flex flex-shrink-0 border-t border-profolyoDark mt-4 mb-4"></div>
      <div className="bg-profolyo border border-profolyoDark rounded-md p-5 w-full flex justify-between items-center">
        <p className="text-sm">Update Your Profolyo UserName</p>
        <Dialog open={openDialogUserName} onOpenChange={setOpenDialogUserName}>
          <DialogTrigger asChild>
            <Button variant="profolyo">Change UserName</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-profolyo900">Change UserName</DialogTitle>
              <DialogDescription className="text-profolyo800">Make changes to your username here. Click save when you're done.</DialogDescription>
            </DialogHeader>
            <div>
              <Label htmlFor="username" className="text-right">
                UserName
              </Label>
              <div className="relative">
                <EditorInput type="text" id="userName" placeholder="LukeSkywalker" maxLength="20" value={userName} onChange={() => updateUserName(event.target.value)} required />
                <div className="absolute inset-y-0 right-3 flex items-center">
                  {userName.length > 0 && (
                    <>
                      {userNameCheckLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                      {!userNameCheckLoading && showUserNameCheck && userNameAvailable && <RiCheckboxCircleFill className="h-4 w-4 text-green-600" />}
                      {!userNameCheckLoading && showUserNameCheck && !userNameAvailable && <RiCloseCircleFill className="h-4 w-4 text-red-600" />}
                    </>
                  )}
                </div>
              </div>
              <p className="text-xs text-zinc-400 mt-1">
                {`profolyo.me/${userName}`}
                {!userNameCheckLoading && showUserNameCheck && userNameAvailable && userName.length !== 0 && <span> is available!</span>}
                {!userNameCheckLoading && showUserNameCheck && !userNameAvailable && userName.length !== 0 && <span> is not available!</span>}
              </p>
            </div>
            <DialogFooter>
              {userNameAvailable && userName.length !== 0 && (
                <Button variant="profolyo" type="submit" onClick={updateNewUserName}>
                  Save changes
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Settings;
