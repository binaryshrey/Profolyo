/************************************************************ IMPORTS ************************************************************/

import React, { createContext, useState, useContext } from 'react';

/************************************************************ IMPORTS ************************************************************/

const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [avatarURL, setAvatarURL] = useState('');
  const [avatarUploaded, setAvatarUploaded] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [profession, setProfession] = React.useState('Developer');
  const [skills, setSkills] = React.useState([]);

  const updateAvatarURL = (val) => setAvatarURL(val);
  const updateAvatarUploaded = (val) => setAvatarUploaded(val);
  const updateFirstName = (val) => setFirstName(val);
  const updateLastName = (val) => setLastName(val);
  const updateUserName = (val) => setUserName(val);
  const updateBio = (val) => setBio(val);
  const updateProfession = (val) => setProfession(val);

  return <ProfileContext.Provider value={{ avatarURL, avatarUploaded, firstName, lastName, userName, bio, profession, skills, updateAvatarURL, updateAvatarUploaded, updateFirstName, updateLastName, updateUserName, updateBio, updateProfession, setSkills }}>{children}</ProfileContext.Provider>;
};

export const UserProfile = () => useContext(ProfileContext);
