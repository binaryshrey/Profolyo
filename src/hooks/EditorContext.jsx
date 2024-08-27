/************************************************************ IMPORTS ************************************************************/

import { v4 as uuidv4 } from 'uuid';
import { useContext, createContext, useEffect, useState } from 'react';

/************************************************************ IMPORTS ************************************************************/

const EditorContext = createContext();

export const EditorContextProvider = ({ children }) => {
  // const [profolyoEditorLayout, setProfolyoEditorLayout] = useState({
  //   xs: [{ i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'small', type: 'add', component: 'AddWidget' }],
  //   sm: [{ i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'small', type: 'add', component: 'AddWidget' }],
  //   md: [{ i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'small', type: 'add', component: 'AddWidget' }],
  // });

  const [openWidgetContainer, setOpenWidgetContainer] = useState(false);
  const [profolyoEditorLayout, setProfolyoEditorLayout] = useState({
    xs: [{ i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'small', type: 'ProfileSmall', component: 'ProfileSmall' }],
    sm: [{ i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'small', type: 'ProfileSmall', component: 'ProfileSmall' }],
    md: [{ i: uuidv4(), x: 0, y: 0, w: 1, h: 2, size: 'small', type: 'ProfileSmall', component: 'ProfileSmall' }],
  });

  const updateProfolyoEditorLayout = (newItem) => {
    setProfolyoEditorLayout((prevLayout) => ({
      xs: [newItem, ...prevLayout.xs],
      sm: [newItem, ...prevLayout.sm],
      md: [newItem, ...prevLayout.md],
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

  return <EditorContext.Provider value={{ profolyoEditorLayout, updateProfolyoEditorLayout, updateLayoutAfterDrag, openWidgetContainer, setOpenWidgetContainer }}>{children}</EditorContext.Provider>;
};

export const EditorLayout = () => {
  return useContext(EditorContext);
};
