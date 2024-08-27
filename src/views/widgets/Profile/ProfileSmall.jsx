import { v4 as uuidv4 } from 'uuid';
import { RiUser4Line } from '@remixicon/react';
import { EditorLayout } from '../../../hooks/EditorContext';

const ProfileSmall = ({ userData, clickToAdd, closeWidgetContainer }) => {
  const { updateProfolyoEditorLayout } = EditorLayout();

  const profile = { i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'small', type: 'ProfileSmall', component: 'ProfileSmall' };

  const handleClickToAdd = () => {
    if (clickToAdd) {
      updateProfolyoEditorLayout(profile);
      closeWidgetContainer(false);
    }
  };

  return (
    <div className="rounded-lg flex flex-col justify-between h-full p-3 shadow-md cursor-pointer bg-zinc-100" onClick={handleClickToAdd}>
      <div className="flex gap-1 items-center">
        <RiUser4Line className="h-3 w-3 text-zinc-500" />
        <p className="text-xs text-zinc-500 ">Profile</p>
      </div>
      <img src={userData?.AvatarURL} referrerPolicy="no-referrer" alt="ProfilePic" className="w-28 h-28 rounded-lg mt-2 object-cover" />
      <div>
        <p className="font-semibold text-xl ">{`${userData?.FirstName} ${userData?.LastName}`}</p>
        <p className="text-sm text-zinc-500 ">Maestro @Profolyo</p>
      </div>
    </div>
  );
};

export default ProfileSmall;
