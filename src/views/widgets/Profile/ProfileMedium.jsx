import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AudioPlayer from '../../../components/AudioPlayer';
import hellothere from '../../../assets/hellothere.mp3';
import { RiUser4Line } from '@remixicon/react';
import { EditorLayout } from '../../../hooks/EditorContext';
import { ToggleGroup, ToggleGroupItem } from '../../../components/toggle-group';

const ProfileMedium = ({ userData, clickToAdd, widget, mode }) => {
  const { selectedWidget, setSelectedWidget, addProfolyoWidgetToEditor, setOpenWidgetContainer, updateLayoutAfterResize } = EditorLayout();
  const [showSizeToggle, setShowSizeToggle] = useState(false);

  const profile = {
    i: uuidv4(),
    x: 0,
    y: 0,
    w: 2,
    h: 2,
    size: 'medium',
    type: 'Profile',
    component: 'ProfileMedium',
    data: {
      title: `${userData?.FirstName} ${userData?.LastName}`,
      description: 'Maestro @Profolyo',
      badge: 'Profile',
      coverImage: userData?.AvatarURL,
      audioIntro: '',
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
      title: `${userData?.FirstName} ${userData?.LastName}`,
      description: 'Maestro @Profolyo',
      badge: 'Profile',
      coverImage: userData?.AvatarURL,
      audioIntro: '',
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

  const widgetSizeToggleToolbar = (widget) => {
    return (
      <div className="bg-profolyoExtraDark w-10 h-44 rounded-full absolute items-center flex flex-col justify-center -ml-11 z-10">
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
      <div className={`border rounded-lg flex flex-col justify-between h-full p-3 shadow-md cursor-pointer bg-profolyoWidget ${selectedWidget?.i === widget.i ? 'border border-4 border-profolyoExtraDark' : ''}`} onClick={handleClickToAdd}>
        <div className="flex gap-1 items-center">
          <RiUser4Line className="h-3 w-3 text-zinc-500" />
          <p className="text-xs text-zinc-500 ">{profile?.data?.badge}</p>
        </div>
        <div className="flex gap-4">
          <img src={profile?.data?.coverImage} alt="profile" referrerPolicy="no-referrer" className="w-28 h-28 rounded-lg mt-2 object-cover" />
          <div className="flex flex-col mt-4">
            <p className="font-semibold text-2xl">{profile?.data?.title}</p>
            <p className="text-lg text-zinc-500 ">{profile?.data?.description}</p>
          </div>
        </div>
        <AudioPlayer audio={hellothere} smallSize={false} />
      </div>
    </>
  );
};

export default ProfileMedium;
