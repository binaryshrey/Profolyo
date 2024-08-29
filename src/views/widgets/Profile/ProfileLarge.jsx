import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { RiUser4Line } from '@remixicon/react';
import AudioPlayer from '../../../components/AudioPlayer';
import { EditorLayout } from '../../../hooks/EditorContext';
import { ToggleGroup, ToggleGroupItem } from '../../../components/toggle-group';

const ProfileLarge = ({ clickToAdd, widget, mode }) => {
  const { profileCardElevation, setProfileCardElevation, profileAudioURL, profileBadge, profileImage, profileDescription, profileTitle, setSelectedWidget, addProfolyoWidgetToEditor, setOpenWidgetContainer, updateLayoutAfterResize, selectedWidget } = EditorLayout();
  const [showSizeToggle, setShowSizeToggle] = useState(false);

  const profile = {
    i: uuidv4(),
    x: 0,
    y: 0,
    w: 2,
    h: 4,
    size: 'large',
    type: 'Profile',
    component: 'ProfileLarge',
    data: {
      title: profileTitle,
      description: profileDescription,
      badge: profileBadge,
      coverImage: profileImage,
      audioIntro: profileAudioURL,
    },
  };

  const profileXS = {
    i: uuidv4(),
    x: 0,
    y: 0,
    w: 1,
    h: 2,
    size: 'small',
    type: 'Profile',
    component: 'ProfileSmall',
    data: {
      title: profileTitle,
      description: profileDescription,
      badge: profileBadge,
      coverImage: profileImage,
      audioIntro: profileAudioURL,
    },
  };

  const handleClickToAdd = () => {
    if (clickToAdd) {
      addProfolyoWidgetToEditor(profileXS, profile, profile);
      setOpenWidgetContainer(false);
    } else {
      setSelectedWidget(widget);
      setShowSizeToggle(true);
    }
  };

  const updateLayout = (w, h, size, component) => {
    updateLayoutAfterResize(w, h, size, component, mode, widget.i);
  };

  const getCardElevation = () => {
    if (profileCardElevation === 'large-low') {
      return 'shadow-md';
    } else if (profileCardElevation === 'large-medium') {
      return 'shadow-md';
    } else if (profileCardElevation === 'large-high') {
      return 'shadow-lg';
    } else {
      return 'shadow-md';
    }
  };
  const widgetSizeToggleToolbar = (widget) => {
    return (
      <div className="bg-profolyoExtraDark w-10 h-44 rounded-full absolute items-center flex flex-col justify-center -ml-11 ">
        <ToggleGroup type="single" className="flex flex-col" defaultValue={widget?.size}>
          <ToggleGroupItem value="small" size="xs" variant="outlineDark" className="w-8" onClick={() => updateLayout(1, 2, 'small', 'ProfileSmall')}>
            <p className="text-sm">S</p>
          </ToggleGroupItem>
          <ToggleGroupItem value="medium" size="xs" variant="outlineDark" className="w-8" onClick={() => updateLayout(2, 2, 'medium', 'ProfileMedium')}>
            <p className="text-sm">M</p>
          </ToggleGroupItem>
          <ToggleGroupItem value="large" size="xs" variant="outlineDark" className="w-8" onClick={() => updateLayout(2, 4, 'large', 'ProfileLarge')}>
            <p className="text-sm">L</p>
          </ToggleGroupItem>
          <ToggleGroupItem value="xlarge" size="xs" variant="outlineDark" className="w-8" onClick={() => updateLayout(4, 4, 'xlarge', 'ProfileXLarge')}>
            <p className="text-sm">XL</p>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    );
  };

  return (
    <>
      <div>{showSizeToggle && selectedWidget?.i === widget.i && widgetSizeToggleToolbar(widget)}</div>
      <div className={`border rounded-lg flex flex-col justify-between h-full p-3 ${getCardElevation()} cursor-pointer bg-profolyoWidget ${showSizeToggle && selectedWidget?.i === widget.i ? 'border border-4 border-profolyoExtraDark' : ''}`} onClick={handleClickToAdd}>
        <div className="flex gap-1 items-center">
          <RiUser4Line className="h-3 w-3 text-zinc-500" />
          <p className="text-xs text-zinc-500 ">{profileBadge}</p>
        </div>
        <img src={profileImage} alt="profile" referrerPolicy="no-referrer" className="w-full h-64 rounded-lg mt-2 object-cover" />

        <div className="flex gap-4">
          <div className="flex flex-col justify-center">
            <p className="font-semibold text-2xl">{profileTitle}</p>
            <p className="text-lg text-zinc-500 ">{profileDescription}</p>
          </div>
        </div>
        <AudioPlayer smallSize={false} />
      </div>
    </>
  );
};

export default ProfileLarge;
