/************************************************************ IMPORTS ************************************************************/

import React from 'react';
import { Loader2 } from 'lucide-react';
import linkedinwhite from '../../assets/linkedin-white.svg';
import { splitName } from '../../utils/utils';
import { Input } from '../../components/input';
import { Label } from '../../components/label';
import { RiMagicLine, RiCloseCircleFill, RiCheckboxCircleFill } from '@remixicon/react';
import { Badge } from '../../components/badge';
import { ScrollArea } from '../../components/scroll-area';
import { UserAuth } from '../../hooks/AuthContext';
import { Textarea } from '../../components/textarea';
import { InputTags } from '../../components/input-tags';
import { UserProfile } from '../../hooks/ProfileContext';
import { showToast } from '../../components/Toasts';
import { supabase } from '../../utils/Supabase';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../components/select';

/************************************************************ IMPORTS ************************************************************/

const ProfileForm = () => {
  // global vars
  const { session } = UserAuth();
  const avatarUploadFileRef = React.useRef(null);
  const SUPABASE_STORAGE_URL = import.meta.env.VITE_SUPABASE_STORAGE_URL;
  const VITE_SUPABASE_PROFOLYO_USERNAMES_TABLENAME = import.meta.env.VITE_SUPABASE_PROFOLYO_USERNAMES_TABLENAME;
  const users = ['Developer', 'Designer', 'Marketer', 'Founder', 'Student', 'Indie Hacker', 'Data Scientist', 'Freelancer', 'Other'];
  const { avatarURL, avatarUploaded, firstName, lastName, userName, bio, profession, skills, updateAvatarURL, updateAvatarUploaded, updateFirstName, updateLastName, updateUserName, updateBio, updateProfession, setSkills, resumeURL, resumeUploaded, updateResumeURL, updateResumeUploaded } = UserProfile();

  // state
  const [loadingAIBio, setLoadingAIBio] = React.useState(false);
  const [avatarFile, setAvatarFile] = React.useState(null);
  const [resumeFile, setResumeFile] = React.useState(null);
  const [userNameCheckLoading, setUserNameCheckLoading] = React.useState(false);
  const [showUserNameCheck, setShowUserNameCheck] = React.useState(false);
  const [userNameAvailable, setUserNameAvailable] = React.useState(false);

  // set user metadata into form on load
  React.useEffect(() => {
    const name = session?.user_metadata?.name;
    if (avatarUploaded) {
      updateAvatarURL(avatarURL);
    } else {
      updateAvatarURL(session?.user_metadata?.picture !== undefined ? session?.user_metadata?.picture : session?.user_metadata?.avatar_url);
    }
    if (name) {
      const { fName, lName } = splitName(name);
      updateFirstName(fName);
      updateLastName(lName);
    }
    if (resumeUploaded) {
      updateResumeURL(resumeURL);
    }
  }, [session]);

  const handleAIBio = () => {
    console.log('AI Bio generated');
    setLoadingAIBio(!loadingAIBio);
  };

  const handleLinkedInAutoFill = () => {
    console.log('LinkedIn autofill coming soon!');
    showToast('LinkedIn autofill coming soon!', 'info');
  };

  const handleInputFileRef = () => {
    avatarUploadFileRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      showToast('No file selected.', 'error');
      return;
    } else if (!selectedFile.type.startsWith('image/')) {
      showToast('Selected file is not an image.', 'error');
      return;
    } else if (selectedFile.size > 5 * 1024 * 1024) {
      showToast('File size must be less than 5MB.', 'error');
      return;
    } else {
      setAvatarFile(selectedFile);
      uploadImage(selectedFile);
    }
  };

  const uploadImage = async (selectedFile) => {
    if (!selectedFile) return;
    showToast('Uploading Avatar.', 'info');

    try {
      const fileName = `${session?.user_metadata?.name}-${Date.now()}-${selectedFile.name}`;
      const { data, error } = await supabase.storage.from('avatars').upload(fileName, selectedFile, {
        cacheControl: '3600',
        upsert: false,
      });
      if (error) throw error;
      updateAvatarURL(`${SUPABASE_STORAGE_URL}avatars/${fileName}`);
      updateAvatarUploaded(true);
      showToast('Avatar Uploaded Successfully!', 'success');
    } catch (error) {
      console.error('Error uploading file:', error.message);
      showToast(`Error uploading file: ${error.message}`, 'error');
    }
  };

  React.useEffect(() => {
    const handleUserNameCheck = async () => {
      setUserNameCheckLoading(true);
      try {
        const { data, error } = await supabase.from(VITE_SUPABASE_PROFOLYO_USERNAMES_TABLENAME).select();
        if (error) throw error;

        console.log('Username check:', data);
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

  const handleResumeFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      showToast('No file selected.', 'error');
      return;
    } else if (!selectedFile.type.startsWith('application/pdf')) {
      showToast('Selected file is not a pdf.', 'error');
      return;
    } else if (selectedFile.size > 5 * 1024 * 1024) {
      showToast('File size must be less than 5MB.', 'error');
      return;
    } else {
      setResumeFile(selectedFile);
      uploadResume(selectedFile);
    }
  };

  const uploadResume = async (selectedFile) => {
    if (!selectedFile) return;
    showToast('Uploading Resume.', 'info');

    try {
      const fileName = `${session?.user_metadata?.name}-${Date.now()}-${selectedFile.name}`;
      const { data, error } = await supabase.storage.from('resumes').upload(fileName, selectedFile, {
        cacheControl: '3600',
        upsert: false,
      });
      if (error) throw error;
      updateResumeURL(`${SUPABASE_STORAGE_URL}resumes/${fileName}`);
      updateResumeUploaded(true);
      showToast('Resume Uploaded Successfully!', 'success');
    } catch (error) {
      console.error('Error uploading file:', error.message);
      showToast(`Error uploading file: ${error.message}`, 'error');
    }
  };

  return (
    <ScrollArea className="h-4/5 overflow-hidden">
      <div className="p-8 overflow-hidden">
        <div className="text-center">
          {/* profile-pic */}
          <div className="flex justify-center">
            <img src={avatarURL} className="rounded-full bg-cover h-20 w-20" />
          </div>
          {/* profile-pic-upload */}
          <Label htmlFor="upload" className="cursor-pointer" onClick={handleInputFileRef}>
            Upload Avatar
            <p className="text-xs text-zinc-400">(5MB max, 256x256 px)</p>
            <input type="file" onChange={handleFileChange} className="hidden" ref={avatarUploadFileRef} />
          </Label>
          {/* linkedin-autofill */}
          <div className="mt-2 mb-16">
            <button className="bg-linkedin hover:linkedinHover text-white text-xs py-1 px-2 rounded-sm" onClick={handleLinkedInAutoFill}>
              <div className="flex gap-1 items-center justify-center">
                <img src={linkedinwhite} className="h-2 w-2 mr-1" />
                Autofill with LinkedIn
              </div>
            </button>
          </div>
        </div>

        <div className="flex justify-between gap-8">
          {/* first name */}
          <div className="w-full">
            <Label htmlFor="firstName">
              First Name<span className="text-red-700">*</span>
            </Label>
            <Input type="text" id="firstName" placeholder="Luke" maxLength="10" value={firstName} onChange={() => updateFirstName(event.target.value)} required />
          </div>
          {/* last name */}
          <div className="w-full">
            <Label htmlFor="lastName">
              Last Name<span className="text-red-700">*</span>
            </Label>
            <Input type="text" id="lastName" placeholder="Skywalker" maxLength="10" value={lastName} onChange={() => updateLastName(event.target.value)} required />
          </div>
        </div>

        {/* user name */}
        <div className="flex justify-between gap-8 mt-8">
          <div className="w-full">
            <Label htmlFor="userName">
              User Name<span className="text-red-700">*</span>
            </Label>
            <div className="relative">
              <Input type="text" id="userName" placeholder="LukeSkywalker" maxLength="20" value={userName} onChange={() => updateUserName(event.target.value)} required />
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
              {!userNameCheckLoading && showUserNameCheck && userNameAvailable && <span> is available!</span>}
              {!userNameCheckLoading && showUserNameCheck && !userNameAvailable && <span> is not available!</span>}
            </p>
          </div>

          {/* email id */}
          <div className="w-full">
            <Label htmlFor="emailID">
              Email ID<span className="text-red-700">*</span>
            </Label>
            <Input type="text" id="emailID" defaultValue={session?.user_metadata?.email} readOnly required />
          </div>
        </div>

        {/* resume */}

        <div className="w-full mt-8">
          <div className="">
            <Label htmlFor="resume">
              <div className="flex justify-between">
                <span>
                  Resume <span className="text-xs text-zinc-400">(Optional)</span>
                </span>
                {resumeUploaded && (
                  <div className="flex gap-2">
                    <span className="text-xs text-zinc-400">Resume Uploaded</span>
                    <RiCheckboxCircleFill className="h-4 w-4 text-green-600" />
                  </div>
                )}
              </div>
            </Label>
          </div>
          <Input id="resume" type="file" onChange={handleResumeFileChange} />
        </div>

        <div className="w-full mt-8">
          <Label htmlFor="userName">
            What best describes you<span className="text-red-700">*</span>
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Developer" value={profession} onChange={() => updateProfession(event.target.value)} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {users.map((user) => (
                  <SelectItem key={user} value={user}>
                    {user}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="w-full mt-8">
          <Label htmlFor="skills">
            <div className="flex justify-between">
              <span>
                Skills<span className="text-red-700">*</span>
              </span>
              <span className="text-zinc-400 text-xs">Min 3, Max 10</span>
            </div>
          </Label>
          <InputTags value={skills} onChange={setSkills} placeholder="Add in your skills, comma separated." required className="mt-1" />
        </div>
        <div className="w-full mt-8 mb-20">
          <Label htmlFor="bio">
            Brief Bio<span className="text-red-700">*</span>
          </Label>
          <Textarea placeholder="" id="bio" maxLength="300" value={bio} onChange={() => updateBio(event.target.value)} required />
          <div className="flex justify-end mt-1" onClick={handleAIBio}>
            {!loadingAIBio && (
              <Badge variant="outline">
                <RiMagicLine className="h-4 w-4 mr-1" /> <span>Generate with Profolyo AI</span>
              </Badge>
            )}
            {loadingAIBio && (
              <Badge variant="outline">
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                <span>Generate with Profolyo AI</span>
              </Badge>
            )}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default ProfileForm;
