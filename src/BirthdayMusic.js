// src/BirthdayMusic.js
import React, { useEffect, useRef } from 'react';

function BirthdayMusic() {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    const enablePlay = () => {
      audio.play().catch(() => {});
      document.removeEventListener('click', enablePlay);
    };

    document.addEventListener('click', enablePlay);

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <audio ref={audioRef} loop autoPlay preload="auto">
      <source src="/audio/birthday-tune.mp3" type="audio/mpeg" />
    </audio>
  );
}

export default BirthdayMusic;
