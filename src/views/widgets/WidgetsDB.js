import { v4 as uuidv4 } from 'uuid';
import linksMedia from '../../assets/linkmedia.png'

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


const infoLinks = () => {
  return{ i: uuidv4(), x: 0, y: 2, w: 1, h: 2, size: 'small', component: 'LinksInfo' }
}

const generateLinks = (i,x,y,w,h,size) => {
  return {
    i: i,
    x: x,
    y: y,
    w: w,
    h: h,
    size: size,
    component: 'Links',
    data: {
      title: 'Professional Portfolio Builder',
      coverImage: linksMedia,
      description: 'profolyo.me',
      link: 'https://www.profolyo.me/',
      background: 'theme',
      elevation: 'medium',
    },
  };
}
export const linksInfo = infoLinks();
export const linksSM = ( id) => generateLinks( id, 1, 2, 1, 2, 'small');
export const linksMD = ( id) => generateLinks( id, 0, 3, 2, 2, 'medium');
export const linksLG = ( id) => generateLinks( id, 3, 2, 2, 4, 'large');


const infoImages = () => {
  return{ i: uuidv4(), x: 0, y: 4, w: 1, h: 2, size: 'small', component: 'ImagesInfo' }
}

const generateImages = (i,x,y,w,h,size) => {
  return {
    i: i,
    x: x,
    y: y,
    w: w,
    h: h,
    size: size,
    component: 'Images',
    data: {
      title: 'Profolyo',
      coverImage: linksMedia,
      link: 'https://www.profolyo.me/',
      background: 'theme',
      elevation: 'medium',
    },
  };
}

export const imagesInfo = infoImages();
export const imagesSM = ( id) => generateImages( id, 1, 4, 1, 2, 'small');
export const imagesMD = ( id) => generateImages( id, 0, 5, 2, 2, 'medium');
export const imagesLG = ( id) => generateImages( id, 3, 4, 2, 4, 'large');