import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { EditorLayout } from '../../../hooks/EditorContext';
import { linksSM, linksMD, linksLG } from '../WidgetsDB';
import { RiUser4Line, RiArrowRightUpLine } from '@remixicon/react';

import { ToggleGroup, ToggleGroupItem } from '../../../components/toggle-group';

const Links = ({ clickToAdd, widget, mode, viewMode }) => {
  const id = uuidv4();
  const { setSelectedWidget, addProfolyoWidgetToEditor, setOpenWidgetContainer, updateLayoutAfterResize, selectedWidget } = EditorLayout();
  const smLinks = linksSM(id);
  const mdLinks = linksMD(id);
  const lgLinks = linksLG(id);

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
          <ToggleGroupItem value="small" size="xs" variant="outlineDark" className="w-8" onClick={() => updateLayout(1, 2, 'small', 'Links')}>
            <p className="text-sm">S</p>
          </ToggleGroupItem>
          <ToggleGroupItem value="medium" size="xs" variant="outlineDark" className="w-8" onClick={() => updateLayout(2, 2, 'medium', 'Links')}>
            <p className="text-sm">M</p>
          </ToggleGroupItem>
          <ToggleGroupItem value="large" size="xs" variant="outlineDark" className="w-8" onClick={() => updateLayout(2, 4, 'large', 'Links')}>
            <p className="text-sm">L</p>
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

  const linksSmall = () => {
    return (
      <>
        <div>{!viewMode && showSizeToggle && selectedWidget?.i === widget.i && widgetSizeToggleToolbar(widget)}</div>
        <div onClick={() => handleClickToAdd(smLinks, smLinks, smLinks)} className={`rounded-lg flex flex-col justify-between h-full p-3 ${getCardElevation()} ${!viewMode ? 'cursor-pointer' : ''} ${getCardBackground()} ${!viewMode && showSizeToggle && selectedWidget?.i === widget.i ? 'border border-4 border-profolyoExtraDark' : ''}`}>
          <img src={widget?.data?.coverImage} referrerPolicy="no-referrer" alt="ProfilePic" className="w-full h-32 rounded-lg mt-2 object-cover" />
          <div className="flex justify-between items-center gap-2">
            <div>
              <p className="font-semibold text-lg ">{widget?.data?.title}</p>
              <p className="text-sm text-zinc-500 ">{widget?.data?.description}</p>
            </div>
            <div className="h-10 w-10 hover:bg-profolyoDark hover:cursor-pointer rounded-full flex justify-center items-center">
              <Link to={widget?.data?.link} target="_blank" rel="noopener noreferrer">
                <RiArrowRightUpLine className="h-6 w-6 text-zinc-500" />
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  const linksMedium = () => {
    return (
      <>
        <div>{!viewMode && showSizeToggle && selectedWidget?.i === widget.i && widgetSizeToggleToolbar(widget)}</div>
        <div onClick={() => handleClickToAdd(smLinks, mdLinks, mdLinks)} className={`rounded-lg flex flex-col justify-between h-full p-3 ${getCardElevation()} ${!viewMode ? 'cursor-pointer' : ''} ${getCardBackground()} ${!viewMode && showSizeToggle && selectedWidget?.i === widget.i ? 'border border-4 border-profolyoExtraDark' : ''}`}>
          <div className="flex gap-2">
            <div className="flex flex-col justify-between gap-2">
              <div>
                <p className="font-semibold text-lg ">{widget?.data?.title}</p>
                <p className="text-sm text-zinc-500 ">{widget?.data?.description}</p>
              </div>
              <div className="h-10 w-10 hover:bg-profolyoDark hover:cursor-pointer rounded-full flex justify-center items-center">
                <Link to={widget?.data?.link} target="_blank" rel="noopener noreferrer">
                  <RiArrowRightUpLine className="h-6 w-6 text-zinc-500" />
                </Link>
              </div>
            </div>
            <img src={widget?.data?.coverImage} referrerPolicy="no-referrer" alt="ProfilePic" className="w-full h-52 rounded-lg mt-2 object-cover" />
          </div>
        </div>
      </>
    );
  };

  const linksLarge = () => {
    return (
      <>
        <div>{!viewMode && showSizeToggle && selectedWidget?.i === widget.i && widgetSizeToggleToolbar(widget)}</div>
        <div onClick={() => handleClickToAdd(smLinks, lgLinks, lgLinks)} className={`rounded-lg flex flex-col justify-between h-full p-3 ${getCardElevation()} ${!viewMode ? 'cursor-pointer' : ''} ${getCardBackground()} ${!viewMode && showSizeToggle && selectedWidget?.i === widget.i ? 'border border-4 border-profolyoExtraDark' : ''}`}>
          <img src={widget?.data?.coverImage} referrerPolicy="no-referrer" alt="ProfilePic" className="w-full h-96 rounded-lg mt-2 object-cover" />
          <div className="flex justify-between items-center gap-2">
            <div>
              <p className="font-semibold text-lg ">{widget?.data?.title}</p>
              <p className="text-sm text-zinc-500 ">{widget?.data?.description}</p>
            </div>
            <div className="h-10 w-10 hover:bg-profolyoDark hover:cursor-pointer rounded-full flex justify-center items-center">
              <Link to={widget?.data?.link} target="_blank" rel="noopener noreferrer">
                <RiArrowRightUpLine className="h-6 w-6 text-zinc-500" />
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {widget.size === 'small' && linksSmall()}
      {widget.size === 'medium' && linksMedium()}
      {widget.size === 'large' && linksLarge()}
    </>
  );
};

export default Links;
