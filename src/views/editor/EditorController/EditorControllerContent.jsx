import React from 'react';
import { ScrollArea } from '../../../components/scroll-area';
import { Input } from '../../../components/input';
import { Label } from '../../../components/label';
import { Textarea } from '../../../components/textarea';
import { RiUser4Line } from '@remixicon/react';
import { EditorLayout } from '../../../hooks/EditorContext';

const EditorControllerContent = () => {
  const { profileAudio, setProfileAudio, profileImageSize, setProfileImageSize, profileBadge, setProfileBadge, profileImage, setProfileImage, profileDescription, setProfileDescription, profileTitle, setProfileTitle, selectedWidget } = EditorLayout();

  console.log('selectedWidget', selectedWidget);

  return (
    <div className="m-2">
      <ScrollArea className="overflow-hidden h-84vh">
        {selectedWidget?.type === 'Profile' && (
          <>
            <div className="w-full p-2 flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input type="text" id="title" placeholder="Luke" maxLength="20" value={profileTitle} onChange={() => setProfileTitle(event.target.value)} />

              <Label htmlFor="desc" className="mt-8">
                Description
              </Label>
              <Textarea type="text" id="desc" placeholder="Jedi Knight" maxLength="100" value={profileDescription} onChange={() => setProfileDescription(event.target.value)} />

              <Label htmlFor="badge" className="mt-8">
                Badge
              </Label>
              <div className="flex gap-2 items-center">
                <RiUser4Line className="h-6 w-6 text-zinc-500" />
                <Input type="text" id="title" placeholder="Profile" maxLength="20" value={profileBadge} onChange={() => setProfileBadge(event.target.value)} />
              </div>

              <Label htmlFor="image" className="mt-8">
                Cover Image
              </Label>
              <div className="bg-zinc-100 w-64 h-64 rounded-lg">
                <img src={profileImage} alt="cover" className="w-64 h-64 object-fit rounded-lg" />
              </div>

              <Label htmlFor="audioIntro" className="mt-8">
                Audio Intro
              </Label>
              <Textarea type="text" id="audioIntro" placeholder="Hello There!" maxLength="100" value={profileAudio} onChange={() => setProfileAudio(event.target.value)} />
            </div>
          </>
        )}
      </ScrollArea>
    </div>
  );
};

export default EditorControllerContent;
