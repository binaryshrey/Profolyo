/************************************************************ IMPORTS ************************************************************/

import React, { createContext, useState, useContext } from 'react';
import { integrations } from '../services/data/integrations';

/************************************************************ IMPORTS ************************************************************/

const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [avatarURL, setAvatarURL] = useState('');
  const [avatarUploaded, setAvatarUploaded] = useState(false);
  const [resumeURL, setResumeURL] = useState('');
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [profession, setProfession] = React.useState('Developer');
  const [skills, setSkills] = React.useState([]);
  const [appConnections, setAppConnections] = useState(
    integrations.reduce((acc, app) => {
      acc[app.name] = { connected: false, username: '', profile_url: '' };
      return acc;
    }, {}),
  );

  const updateAvatarURL = (val) => setAvatarURL(val);
  const updateAvatarUploaded = (val) => setAvatarUploaded(val);
  const updateResumeURL = (val) => setResumeURL(val);
  const updateResumeUploaded = (val) => setResumeUploaded(val);
  const updateFirstName = (val) => setFirstName(val);
  const updateLastName = (val) => setLastName(val);
  const updateUserName = (val) => setUserName(val);
  const updateBio = (val) => setBio(val);
  const updateProfession = (val) => setProfession(val);
  const toggleAppConnection = (appName) => {
    setAppConnections((prevState) => ({
      ...prevState,
      [appName]: {
        ...prevState[appName],
        connected: !prevState[appName].connected,
      },
    }));
  };
  const connectAppConnection = (appName) => {
    setAppConnections((prevState) => ({
      ...prevState,
      [appName]: {
        ...prevState[appName],
        connected: true,
      },
    }));
  };
  const disConnectAppConnection = (appName) => {
    setAppConnections((prevState) => ({
      ...prevState,
      [appName]: {
        ...prevState[appName],
        connected: false,
      },
    }));
  };
  const handleAppUsernameChange = (appName, username, profile_url) => {
    setAppConnections((prevState) => ({
      ...prevState,
      [appName]: {
        ...prevState[appName],
        username,
        profile_url,
      },
    }));
  };

  return <ProfileContext.Provider value={{ avatarURL, avatarUploaded, firstName, lastName, userName, bio, profession, skills, updateAvatarURL, updateAvatarUploaded, updateFirstName, updateLastName, updateUserName, updateBio, updateProfession, setSkills, appConnections, toggleAppConnection, connectAppConnection, disConnectAppConnection, handleAppUsernameChange, resumeURL, resumeUploaded, updateResumeURL, updateResumeUploaded, setAppConnections }}>{children}</ProfileContext.Provider>;
};

export const UserProfile = () => useContext(ProfileContext);
