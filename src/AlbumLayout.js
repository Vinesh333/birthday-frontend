import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';

function AlbumLayout() {
  const audioRef = useRef(null);

  useEffect(() => {
    // Attempt to autoplay when user interacts (required by browsers)
    const enablePlay = () => {
      audioRef.current?.play().catch(() => {});
      document.removeEventListener('click', enablePlay);
    };

    document.addEventListener('click', enablePlay);

    return () => {
      document.removeEventListener('click', enablePlay);
    };
  }, []);

  return (
    <>
      {/* ✅ Fixed path: 'audio' folder inside 'public' */}
      <audio ref={audioRef} autoPlay loop>
        <source src="/audio/birthday-tune.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Render routed page inside layout */}
      <Outlet />
    </>
  );
}

export default AlbumLayout;
