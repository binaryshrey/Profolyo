import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import linksmedia from '../../../assets/linkmedia.png';
import { EditorLayout } from '../../../hooks/EditorContext';
import { RiUser4Line, RiArrowRightUpLine } from '@remixicon/react';
import { ToggleGroup, ToggleGroupItem } from '../../../components/toggle-group';

const LinksLarge = ({ clickToAdd, widget, mode, viewMode }) => {
  const { linkTitle, setLinkTitle, linkDescription, setLinkDescription, linkImage, setLinkImage, linkURL, setLinkURL, profileCardBackground, profileCardElevation, setSelectedWidget, addProfolyoWidgetToEditor, setOpenWidgetContainer, updateLayoutAfterResize, selectedWidget } = EditorLayout();
  const [showSizeToggle, setShowSizeToggle] = useState(false);

  const link = {
    i: uuidv4(),
    x: 0,
    y: 0,
    w: 2,
    h: 4,
    size: 'large',
    type: 'Links',
    component: 'LinksLarge',
    data: {
      title: linkTitle,
      coverImage: linkImage,
      description: linkDescription,
      link: linkURL,
    },
  };

  const linkXS = {
    i: uuidv4(),
    x: 0,
    y: 0,
    w: 1,
    h: 2,
    size: 'small',
    type: 'Links',
    component: 'LinksSmall',
    data: {
      title: linkTitle,
      coverImage: linkImage,
      description: linkDescription,
      link: linkURL,
    },
  };

  const handleClickToAdd = () => {
    if (clickToAdd) {
      addProfolyoWidgetToEditor(link, link, link);
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
          <ToggleGroupItem value="small" size="xs" variant="outlineDark" className="w-8" onClick={() => updateLayout(1, 2, 'small', 'LinksSmall')}>
            <p className="text-sm">S</p>
          </ToggleGroupItem>
          <ToggleGroupItem value="medium" size="xs" variant="outlineDark" className="w-8" onClick={() => updateLayout(2, 2, 'medium', 'LinksMedium')}>
            <p className="text-sm">M</p>
          </ToggleGroupItem>
          <ToggleGroupItem value="large" size="xs" variant="outlineDark" className="w-8" onClick={() => updateLayout(2, 4, 'large', 'LinksLarge')}>
            <p className="text-sm">L</p>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    );
  };

  const getCardElevation = () => {
    if (profileCardElevation === 'default') {
      return 'shadow-md';
    } else if (profileCardElevation === 'large-low') {
      return 'shadow-sm';
    } else if (profileCardElevation === 'large-medium') {
      return 'shadow-md';
    } else if (profileCardElevation === 'large-high') {
      return 'shadow-lg';
    } else if (profileCardElevation === 'large-none') {
      return '';
    } else {
      return 'shadow-md';
    }
  };

  const getCardBackground = () => {
    if (profileCardBackground === 'default') {
      return 'bg-profolyoWidget';
    } else if (profileCardBackground === 'large-transparent') {
      return 'bg-profolyo';
    } else if (profileCardBackground === 'large-theme') {
      return 'bg-profolyoWidget';
    } else {
      return 'bg-profolyoWidget';
    }
  };

  return (
    <>
      <div>{!viewMode && showSizeToggle && selectedWidget?.i === widget.i && widgetSizeToggleToolbar(widget)}</div>
      <div onClick={handleClickToAdd} className={`rounded-lg flex flex-col justify-between h-full p-3 ${getCardElevation()} ${!viewMode ? 'cursor-pointer' : ''} ${getCardBackground()} ${!viewMode && showSizeToggle && selectedWidget?.i === widget.i ? 'border border-4 border-profolyoExtraDark' : ''}`}>
        <img src={linkImage || widget?.data?.coverImage} referrerPolicy="no-referrer" alt="ProfilePic" className="w-full h-96 rounded-lg mt-2 object-cover" />
        <div className="flex justify-between items-center gap-2">
          <div>
            <p className="font-semibold text-lg ">{linkTitle || widget?.data?.title}</p>
            <p className="text-sm text-zinc-500 ">{linkDescription || widget?.data?.description}</p>
          </div>
          <div className="h-10 w-10 hover:bg-profolyoDark hover:cursor-pointer rounded-full flex justify-center items-center">
            <Link to={linkURL || widget?.data?.link} target="_blank" rel="noopener noreferrer">
              <RiArrowRightUpLine className="h-6 w-6 text-zinc-500" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinksLarge;
