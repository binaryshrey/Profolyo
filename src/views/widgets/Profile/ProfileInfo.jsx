const ProfileInfo = ({ userData }) => {
  console.log('ProfileInfo', userData);
  return (
    <div className="rounded-lg flex flex-col justify-center h-full p-4 ">
      <p className="font-semibold text-2xl">Profile</p>
      <p className="text-xs text-zinc-500 mt-2">Introduce yourself with a profile widget</p>
    </div>
  );
};

export default ProfileInfo;
