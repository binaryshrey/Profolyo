import React, { useState, useEffect, useRef } from 'react';
import WavesurferPlayer from '@wavesurfer/react';
import { Button } from '../components/button';
import { RiPlayLargeFill, RiPauseLargeFill } from '@remixicon/react';

const AudioPlayer = ({ audio }) => {
  const [wavesurfer, setWavesurfer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onReady = (ws) => {
    setWavesurfer(ws);
    setIsPlaying(false);
  };

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  return (
    <div className="flex items-center bg-white p-1 mt-2 rounded-full bg-profolyoAudio border border-profolyoDark">
      <Button className="rounded-full" variant="ghost" size="icon" onClick={onPlayPause}>
        {isPlaying ? <RiPauseLargeFill className="h-4 w-4" /> : <RiPlayLargeFill className="h-4 w-4" />}
      </Button>
      <div className="w-full">
        <WavesurferPlayer cursorWidth={0} barHeight={3} barWidth={2} height={50} waveColor="gray" url={audio} onReady={onReady} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
      </div>
    </div>
  );
};

export default AudioPlayer;
