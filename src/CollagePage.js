import React, { useState, useEffect } from 'react';
import './CollagePage.css';
import { useNavigate } from 'react-router-dom';

function CollagePage() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  const imageList = [
    "img0.jpg",
    "img1.jpg",
    "img2.jpg",
    "img3.jpg",
    "img4.jpg",
    "img5.jpg",
    "img6.jpg",
    "img7.jpg",
    "img8.jpg",
    "img9.jpg",
    "img10.jpg",
    "img11.jpg",
    "img12.jpg",
    "img13.jpg",
    "img14.jpg",
    
    "img16.jpg",
    "img17.jpg",
    "img18.jpg",
    "img19.jpg",
    "img20.jpg",
    "img21.jpg",
    "img22.jpg",
    "img23.jpg",
    "img24.jpg",
    "img25.jpg",
    "img26.jpg",
    "img27.jpg",
    "img28.jpg",
    "img29.jpg",
    "img30.jpg",
  ];

  useEffect(() => {
    document.body.style.overflow = selectedImage ? 'hidden' : 'hidden'; // Prevent scrolling entirely
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const closeBackdrop = () => {
    setSelectedImage(null);
  };

  return (
    <div className="collage-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h1>📸 Our Moments</h1>
      <div className="gallery-container">
        <div className="image-scroller">
          <div className="image-grid">
            {imageList.map((img, index) => (
              <div className="image-wrapper" key={index}>
                <img
                  src={`/images/${img}`}
                  alt={`Memory ${index + 1}`}
                  className="gallery-image"
                  onClick={() => handleImageClick(`/images/${img}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedImage && (
        <div className="full-image-backdrop" onClick={closeBackdrop}>
          <div className="backdrop-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Full view" className="full-image" />
            <button className="close-btn" onClick={closeBackdrop}>
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CollagePage;