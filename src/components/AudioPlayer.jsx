import React, { useState, useEffect, useRef } from 'react';
import WavesurferPlayer from '@wavesurfer/react';
import { Button } from '../components/button';
import { RiPlayLargeFill, RiPauseLargeFill } from '@remixicon/react';

const AudioPlayer = ({ audio, smallSize }) => {
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
    <div className="flex items-center bg-white pr-2 rounded-full bg-profolyoAudio border border-profolyoDark">
      <Button className="rounded-full" variant="ghost" size="icon" onClick={onPlayPause}>
        {isPlaying ? <RiPauseLargeFill className={`${smallSize ? 'h-3 w-3' : 'h-4 w-4'}`} /> : <RiPlayLargeFill className={`${smallSize ? 'h-3 w-3' : 'h-4 w-4'}`} />}
      </Button>
      <div className="w-full">
        {smallSize && <WavesurferPlayer cursorWidth={0} barHeight={2} barWidth={2} height={40} waveColor="gray" url={audio} onReady={onReady} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />}
        {!smallSize && <WavesurferPlayer cursorWidth={0} barHeight={2} barWidth={2} height={50} waveColor="gray" url={audio} onReady={onReady} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />}
      </div>
    </div>
  );
};

export default AudioPlayer;
