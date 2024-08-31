import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { RiUser4Line } from '@remixicon/react';
import AudioPlayer from '../../../components/AudioPlayer';
import { EditorLayout } from '../../../hooks/EditorContext';
import { profileSM, profileMD, profileLG, profileXL } from '../WidgetsDB';
import { ToggleGroup, ToggleGroupItem } from '../../../components/toggle-group';

const Profile = ({ clickToAdd, widget, mode, viewMode }) => {
  const id = uuidv4();
  const { profolyoEditorUserData, setSelectedWidget, addProfolyoWidgetToEditor, setOpenWidgetContainer, updateLayoutAfterResize, selectedWidget } = EditorLayout();
  const smProfile = profileSM(profolyoEditorUserData, id);
  const mdProfile = profileMD(profolyoEditorUserData, id);
  const lgProfile = profileLG(profolyoEditorUserData, id);
  const xlProfile = profileXL(profolyoEditorUserData, id);

  const [showSizeToggle, setShowSizeToggle] = useState(false);

  const handleClickToAdd = (widgetXS, widgetSM, widgetMD) => {
    if (clickToAdd) {
      addProfolyoWidgetToEditor(widgetXS, widgetSM, widgetMD);
      setOpenWidgetContainer(false);
    } else {
      setSelectedWidget(widget);
      setShowSizeToggle(true);
    }
  };

  const updateLayout = (h, w, size, component) => {
    updateLayoutAfterResize(h, w, size, component, mode, widget.i);
  };

  const widgetSizeToggleToolbar = (widget) => {
    return (
      <div className="bg-profolyoExtraDark w-10 h-44 rounded-full absolute items-center flex flex-col justify-center -ml-11 ">
        <ToggleGroup type="single" className="flex flex-col" defaultValue={widget?.size}>
          <ToggleGroupItem value="small" size="xs" variant="outlineDark" className="w-8" onClick={() => updateLayout(1, 2, 'small', 'Profile')}>
            <p className="text-sm">S</p>
          </ToggleGroupItem>
          <ToggleGroupItem value="medium" size="xs" variant="outlineDark" className="w-8" onClick={() => updateLayout(2, 2, 'medium', 'Profile')}>
            <p className="text-sm">M</p>
          </ToggleGroupItem>
          <ToggleGroupItem value="large" size="xs" variant="outlineDark" className="w-8" onClick={() => updateLayout(2, 4, 'large', 'Profile')}>
            <p className="text-sm">L</p>
          </ToggleGroupItem>
          <ToggleGroupItem value="xlarge" size="xs" variant="outlineDark" className="w-8" onClick={() => updateLayout(4, 4, 'xlarge', 'Profile')}>
            <p className="text-sm">XL</p>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    );
  };

  const getCardElevation = () => {
    let currentElevation = widget?.data?.elevation;
    if (currentElevation === 'none') {
      return '';
    } else if (currentElevation === 'small') {
      return 'shadow-sm';
    } else if (currentElevation === 'medium') {
      return 'shadow-md';
    } else if (currentElevation === 'high') {
      return 'shadow-lg';
    } else {
      return 'shadow-md';
    }
  };

  const getCardBackground = () => {
    let currentBG = widget?.data?.background;
    if (currentBG === 'transparent') {
      return 'bg-profolyo';
    } else if (currentBG === 'theme') {
      return 'bg-profolyoWidget';
    } else {
      return 'bg-profolyoWidget';
    }
  };

  const profileSmall = () => {
    return (
      <>
        <div>{!viewMode && showSizeToggle && selectedWidget?.i === widget.i && widgetSizeToggleToolbar(widget)}</div>
        <div onClick={() => handleClickToAdd(smProfile, smProfile, smProfile)} className={`rounded-lg flex flex-col justify-between h-full p-3 ${getCardElevation()} ${!viewMode ? 'cursor-pointer' : ''} ${getCardBackground()} ${!viewMode && showSizeToggle && selectedWidget?.i === widget.i ? 'border border-4 border-profolyoExtraDark' : ''}`}>
          <div className="flex gap-1 items-center">
            <RiUser4Line className="h-3 w-3 text-zinc-500" />
            <p className="text-xs text-zinc-500 ">{widget?.data?.badge}</p>
          </div>
          <img src={widget?.data?.coverImage} referrerPolicy="no-referrer" alt="ProfilePic" className="w-24 h-24 rounded-lg mt-2 object-cover" />
          <div>
            <p className="font-semibold text-xl ">{widget?.data?.title}</p>
            <p className="text-sm text-zinc-500 ">{widget?.data?.description}</p>
          </div>
          <AudioPlayer smallSize={true} audioIntro={widget?.data?.audioIntro} />
        </div>
      </>
    );
  };

  const profileMedium = () => {
    return (
      <>
        <div>{!viewMode && showSizeToggle && selectedWidget?.i === widget.i && widgetSizeToggleToolbar(widget)}</div>
        <div onClick={() => handleClickToAdd(smProfile, mdProfile, mdProfile)} className={`rounded-lg flex flex-col justify-between h-full p-3 ${getCardElevation()} ${!viewMode ? 'cursor-pointer' : ''} ${getCardBackground()} ${!viewMode && showSizeToggle && selectedWidget?.i === widget.i ? 'border border-4 border-profolyoExtraDark' : ''}`}>
          <div className="flex gap-1 items-center">
            <RiUser4Line className="h-3 w-3 text-zinc-500" />
            <p className="text-xs text-zinc-500 ">{widget?.data?.badge}</p>
          </div>
          <div className="flex gap-4">
            <img src={widget?.data?.coverImage} alt="profile" referrerPolicy="no-referrer" className="w-28 h-28 rounded-lg mt-2 object-cover" />
            <div className="flex flex-col mt-4">
              <p className="font-semibold text-2xl">{widget?.data?.title}</p>
              <p className="text-lg text-zinc-500 ">{widget?.data?.description}</p>
            </div>
          </div>
          <AudioPlayer smallSize={false} audioIntro={widget?.data?.audioIntro} />
        </div>
      </>
    );
  };

  const profileLarge = () => {
    return (
      <>
        <div>{!viewMode && showSizeToggle && selectedWidget?.i === widget.i && widgetSizeToggleToolbar(widget)}</div>
        <div onClick={() => handleClickToAdd(smProfile, lgProfile, lgProfile)} className={`rounded-lg flex flex-col justify-between h-full p-3 ${getCardElevation()} ${!viewMode ? 'cursor-pointer' : ''} ${getCardBackground()} ${!viewMode && showSizeToggle && selectedWidget?.i === widget.i ? 'border border-4 border-profolyoExtraDark' : ''}`}>
          <div className="flex gap-1 items-center">
            <RiUser4Line className="h-3 w-3 text-zinc-500" />
            <p className="text-xs text-zinc-500 ">{widget?.data?.badge}</p>
          </div>
          <img src={widget?.data?.coverImage} alt="profile" referrerPolicy="no-referrer" className="w-full h-64 rounded-lg mt-2 object-cover" />

          <div className="flex gap-4">
            <div className="flex flex-col justify-center">
              <p className="font-semibold text-2xl">{widget?.data?.title}</p>
              <p className="text-lg text-zinc-500 ">{widget?.data?.description}</p>
            </div>
          </div>
          <AudioPlayer smallSize={false} audioIntro={widget?.data?.audioIntro} />
        </div>
      </>
    );
  };

  const profileXLarge = () => {
    return (
      <>
        <div>{!viewMode && showSizeToggle && selectedWidget?.i === widget.i && widgetSizeToggleToolbar(widget)}</div>
        <div onClick={() => handleClickToAdd(smProfile, xlProfile, xlProfile)} className={`rounded-lg flex flex-col justify-between h-full p-3 ${getCardElevation()} ${!viewMode ? 'cursor-pointer' : ''} ${getCardBackground()} ${!viewMode && showSizeToggle && selectedWidget?.i === widget.i ? 'border border-4 border-profolyoExtraDark' : ''}`}>
          <div className="flex gap-1 items-center">
            <RiUser4Line className="h-3 w-3 text-zinc-500" />
            <p className="text-xs text-zinc-500 ">{widget?.data?.badge}</p>
          </div>
          <img src={widget?.data?.coverImage} alt="profile" referrerPolicy="no-referrer" className="w-64 h-64 rounded-lg mt-2 object-cover" />

          <div className="flex gap-4">
            <div className="flex flex-col justify-center">
              <p className="font-semibold text-2xl">{widget?.data?.title}</p>
              <p className="text-lg text-zinc-500 ">{widget?.data?.description}</p>
            </div>
          </div>
          <AudioPlayer smallSize={false} audioIntro={widget?.data?.audioIntro} />
        </div>
      </>
    );
  };

  return (
    <>
      {widget.size === 'small' && profileSmall()}
      {widget.size === 'medium' && profileMedium()}
      {widget.size === 'large' && profileLarge()}
      {widget.size === 'xlarge' && profileXLarge()}
    </>
  );
};

export default Profile;
