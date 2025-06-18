import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import confetti from 'canvas-confetti';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function HomePage() {
  const navigate = useNavigate();
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const introImages = [
    "/images/1.jpg",
    "/images/2.jpg",
    "/images/3.jpg"
  ];

  // 🎉 Trigger confetti on load
  useEffect(() => {
    axios.get('http://localhost:8080/api/wish')
      .then(res => console.log('Birthday wish:', res.data.message))
      .catch(console.error);

    // Trigger burst confetti
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 }
    });

    // Optional: Add repeating confetti
    const interval = setInterval(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: Math.random() * 0.6 }
      });
    }, 4000);

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <button className="next-btn">{">"}</button>,
    prevArrow: <button className="prev-btn">{"<"}</button>,
    customPaging: () => (
      <div className="w-4 h-4 bg-gray-300 rounded-full opacity-70 hover:opacity-100 transition-opacity"></div>
    )
  };

  const handleImageClick = (image) => {
    setFullscreenImage(image);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  return (
    <div className="gallery-upload-container">
      <h2>Happy Birthday, Aishu 🧚‍♀</h2>

      <div className="gallery-mini-title">
        <div className="title-underline"></div>
      </div>

      <div className="gallery-display">
        <Slider {...sliderSettings}>
          {introImages.map((image, index) => (
            <div className="image-container" key={index}>
              <img
                src={image}
                alt={`Memory ${index + 1}`}
                className="clickable-image"
                onClick={() => handleImageClick(image)}
                onError={() => console.error(`Failed to load image: ${image}`)}
              />
            </div>
          ))}
        </Slider>
      </div>

      <button className="album-button" onClick={() => navigate('/album')}>
        Dive into Our Memories 🎞️
      </button>

      {fullscreenImage && (
        <div className="fullscreen-overlay" onClick={closeFullscreen}>
          <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
            <img src={fullscreenImage} alt="Fullscreen" className="fullscreen-image" />
            <button className="close-btn" onClick={closeFullscreen}>
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
