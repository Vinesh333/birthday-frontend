import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import './TinyClipsPage.css';

function TinyClipsPage() {
  const navigate = useNavigate();
  const [fullscreenVideo, setFullscreenVideo] = useState(null);

  const videoList = [
    "video1.mp4",
    "video2.mp4",
    "video3.mp4",
    "video4.mp4",
    "video5.mp4",
    "video6.mp4",
    "video7.mp4",
    "video8.mp4",
    
  ];

  const handleVideoClick = (video) => {
    setFullscreenVideo(video);
  };

  const closeFullscreen = () => {
    setFullscreenVideo(null);
  };

  const handleDownload = async (videoUrl) => {
    try {
      const response = await fetch(videoUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "video.mp4";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  return (
    <div className="tinyclips-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h2>🎥 Our Little Videos</h2>
      <div className="video-gallery">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={15}
          slidesPerView={2}
          centeredSlides={true}
          loop={true}
          loopAdditionalSlides={1} // Ensures smooth looping with few slides
          autoplay={{
            delay: 3000, // 3 seconds per slide
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={800}
          className="mySwiper"
          breakpoints={{
            480: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 2 },
            1280: { slidesPerView: 2 },
          }}
        >
          {videoList.map((vid, index) => (
            <SwiperSlide key={index}>
              <div className="video-container">
                <video
                  src={`/videos/${vid}`}
                  className="clickable-video"
                  onClick={() => handleVideoClick(`/videos/${vid}`)}
                  muted
                  loop
                  playsInline
                  style={{ borderRadius: "15px" }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {fullscreenVideo && (
        <div className="fullscreen-overlay" onClick={closeFullscreen}>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <video
              src={fullscreenVideo}
              className="fullscreen-video"
              controls
              autoPlay
              playsInline
            >
              Your browser does not support the video tag.
            </video>
            <button className="close-btn" onClick={closeFullscreen}>
              ✖
            </button>
            <button
              className="download-btn"
              onClick={() => handleDownload(fullscreenVideo)}
            >
              ⬇ Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TinyClipsPage;