/************************************************************ IMPORTS ************************************************************/

import { useContext, createContext, useEffect, useState } from 'react';

/************************************************************ IMPORTS ************************************************************/

const EditorContext = createContext();

export const EditorContextProvider = ({ children }) => {
  const [selectedWidget, setSelectedWidget] = useState();
  const [openWidgetContainer, setOpenWidgetContainer] = useState(false);
  const [profolyoEditorLayout, setProfolyoEditorLayout] = useState({ xs: [], sm: [], md: [] });

  //profile
  const [profileTitle, setProfileTitle] = useState('');
  const [profileDescription, setProfileDescription] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [profileImageSize, setProfileImageSize] = useState('');
  const [profileBadge, setProfileBadge] = useState('');
  const [profileAudio, setProfileAudio] = useState('');
  const [profileAudioURL, setProfileAudioURL] = useState('');
  const [profileAudioVoice, setProfileAudioVoice] = useState('male');

  const addProfolyoWidgetToEditor = (widgetXS, widgetSM, widgetMD) => {
    setProfolyoEditorLayout((prevLayout) => ({
      xs: [widgetXS, ...prevLayout.xs],
      sm: [widgetSM, ...prevLayout.sm],
      md: [widgetMD, ...prevLayout.md],
    }));
  };

  const updateItemPosition = (layoutState, mode, newItemData) => {
    const { i, x: newX, y: newY } = newItemData;
    const updateLayout = (layout) => layout.map((item) => (item.i === i ? { ...item, x: newX, y: newY } : item));
    return {
      ...layoutState,
      [mode]: updateLayout(layoutState[mode]),
    };
  };

  const updateLayoutAfterDrag = (mode, newItem) => {
    setProfolyoEditorLayout((prevState) => updateItemPosition(prevState, mode, newItem));
  };

  const updateWidgetSize = (layoutState, w, h, size, component, mode, id) => {
    const updateLayout = (layout) => layout.map((item) => (item.i === id ? { ...item, w: w, h: h, size: size, component: component } : item));
    return {
      ...layoutState,
      [mode]: updateLayout(layoutState[mode]),
    };
  };

  const updateLayoutAfterResize = (w, h, size, component, mode, id) => {
    console.log('updateLayoutAfterResize', w, h, size, component, mode, id);
    setProfolyoEditorLayout((prevState) => updateWidgetSize(prevState, w, h, size, component, mode, id));
  };

  return (
    <EditorContext.Provider
      value={{
        profileAudioVoice,
        setProfileAudioVoice,
        profileAudioURL,
        setProfileAudioURL,
        profileAudio,
        setProfileAudio,
        profileImageSize,
        setProfileImageSize,
        profileBadge,
        setProfileBadge,
        profileImage,
        setProfileImage,
        profileDescription,
        setProfileDescription,
        profileTitle,
        setProfileTitle,
        selectedWidget,
        setSelectedWidget,
        profolyoEditorLayout,
        addProfolyoWidgetToEditor,
        updateLayoutAfterDrag,
        openWidgetContainer,
        setOpenWidgetContainer,
        updateLayoutAfterResize,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const EditorLayout = () => {
  return useContext(EditorContext);
};
