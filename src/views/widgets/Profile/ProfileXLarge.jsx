import { v4 as uuidv4 } from 'uuid';
import AudioPlayer from '../../../components/AudioPlayer';
import hellothere from '../../../assets/hellothere.mp3';
import { RiUser4Line } from '@remixicon/react';
import { EditorLayout } from '../../../hooks/EditorContext';

const ProfileXLarge = ({ userData, clickToAdd }) => {
  const { updateProfolyoEditorLayout, setOpenWidgetContainer } = EditorLayout();

  const profile = {
    i: uuidv4(),
    x: 0,
    y: 0,
    w: 4,
    h: 4,
    size: 'xlarge',
    type: 'ProfileXLarge',
    component: 'ProfileXLarge',
    data: {
      title: `${userData?.FirstName} ${userData?.LastName}`,
      description: 'Maestro @Profolyo',
      badge: 'Profile',
      coverImage: userData?.AvatarURL,
      audioIntro: '',
    },
  };

  const handleClickToAdd = () => {
    if (clickToAdd) {
      updateProfolyoEditorLayout(profile);
      setOpenWidgetContainer(false);
    }
  };

  return (
    <div className="border rounded-lg flex flex-col justify-between h-full p-3 shadow-md cursor-pointer bg-profolyoWidget" onClick={handleClickToAdd}>
      <div className="flex gap-1 items-center">
        <RiUser4Line className="h-3 w-3 text-zinc-500" />
        <p className="text-xs text-zinc-500 ">{profile?.data?.badge}</p>
      </div>
      <img src={profile?.data?.coverImage} alt="profile" referrerPolicy="no-referrer" className="w-64 h-64 rounded-lg mt-2 object-cover" />

      <div className="flex gap-4">
        <div className="flex flex-col justify-center">
          <p className="font-semibold text-2xl">{profile?.data?.title}</p>
          <p className="text-lg text-zinc-500 ">{profile?.data?.description}</p>
        </div>
      </div>
      <AudioPlayer audio={hellothere} />

      <div></div>
    </div>
  );
};

export default ProfileXLarge;
