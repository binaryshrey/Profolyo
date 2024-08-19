import React from 'react';
import { splitName } from '../../utils/utils';
import { Input } from '../../components/input';
import { Label } from '../../components/label';
import { UserAuth } from '../../hooks/AuthContext';
import { Textarea } from '../../components/textarea';
import { InputTags } from '../../components/input-tags';
import { UserProfile } from '../../hooks/ProfileContext';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../components/select';

const ProfileForm = () => {
  const { session } = UserAuth();
  const { avatarURL, firstName, lastName, userName, bio, profession, skills, updateAvatarURL, updateFirstName, updateLastName, updateUserName, updateBio, updateProfession, setSkills } = UserProfile();
  const users = ['Developer', 'Designer', 'Marketer', 'Founder', 'Student', 'Indie Hacker', 'Data Scientist', 'Freelancer', 'Other'];

  React.useEffect(() => {
    const name = session?.user_metadata?.name;
    const imgURL = session?.user_metadata?.picture !== undefined ? session?.user_metadata?.picture : session?.user_metadata?.avatar_url;
    if (imgURL) {
      updateAvatarURL(imgURL);
    }
    if (name) {
      const { fName, lName } = splitName(name);
      updateFirstName(fName);
      updateLastName(lName);
    }
  }, [session]);

  return (
    <div className="m-8">
      <div className="flex justify-between gap-8">
        <div className="w-full">
          <Label htmlFor="firstName">
            First Name<span className="text-red-700">*</span>
          </Label>
          <Input type="text" id="firstName" placeholder="Luke" maxLength="10" value={firstName} onChange={() => updateFirstName(event.target.value)} required />
        </div>
        <div className="w-full">
          <Label htmlFor="lastName">
            Last Name<span className="text-red-700">*</span>
          </Label>
          <Input type="text" id="lastName" placeholder="Skywalker" maxLength="10" value={lastName} onChange={() => updateLastName(event.target.value)} required />
        </div>
      </div>
      <div className="flex justify-between gap-8 mt-8">
        <div className="w-full">
          <Label htmlFor="userName">
            User Name<span className="text-red-700">*</span>
          </Label>
          <Input type="text" id="userName" placeholder="LukeSkywalker" maxLength="20" value={userName} onChange={() => updateUserName(event.target.value)} required />
          <p className="text-xs text-zinc-400 mt-1">{`profolyo.me/${userName}`}</p>
        </div>
        <div className="w-full">
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
      <div className="w-full mt-8">
        <Label htmlFor="bio">
          Brief Bio<span className="text-red-700">*</span>
        </Label>
        <Textarea placeholder="" id="bio" maxLength="300" value={bio} onChange={() => updateBio(event.target.value)} required />
      </div>
    </div>
  );
};

export default ProfileForm;
