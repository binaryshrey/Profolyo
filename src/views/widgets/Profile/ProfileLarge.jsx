import AudioPlayer from '../../../components/AudioPlayer';
import hellothere from '../../../assets/hellothere.mp3';
import { RiUser4Line } from '@remixicon/react';

const ProfileLarge = ({ userData }) => {
  return (
    <div className="border rounded-lg flex flex-col justify-between h-full p-3 shadow-md cursor-pointer bg-zinc-100">
      <div className="flex gap-1 items-center">
        <RiUser4Line className="h-3 w-3 text-zinc-500" />
        <p className="text-xs text-zinc-500 ">Profile</p>
      </div>
      <img src={userData?.AvatarURL} alt="profile" referrerPolicy="no-referrer" className="w-full h-56 rounded-lg mt-2 object-cover" />

      <div className="flex gap-4">
        <div className="flex flex-col justify-center">
          <p className="font-semibold text-md mt-2">{`${userData?.FirstName} ${userData?.LastName}`}</p>
          <p className="text-sm text-zinc-500 ">Maestro @Profolyo</p>
        </div>
      </div>
      <AudioPlayer audio={hellothere} />

      <div></div>
    </div>
  );
};

export default ProfileLarge;
