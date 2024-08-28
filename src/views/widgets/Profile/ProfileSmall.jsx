import { v4 as uuidv4 } from 'uuid';
import { RiUser4Line } from '@remixicon/react';
import { EditorLayout } from '../../../hooks/EditorContext';
import AudioPlayer from '../../../components/AudioPlayer';
import hellothere from '../../../assets/hellothere.mp3';

const ProfileSmall = ({ userData, clickToAdd }) => {
  const { selectedWidget, setSelectedWidget, addProfolyoWidgetToEditor, setOpenWidgetContainer } = EditorLayout();

  const profile = {
    i: uuidv4(),
    x: 0,
    y: 0,
    w: 1,
    h: 2,
    size: 'small',
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
      addProfolyoWidgetToEditor(profile, profile, profile);
      setOpenWidgetContainer(false);
    }
  };

  return (
    <div className="rounded-lg flex flex-col justify-between h-full p-3 shadow-md cursor-pointer bg-profolyoWidget" onClick={handleClickToAdd}>
      <div className="flex gap-1 items-center">
        <RiUser4Line className="h-3 w-3 text-zinc-500" />
        <p className="text-xs text-zinc-500 ">{profile?.data?.badge}</p>
      </div>
      <img src={profile?.data?.coverImage} referrerPolicy="no-referrer" alt="ProfilePic" className="w-24 h-24 rounded-lg mt-2 object-cover" />
      <div>
        <p className="font-semibold text-xl ">{profile?.data?.title}</p>
        <p className="text-sm text-zinc-500 ">{profile?.data?.description}</p>
      </div>
      <AudioPlayer audio={hellothere} smallSize={true} />
    </div>
  );
};

export default ProfileSmall;
