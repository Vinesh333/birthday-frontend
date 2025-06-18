import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HugPage.css'; // Use the updated CSS file
import FavoriteMemory from './assets/images/favorite-memory.jpg'; // Your image

function HugPage() {
  const navigate = useNavigate();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsImageModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsImageModalOpen(false);
  };

  return (
    <div className="hug-page">
      {/* Floating Friendship Emojis Decoration */}
      <div className="floating-friends">
        <div className="friend-emoji">🤝</div>
        <div className="friend-emoji">👫</div>
        <div className="friend-emoji">🤗</div>
        <div className="friend-emoji">🤝</div>
        <div className="friend-emoji">👫</div>
      </div>

      <div className="hug-content">
        {/* Sparkles Decoration */}
        <div className="sparkles">
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
        </div>

        <img
          src={FavoriteMemory}
          alt="Our Favorite Memory"
          className="hug-image heartbeat-on-load"
          onClick={handleImageClick}
          style={{ cursor: 'pointer' }}
        />
        <div className="hug-emoji">🫂</div>
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="image-modal-backdrop">
          <div className="image-modal-content">
            <img
              src={FavoriteMemory}
              alt="Our Favorite Memory Enlarged"
              className="modal-image"
            />
            <button className="close-modal-button" onClick={handleCloseModal}>
              ✕
            </button>
          </div>
        </div>
      )}

      <button className="back-button" onClick={() => navigate('/album')}>
        ⬅ Back to Album
      </button>
    </div>
  );
}

export default HugPage;