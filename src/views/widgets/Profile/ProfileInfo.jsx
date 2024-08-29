import React from 'react';
import { EditorLayout } from '../../../hooks/EditorContext';
import TextToSpeech from '../../../components/TextToSpeech';

const ProfileInfo = () => {
  const { profileAudioVoice, profileAudio, setProfileAudioURL } = EditorLayout();

  const handleAudioFetch = async () => {
    const data = await TextToSpeech(profileAudioVoice, profileAudio);
    const blob = new Blob([data], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);
    setProfileAudioURL(url);
  };

  React.useEffect(() => {
    handleAudioFetch();
  }, []);

  return (
    <div className="rounded-lg flex flex-col justify-center h-full p-4">
      <p className="font-semibold text-3xl">Profile</p>
      <p className="text-md text-zinc-500 mt-2">Introduce yourself with a profile widget</p>
    </div>
  );
};

export default ProfileInfo;
