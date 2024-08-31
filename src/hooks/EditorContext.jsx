/************************************************************ IMPORTS ************************************************************/

import React, { useContext, createContext, useEffect, useState } from 'react';

/************************************************************ IMPORTS ************************************************************/

const EditorContext = createContext();

export const EditorContextProvider = ({ children }) => {
  const [selectedWidget, setSelectedWidget] = useState();
  const [openWidgetContainer, setOpenWidgetContainer] = useState(false);
  const [profolyoEditorUserData, setProfolyoEditorUserData] = React.useState([]);
  const [profolyoEditorLayout, setProfolyoEditorLayout] = useState({ xs: [], sm: [], md: [] });

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
    setProfolyoEditorLayout((prevState) => updateWidgetSize(prevState, w, h, size, component, mode, id));
  };

  const updateCardTitle = (id, newTitle) => {
    setProfolyoEditorLayout((prevState) => ({
      xs: prevState.xs.map((item) => (item.i === id ? { ...item, data: { ...item.data, title: newTitle } } : item)),
      sm: prevState.sm.map((item) => (item.i === id ? { ...item, data: { ...item.data, title: newTitle } } : item)),
      md: prevState.md.map((item) => (item.i === id ? { ...item, data: { ...item.data, title: newTitle } } : item)),
    }));
  };
  const updateCardDescription = (id, desc) => {
    setProfolyoEditorLayout((prevState) => ({
      xs: prevState.xs.map((item) => (item.i === id ? { ...item, data: { ...item.data, description: desc } } : item)),
      sm: prevState.sm.map((item) => (item.i === id ? { ...item, data: { ...item.data, description: desc } } : item)),
      md: prevState.md.map((item) => (item.i === id ? { ...item, data: { ...item.data, description: desc } } : item)),
    }));
  };
  const updateProfileBadge = (id, badge) => {
    setProfolyoEditorLayout((prevState) => ({
      xs: prevState.xs.map((item) => (item.i === id ? { ...item, data: { ...item.data, badge: badge } } : item)),
      sm: prevState.sm.map((item) => (item.i === id ? { ...item, data: { ...item.data, badge: badge } } : item)),
      md: prevState.md.map((item) => (item.i === id ? { ...item, data: { ...item.data, badge: badge } } : item)),
    }));
  };
  const updateCardCoverImage = (id, image) => {
    setProfolyoEditorLayout((prevState) => ({
      xs: prevState.xs.map((item) => (item.i === id ? { ...item, data: { ...item.data, coverImage: image } } : item)),
      sm: prevState.sm.map((item) => (item.i === id ? { ...item, data: { ...item.data, coverImage: image } } : item)),
      md: prevState.md.map((item) => (item.i === id ? { ...item, data: { ...item.data, coverImage: image } } : item)),
    }));
  };

  const updateProfileAudioIntro = (id, audio) => {
    setProfolyoEditorLayout((prevState) => ({
      xs: prevState.xs.map((item) => (item.i === id ? { ...item, data: { ...item.data, audioIntro: audio } } : item)),
      sm: prevState.sm.map((item) => (item.i === id ? { ...item, data: { ...item.data, audioIntro: audio } } : item)),
      md: prevState.md.map((item) => (item.i === id ? { ...item, data: { ...item.data, audioIntro: audio } } : item)),
    }));
  };

  const updateProfileAudioVoice = (id, voice) => {
    setProfolyoEditorLayout((prevState) => ({
      xs: prevState.xs.map((item) => (item.i === id ? { ...item, data: { ...item.data, audioVoice: voice } } : item)),
      sm: prevState.sm.map((item) => (item.i === id ? { ...item, data: { ...item.data, audioVoice: voice } } : item)),
      md: prevState.md.map((item) => (item.i === id ? { ...item, data: { ...item.data, audioVoice: voice } } : item)),
    }));
  };

  const updateCardElevation = (id, elevation) => {
    setProfolyoEditorLayout((prevState) => ({
      xs: prevState.xs.map((item) => (item.i === id ? { ...item, data: { ...item.data, elevation: elevation } } : item)),
      sm: prevState.sm.map((item) => (item.i === id ? { ...item, data: { ...item.data, elevation: elevation } } : item)),
      md: prevState.md.map((item) => (item.i === id ? { ...item, data: { ...item.data, elevation: elevation } } : item)),
    }));
  };

  const updateCardBackground = (id, bg) => {
    setProfolyoEditorLayout((prevState) => ({
      xs: prevState.xs.map((item) => (item.i === id ? { ...item, data: { ...item.data, background: bg } } : item)),
      sm: prevState.sm.map((item) => (item.i === id ? { ...item, data: { ...item.data, background: bg } } : item)),
      md: prevState.md.map((item) => (item.i === id ? { ...item, data: { ...item.data, background: bg } } : item)),
    }));
  };

  const updateCardLinkURL = (id, link) => {
    setProfolyoEditorLayout((prevState) => ({
      xs: prevState.xs.map((item) => (item.i === id ? { ...item, data: { ...item.data, link: link } } : item)),
      sm: prevState.sm.map((item) => (item.i === id ? { ...item, data: { ...item.data, link: link } } : item)),
      md: prevState.md.map((item) => (item.i === id ? { ...item, data: { ...item.data, link: link } } : item)),
    }));
  };

  return (
    <EditorContext.Provider
      value={{
        profolyoEditorUserData,
        setProfolyoEditorUserData,
        updateCardTitle,
        updateCardDescription,
        updateProfileBadge,
        updateCardCoverImage,
        updateCardLinkURL,
        updateProfileAudioIntro,
        updateProfileAudioVoice,
        updateCardElevation,
        updateCardBackground,
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
