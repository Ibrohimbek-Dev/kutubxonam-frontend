import React, { useRef } from "react";

const useAudioPlayer = () => {
  const pause = useRef(null);  

  const handlePause = () => {
    const audioPlayerRef = pause.current?.audio?.current;
    if (audioPlayerRef) {
      if (audioPlayerRef.paused) {
        audioPlayerRef.play();
      } else {
        audioPlayerRef.pause();
      }
    }
  };

  return { pause, handlePause };
};

export default useAudioPlayer;
