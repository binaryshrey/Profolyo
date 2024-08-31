import React from 'react';
import { Loader2 } from 'lucide-react';
import { Label } from '../../../components/label';
import { Button } from '../../../components/button';
import { supabase } from '../../../utils/Supabase';
import { UserAuth } from '../../../hooks/AuthContext';
import { showToast } from '../../../components/Toasts';
import { EditorLayout } from '../../../hooks/EditorContext';
import { UserProfile } from '../../../hooks/ProfileContext';
import TextToSpeech from '../../../components/TextToSpeech';
import { RiUser4Line, RiUpload2Line } from '@remixicon/react';
import { EditorInput } from '../../../components/editor-input';
import { EditorTextarea } from '../../../components/editor-textarea';
import { EditorScrollArea } from '../../../components/editor-scroll-area';
import { RiMagicLine, RiCloseCircleFill, RiCheckboxCircleFill } from '@remixicon/react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../../components/select';

const ProfileContent = () => {
  const { session } = UserAuth();
  const avatarUploadFileRef = React.useRef(null);
  const { updateAvatarURL, updateAvatarUploaded } = UserProfile();
  const SUPABASE_STORAGE_URL = import.meta.env.VITE_SUPABASE_STORAGE_URL;
  const VITE_SUPABASE_PROFOLYO_USERS_TABLENAME = import.meta.env.VITE_SUPABASE_PROFOLYO_USERS_TABLENAME;
  const { selectedWidget, updateCardTitle, profolyoEditorLayout, updateCardDescription, updateProfileBadge, updateCardCoverImage, updateProfileAudioIntro, updateProfileAudioVoice } = EditorLayout();

  const [layoutMode, setLayoutMode] = React.useState('md');
  const [avatarFile, setAvatarFile] = React.useState(null);
  const [savingAudio, setSavingAudio] = React.useState(false);
  const [showSavedAudio, setShowSavedAudio] = React.useState(true);
  const [savingAudioVoice, setSavingAudioVoice] = React.useState(false);
  const [showSavedAudioVoice, setShowSavedAudioVoice] = React.useState(true);

  const handleInputFileRef = () => {
    avatarUploadFileRef.current.click();
  };

  const getWidgetTitle = (widget) => {
    const component = profolyoEditorLayout[layoutMode].filter((item) => item.i === widget.i);
    return component[0]?.data?.title;
  };

  const getWidgetDescription = (widget) => {
    const component = profolyoEditorLayout[layoutMode].filter((item) => item.i === widget.i);
    return component[0]?.data?.description;
  };

  const getWidgetBadge = (widget) => {
    const component = profolyoEditorLayout[layoutMode].filter((item) => item.i === widget.i);
    return component[0]?.data?.badge;
  };

  const getWidgetCoverImage = (widget) => {
    const component = profolyoEditorLayout[layoutMode].filter((item) => item.i === widget.i);
    return component[0]?.data?.coverImage;
  };

  const getWidgetAudioIntro = (widget) => {
    const component = profolyoEditorLayout[layoutMode].filter((item) => item.i === widget.i);
    return component[0]?.data?.audioIntro;
  };
  const getWidgetAudioVoice = (widget) => {
    const component = profolyoEditorLayout[layoutMode].filter((item) => item.i === widget.i);
    return component[0]?.data?.audioVoice;
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
    showToast('Uploading Cover Image.', 'info');

    try {
      const fileName = `${session?.user_metadata?.name}-${Date.now()}-${selectedFile.name}`;
      //upload file to storage
      const { data, error } = await supabase.storage.from('avatars').upload(fileName, selectedFile, {
        cacheControl: '3600',
        upsert: false,
      });
      //update avatar url in user table
      await supabase
        .from(VITE_SUPABASE_PROFOLYO_USERS_TABLENAME)
        .update({ AvatarURL: `${SUPABASE_STORAGE_URL}avatars/${fileName}` })
        .eq('EmailID', session?.email);

      if (error) throw error;
      updateAvatarURL(`${SUPABASE_STORAGE_URL}avatars/${fileName}`);
      updateCardCoverImage(selectedWidget.i, `${SUPABASE_STORAGE_URL}avatars/${fileName}`);
      updateAvatarUploaded(true);
      showToast('Cover Image Uploaded Successfully!', 'success');
    } catch (error) {
      console.error('Error uploading file:', error.message);
      showToast(`Error uploading file: ${error.message}`, 'error');
    }
  };

  // React.useEffect(() => {
  //   const handleSaveAudioFromText = async () => {
  //     setSavingAudio(true);
  //     try {
  //       const data = await TextToSpeech(getWidgetAudioIntro(selectedWidget.i), getWidgetAudioVoice(selectedWidget.i));
  //       const blob = new Blob([data], { type: 'audio/mpeg' });
  //       const url = URL.createObjectURL(blob);
  //       updateProfileAu(url);
  //     } catch (error) {
  //       console.error('Error saving audio :', error.message);
  //       showToast(`Error saving audio: ${error.message}`, 'error');
  //     } finally {
  //       setSavingAudio(false);
  //     }
  //   };

  //   const timer = setTimeout(() => {
  //     if (profileAudio) {
  //       handleSaveAudioFromText();
  //     }
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, [profileAudio]);

  // React.useEffect(() => {
  //   const handleSaveAudioFromTextVoice = async () => {
  //     setSavingAudioVoice(true);
  //     try {
  //       const data = await TextToSpeech(profileAudioVoice, profileAudio);
  //       const blob = new Blob([data], { type: 'audio/mpeg' });
  //       const url = URL.createObjectURL(blob);
  //       setProfileAudioURL(url);
  //     } catch (error) {
  //       console.error('Error saving audio :', error.message);
  //       showToast(`Error saving audio: ${error.message}`, 'error');
  //     } finally {
  //       setSavingAudioVoice(false);
  //     }
  //   };

  //   const timer = setTimeout(() => {
  //     if (profileAudio) {
  //       handleSaveAudioFromTextVoice();
  //     }
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, [profileAudioVoice]);

  React.useEffect(() => {
    const editorLayoutSize = () => {
      if (window.innerWidth >= 1024) {
        setLayoutMode('md');
      } else if (window.innerWidth < 1024 && window.innerWidth >= 767) {
        setLayoutMode('sm');
      } else {
        setLayoutMode('xs');
      }
    };

    editorLayoutSize();

    window.addEventListener('resize', editorLayoutSize);
    return () => window.removeEventListener('resize', editorLayoutSize);
  }, []);

  return (
    <>
      <div className="w-full flex flex-col gap-2 ">
        <div className="pl-1 pr-1">
          <Label htmlFor="title">Title</Label>
          <EditorInput type="text" id="title" placeholder="Luke" maxLength="20" value={getWidgetTitle(selectedWidget)} onChange={() => updateCardTitle(selectedWidget.i, event.target.value)} />
        </div>

        <div className="pl-1 pr-1 pt-8">
          <Label htmlFor="desc">Description</Label>
          <EditorTextarea type="text" id="desc" placeholder="Jedi Knight" maxLength="100" value={getWidgetDescription(selectedWidget)} onChange={() => updateCardDescription(selectedWidget.i, event.target.value)} />
        </div>

        <div className="pl-1 pr-1 pt-8">
          <Label htmlFor="badge">Badge</Label>
          <div className="flex gap-2 items-center">
            <RiUser4Line className="h-6 w-6 text-zinc-500" />
            <EditorInput type="text" id="title" placeholder="Profile" maxLength="20" value={getWidgetBadge(selectedWidget)} onChange={() => updateProfileBadge(selectedWidget.i, event.target.value)} />
          </div>
        </div>

        <Label htmlFor="image" className="mt-8">
          Cover Image
        </Label>
        <div className="relative cursor-pointer hover:opacity-80" onClick={handleInputFileRef}>
          <img src={getWidgetCoverImage(selectedWidget)} alt="cover" className="w-64 h-64 object-fit rounded-lg" />
          <Button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" variant="profolyoOutline">
            <RiUpload2Line className="h-4 w-4 text-black mr-2" />
            Upload Image
          </Button>
          <input type="file" onChange={handleFileChange} className="hidden" ref={avatarUploadFileRef} />
        </div>

        <div className="pl-1 pr-1 pt-4">
          <Label htmlFor="audioVoice" className="mt-8 flex gap-2 mb-1">
            Audio Voice
            <a href="https://elevenlabs.io/" className="text-xs text-zinc-500" target="_blank" rel="noopener noreferrer">
              (PoweredBy ElevenLabs)
            </a>
            <>
              {savingAudioVoice && <Loader2 className="h-4 w-4 animate-spin" />}
              {!savingAudioVoice && showSavedAudioVoice && <RiCheckboxCircleFill className="h-4 w-4 text-green-600" />}
            </>
          </Label>
          <Select defaultValue="male" onValueChange={(val) => updateProfileAudioVoice(selectedWidget.i, val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Audio Voice" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="pl-1 pr-1 pt-4 pb-4">
          <Label htmlFor="audioIntro" className="mt-8 flex gap-2 mb-1">
            Audio Intro
            <a href="https://elevenlabs.io/" className="text-xs text-zinc-500" target="_blank" rel="noopener noreferrer">
              (PoweredBy ElevenLabs)
            </a>
            <>
              {savingAudio && <Loader2 className="h-4 w-4 animate-spin" />}
              {!savingAudio && showSavedAudio && <RiCheckboxCircleFill className="h-4 w-4 text-green-600" />}
            </>
          </Label>
          <EditorTextarea type="text" id="audioIntro" placeholder="Hello There!" maxLength="100" value={getWidgetAudioIntro(selectedWidget)} onChange={() => updateProfileAudioIntro(selectedWidget.i, event.target.value)} />
        </div>
      </div>
    </>
  );
};

export default ProfileContent;
