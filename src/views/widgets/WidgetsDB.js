import { v4 as uuidv4 } from 'uuid';

const infoProfile = () => {
  return{ i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'small', component: 'ProfileInfo' }
}

const generateProfile = (profolyoEditorUserData, i, x, y, w, h, size) => {
  return {
    i: i,
    x: x,
    y: y,
    w: w,
    h: h,
    size: size,
    component: 'Profile',
    data: {
      title: `${profolyoEditorUserData[0]?.FirstName} ${profolyoEditorUserData[0]?.LastName}`,
      description: profolyoEditorUserData[0]?.UserBio,
      badge: 'About Me',
      coverImage: profolyoEditorUserData[0]?.AvatarURL,
      audioVoice: 'male',
      audioIntro: `Hello There! I'm ${profolyoEditorUserData[0]?.FirstName} ${profolyoEditorUserData[0]?.LastName}`,
      background: 'theme',
      elevation: 'medium',
    },
  };
};

export const profileInfo = infoProfile();
export const profileSM = (profolyoEditorUserData, id) => generateProfile(profolyoEditorUserData, id, 1, 0, 1, 2, 'small');
export const profileMD = (profolyoEditorUserData, id) => generateProfile(profolyoEditorUserData, id, 0, 1, 2, 2, 'medium');
export const profileLG = (profolyoEditorUserData, id) => generateProfile(profolyoEditorUserData, id, 2, 0, 2, 4, 'large');
export const profileXL = (profolyoEditorUserData, id) => generateProfile(profolyoEditorUserData, id, 3, 1, 4, 4, 'xlarge');
