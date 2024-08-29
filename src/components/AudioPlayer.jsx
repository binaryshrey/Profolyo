import React, { useState, useEffect, useRef } from 'react';
import WavesurferPlayer from '@wavesurfer/react';
import { Button } from '../components/button';
import { RiPlayLargeFill, RiPauseLargeFill } from '@remixicon/react';
import { EditorLayout } from '../hooks/EditorContext';

const AudioPlayer = ({ smallSize, audioIntro }) => {
  const { profileAudio, profileAudioVoice, profileAudioURL } = EditorLayout();

  const [wavesurfer, setWavesurfer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioURL, setAudioURL] = useState(audioIntro);

  const onReady = (ws) => {
    setWavesurfer(ws);
    setIsPlaying(false);
  };

  React.useEffect(() => {
    setAudioURL(profileAudioURL);
  }, [profileAudioURL, profileAudioVoice]);

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  return (
    <div className="flex items-center bg-white p-1 rounded-full bg-profolyoAudio border border-profolyoDark">
      <Button className="rounded-full" variant="ghost" size="icon" onClick={onPlayPause}>
        {isPlaying ? <RiPauseLargeFill className={`${smallSize ? 'h-3 w-3' : 'h-4 w-4'}`} /> : <RiPlayLargeFill className={`${smallSize ? 'h-3 w-3' : 'h-4 w-4'}`} />}
      </Button>
      <div className="w-full">
        {smallSize && <WavesurferPlayer cursorWidth={0} barHeight={1} barWidth={2} height={40} waveColor="gray" url={audioURL} onReady={onReady} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />}
        {!smallSize && <WavesurferPlayer cursorWidth={0} barHeight={1} barWidth={2} height={50} waveColor="gray" url={audioURL} onReady={onReady} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />}
      </div>
    </div>
  );
};

export default AudioPlayer;
