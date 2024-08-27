import { RiUser4Line } from '@remixicon/react';

const ProfileSmall = ({ userData }) => {
  return (
    <div className="rounded-lg flex flex-col justify-between h-full p-3 shadow-md cursor-pointer bg-zinc-100">
      <div className="flex gap-1 items-center">
        <RiUser4Line className="h-3 w-3 text-zinc-500" />
        <p className="text-xs text-zinc-500 ">Profile</p>
      </div>
      <img src={userData?.AvatarURL} referrerPolicy="no-referrer" alt="ProfilePic" className="w-24 h-24 rounded-lg mt-2 object-cover" />
      <div>
        <p className="font-semibold text-sm mt-2">{`${userData?.FirstName} ${userData?.LastName}`}</p>
        <p className="text-xs text-zinc-500 ">Maestro @Profolyo</p>
      </div>
    </div>
  );
};

export default ProfileSmall;
