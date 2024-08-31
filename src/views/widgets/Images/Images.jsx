import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import { EditorLayout } from '../../../hooks/EditorContext';
import { imagesSM, imagesMD, imagesLG } from '../WidgetsDB';
import { RiUser4Line, RiArrowRightUpLine } from '@remixicon/react';
import { ToggleGroup, ToggleGroupItem } from '../../../components/toggle-group';

const Images = ({ clickToAdd, widget, mode, viewMode }) => {
  console.log('mode', mode);
  const id = uuidv4();
  const { setSelectedWidget, addProfolyoWidgetToEditor, setOpenWidgetContainer, updateLayoutAfterResize, selectedWidget } = EditorLayout();
  const smImages = imagesSM(id);
  const mdImages = imagesMD(id);
  const lgImages = imagesLG(id);

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
          <ToggleGroupItem value="small" size="xs" variant="outlineDark" className="w-8" onClick={() => updateLayout(1, 2, 'small', 'Images')}>
            <p className="text-sm">S</p>
          </ToggleGroupItem>
          <ToggleGroupItem value="medium" size="xs" variant="outlineDark" className="w-8" onClick={() => updateLayout(2, 2, 'medium', 'Images')}>
            <p className="text-sm">M</p>
          </ToggleGroupItem>
          <ToggleGroupItem value="large" size="xs" variant="outlineDark" className="w-8" onClick={() => updateLayout(2, 4, 'large', 'Images')}>
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

  const imagesSmall = () => {
    return (
      <>
        <div>{!viewMode && showSizeToggle && selectedWidget?.i === widget.i && widgetSizeToggleToolbar(widget)}</div>
        <div onClick={() => handleClickToAdd(smImages, smImages, smImages)} className={`rounded-lg flex flex-col justify-between h-full p-3 ${getCardElevation()} ${!viewMode ? 'cursor-pointer' : ''} ${getCardBackground()} ${!viewMode && showSizeToggle && selectedWidget?.i === widget.i ? 'border border-4 border-profolyoExtraDark' : ''}`}>
          <div className="relative">
            <img src={widget?.data?.coverImage} referrerPolicy="no-referrer" alt="ProfilePic" className={`w-full ${mode === 'md' ? 'h-56' : mode === 'sm' ? 'h-76' : 'h-76'} rounded-lg object-cover`} />
            <Link to={widget?.data?.coverImage} target="_blank" rel="noopener noreferrer">
              <div className="absolute bottom-3 left-3  h-8 bg-profolyo rounded-full  items-center flex ">
                <p className="text-black pr-4 pl-4">{widget?.data?.title}</p>
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  };

  const imagesMedium = () => {
    return (
      <>
        <div>{!viewMode && showSizeToggle && selectedWidget?.i === widget.i && widgetSizeToggleToolbar(widget)}</div>
        <div onClick={() => handleClickToAdd(smImages, mdImages, mdImages)} className={`rounded-lg flex flex-col justify-between p-3 ${getCardElevation()} ${!viewMode ? 'cursor-pointer' : ''} ${getCardBackground()} ${!viewMode && showSizeToggle && selectedWidget?.i === widget.i ? 'border border-4 border-profolyoExtraDark' : ''}`}>
          <div className="relative">
            <img src={widget?.data?.coverImage} referrerPolicy="no-referrer" alt="ProfilePic" className={`w-full ${mode === 'md' ? 'h-56' : mode === 'sm' ? 'h-76' : 'h-76'} rounded-lg object-cover`} />
            <Link to={widget?.data?.coverImage} target="_blank" rel="noopener noreferrer">
              <div className="absolute bottom-3 left-3 h-8 bg-profolyo rounded-full  items-center flex ">
                <p className="text-black pr-4 pl-4">{widget?.data?.title}</p>
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  };

  const imagesLarge = () => {
    return (
      <>
        <div>{!viewMode && showSizeToggle && selectedWidget?.i === widget.i && widgetSizeToggleToolbar(widget)}</div>
        <div onClick={() => handleClickToAdd(smImages, lgImages, lgImages)} className={`rounded-lg flex flex-col justify-between p-3 ${getCardElevation()} ${!viewMode ? 'cursor-pointer' : ''} ${getCardBackground()} ${!viewMode && showSizeToggle && selectedWidget?.i === widget.i ? 'border border-4 border-profolyoExtraDark' : ''}`}>
          <div className="relative">
            <img src={widget?.data?.coverImage} referrerPolicy="no-referrer" alt="ProfilePic" className={`w-full ${mode === 'md' ? 'h-128' : mode === 'sm' ? 'h-76' : 'h-76'} rounded-lg object-cover`} />
            <Link to={widget?.data?.coverImage} target="_blank" rel="noopener noreferrer">
              <div className="absolute bottom-3 left-3 h-8 bg-profolyo rounded-full  items-center flex ">
                <p className="text-black pr-4 pl-4">{widget?.data?.title}</p>
              </div>
            </Link>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {widget.size === 'small' && imagesSmall()}
      {widget.size === 'medium' && imagesMedium()}
      {widget.size === 'large' && imagesLarge()}
    </>
  );
};

export default Images;
