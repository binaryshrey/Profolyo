import { v4 as uuidv4 } from 'uuid';
import AudioPlayer from '../../../components/AudioPlayer';
import hellothere from '../../../assets/hellothere.mp3';
import { RiUser4Line } from '@remixicon/react';
import { EditorLayout } from '../../../hooks/EditorContext';

const ProfileMedium = ({ userData, clickToAdd }) => {
  const { addProfolyoWidgetToEditor, setOpenWidgetContainer } = EditorLayout();

  const profile = {
    i: uuidv4(),
    x: 0,
    y: 0,
    w: 2,
    h: 2,
    size: 'medium',
    component: 'ProfileMedium',
    data: {
      title: `${userData?.FirstName} ${userData?.LastName}`,
      description: 'Maestro @Profolyo',
      badge: 'Profile',
      coverImage: userData?.AvatarURL,
      audioIntro: '',
    },
  };

  const profileXS = {
    i: uuidv4(),
    x: 0,
    y: 0,
    w: 1,
    h: 2,
    size: 'small',
    type: 'ProfileSmall',
    component: 'ProfileSmall',
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
      addProfolyoWidgetToEditor(profileXS, profile, profile);
      setOpenWidgetContainer(false);
    }
  };

  return (
    <div className="border rounded-lg flex flex-col justify-between h-full p-3 shadow-md cursor-pointer bg-profolyoWidget" onClick={handleClickToAdd}>
      <div className="flex gap-1 items-center">
        <RiUser4Line className="h-3 w-3 text-zinc-500" />
        <p className="text-xs text-zinc-500 ">{profile?.data?.badge}</p>
      </div>
      <div className="flex gap-4">
        <img src={profile?.data?.coverImage} alt="profile" referrerPolicy="no-referrer" className="w-28 h-28 rounded-lg mt-2 object-cover" />
        <div className="flex flex-col mt-4">
          <p className="font-semibold text-2xl">{profile?.data?.title}</p>
          <p className="text-lg text-zinc-500 ">{profile?.data?.description}</p>
        </div>
      </div>
      <AudioPlayer audio={hellothere} smallSize={false} />
    </div>
  );
};

export default ProfileMedium;
