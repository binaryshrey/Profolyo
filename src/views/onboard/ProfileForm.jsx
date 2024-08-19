import React from 'react';
import { Input } from '../../components/input';
import { Label } from '../../components/label';
import { Textarea } from '../../components/textarea';
import { InputTags } from '../../components/input-tags';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../../components/select';

const ProfileForm = () => {
  const users = ['Developer', 'Designer', 'Marketer', 'Founder', 'Student', 'Indie Hacker', 'Data Scientist', 'Freelancer', 'Other'];

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [profession, setProfession] = React.useState('Developer');
  const [skills, setSkills] = React.useState([]);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleProfessionChange = (event) => {
    setProfession(event.target.value);
  };

  return (
    <div className="m-8">
      <div className="flex justify-between gap-8">
        <div className="w-full">
          <Label htmlFor="firstName">
            First Name<span className="text-red-700">*</span>
          </Label>
          <Input type="text" id="firstName" placeholder="Luke" maxLength="10" value={firstName} onChange={handleFirstNameChange} required />
        </div>
        <div className="w-full">
          <Label htmlFor="lastName">
            Last Name<span className="text-red-700">*</span>
          </Label>
          <Input type="text" id="lastName" placeholder="Skywalker" maxLength="10" value={lastName} onChange={handleLastNameChange} required />
        </div>
      </div>
      <div className="flex justify-between gap-8 mt-8">
        <div className="w-full">
          <Label htmlFor="userName">
            User Name<span className="text-red-700">*</span>
          </Label>
          <Input type="text" id="userName" placeholder="LukeSkywalker" maxLength="20" value={userName} onChange={handleUserNameChange} required />
          <p className="text-xs text-zinc-400 mt-1">{`profolyo.me/${userName}`}</p>
        </div>
        <div className="w-full">
          <Label htmlFor="userName">
            What best describes you<span className="text-red-700">*</span>
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Developer" value={profession} onChange={handleProfessionChange} />
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
            <span className="text-zinc-500 text-xs">Min 3, Max 10</span>
          </div>
        </Label>
        <InputTags value={skills} onChange={setSkills} placeholder="Add in your skills, comma separated." required className="mt-1" />
      </div>
      <div className="w-full mt-8">
        <Label htmlFor="bio">
          Brief Bio<span className="text-red-700">*</span>
        </Label>
        <Textarea placeholder="" id="bio" maxLength="300" value={bio} onChange={handleBioChange} required />
      </div>
    </div>
  );
};

export default ProfileForm;
