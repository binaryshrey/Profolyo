import { v4 as uuidv4 } from 'uuid';
import 'react-resizable/css/styles.css';
import Profile from './Profile/Profile';
import 'react-grid-layout/css/styles.css';
import ProfileInfo from './Profile/ProfileInfo';
import React, { useRef, useEffect } from 'react';
import { EditorLayout } from '../../hooks/EditorContext';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { profileInfo, profileSM, profileMD, profileLG, profileXL, linksInfo, linksSM, linksMD, linksLG } from './WidgetsDB';
import LinksInfo from './Links/LinksInfo';
import Links from './Links/Links';

const ResponsiveGridLayout = WidthProvider(Responsive);

const WidgetContent = () => {
  const { profolyoEditorUserData } = EditorLayout();

  const cols = { xs: 1, sm: 4, md: 4 };
  const breakpoints = { xs: 480, sm: 500, md: 767 };
  const componentMap = { ProfileInfo, Profile, LinksInfo, Links };

  const smProfile = profileSM(profolyoEditorUserData, uuidv4());
  const mdProfile = profileMD(profolyoEditorUserData, uuidv4());
  const lgProfile = profileLG(profolyoEditorUserData, uuidv4());
  const xlProfile = profileXL(profolyoEditorUserData, uuidv4());
  const smLinks = linksSM(uuidv4());
  const mdLinks = linksMD(uuidv4());
  const lgLinks = linksLG(uuidv4());

  const layout = {
    xs: [profileInfo, smProfile, mdProfile, lgProfile, xlProfile, linksInfo, smLinks, mdLinks, lgLinks],
    sm: [profileInfo, smProfile, mdProfile, lgProfile, xlProfile, linksInfo, smLinks, mdLinks, lgLinks],
    md: [profileInfo, smProfile, mdProfile, lgProfile, xlProfile, linksInfo, smLinks, mdLinks, lgLinks],
  };

  return (
    <div className="mt-8 bg-profolyo">
      <ResponsiveGridLayout layouts={layout} breakpoints={breakpoints} cols={cols} rowHeight={120} width={120} isResizable={false} isDraggable={false}>
        {layout?.md.map((item) => {
          const Component = componentMap[item.component];
          return (
            <div key={item.i}>
              <Component clickToAdd={true} widget={item} mode="md" viewMode={true} />
            </div>
          );
        })}
      </ResponsiveGridLayout>
    </div>
  );
};

export default WidgetContent;
