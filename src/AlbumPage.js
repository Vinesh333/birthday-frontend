import React, { useEffect, useRef, useState } from 'react';
import BirthdayMusic from './BirthdayMusic'; // adjust path if needed
import './AlbumPage.css';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

function AlbumPage() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [activeStory, setActiveStory] = useState(null);
  const [displayedText, setDisplayedText] = useState('');
  const typingTimeoutRef = useRef(null);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [selectedStory, setSelectedStory] = useState(null);
  const [passwordAction, setPasswordAction] = useState(null);

  const passwords = {
    1: 'Aishu@19',
    2: 'Aishu@06',
    3: 'Aishu@002',
    4: 'Aishu@25',
    hugPage: 'Aishu@V'
  };

  const stories = [
    {
      id: 1,
      emoji: '🎁',
      title: 'A Promise of Forever 💖',
      text: "My dearest Aishu, I trust you more than you trust yourself, but sometimes misunderstandings happen and that’s very common in any friendship and fyi I’ll always support your dreams. I wait for you patiently, walking any distance to be by your side. I care for you like a child, ensuring you eat on time, especially during your craving days. My support for you is pure—like a best friend. I pray for your safety when I’m not around. Irritating you brings me joy, even if you scold me. Your angry face is my favorite. I’ll never stop being there for you, my sweet Phool."
    },
  {
  id: 2,
      emoji: '💝',
  title: 'Six Souls, One Bond, Infinite Memories 💫',
  text: `A year ago, six strangers met in the heart of Bangalore—each from a different state, but destiny had plans. That one hello turned into endless laughter, late-night calls, impromptu plans, and a bond that felt like home.

Vinesh, the silent jokes killer, always landing the most unexpected punchlines. Sneha, the heart of every conversation, making moments louder and lighter. Param, the certified fun machine—no gathering is dull when he’s around. Bhanu, the spark that adds fun wherever she goes. Sowmya, with her quick wit and contagious humor, always one step ahead in the comedy game.

And then there’s Aishu—the most loved of all. She talks to everyone, gets hit by everyone (playfully, of course!), and holds a piece of each of us. She's the glue of our gang, the heartbeat of our memories.

Together, we explored the city, celebrated every little joy, and stood by each other when it mattered most. In just one year, we became more than friends—we became a family.

Here’s to all the madness, memories, and love that only grows stronger. Happy Birthday, Aishu. You’re not just our favorite—you’re our forever. ❤️`
},

    {
      id: 3,
      emoji: '🎉',
      title: 'Our Tom and Jerry Days 😂',
      text: "Hey i.c.y, we’re like Tom and Jerry, and snekuu is always there to enjoy our fights every time. I like irritating you, even during your mood swings, just to see your adorable angry face. People think we’re mads, but bestest friends. I act childish only with you—holding your hands, messing with your hair, despite your protests. Those moments are my treasures. I get protective when others bother you, I’ll always guard you when I am around, Aishu, no matter what. Your happiness is my priority, today and always."
    },
    {
      id: 4,
      emoji: '🎀',
      title: 'A Wish for Your Future 💫',
      text: `Happy Birthday, Aishu!\nYour success made me the happiest — even brought tears I didn’t expect. You’re selfless, strong, and caring, just like your dad… and a bit like me.\n\nEven through your mood swings or distance, I’ll stay — always your silent cheerleader, right behind your mumma.\n\nNo matter where life takes you, I’ll be here… unless you tell me not to be.\n\nWishing you endless joy, peace, and everything your heart truly deserves.\n\n— V...`
    }
  ];

  useEffect(() => {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 }
    });
  }, []);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const typeText = (text, index = 0) => {
    if (index < text.length) {
      setDisplayedText(text.substring(0, index + 1));
      const delay = Math.random() * 30 + 20; // faster typing
      typingTimeoutRef.current = setTimeout(() => typeText(text, index + 1), delay);
    }
  };

  const handleGiftClick = (story) => {
    setSelectedStory(story);
    setPasswordAction('openGift');
    setShowPasswordPrompt(true);
  };

  const handleHugClick = () => {
    setPasswordAction('navigateToHugPage');
    setShowPasswordPrompt(true);
  };

  const handlePasswordSubmit = () => {
    let correctPassword;
    if (passwordAction === 'openGift') {
      correctPassword = passwords[selectedStory.id];
    } else if (passwordAction === 'navigateToHugPage') {
      correctPassword = passwords.hugPage;
    }

    if (passwordInput === correctPassword) {
      setShowPasswordPrompt(false);
      setPasswordInput('');
      setPasswordError('');
      if (passwordAction === 'openGift') {
        setActiveStory(selectedStory);
        setSelectedStory(null);
        setDisplayedText('');
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        setTimeout(() => typeText(selectedStory.text), 300); // small pause before typing
      } else if (passwordAction === 'navigateToHugPage') {
        navigate('/hug-page');
      }
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="album-page" onClick={startMusic}>
      <BirthdayMusic />
      <audio ref={audioRef} loop preload="auto">
        <source src="/audio/birthday-tune.mp3" type="audio/mpeg" />
        Your browser does not support the audio tag.
      </audio>

      <div className="title-section">
        <h1>🎉 Welcome to the Album 🎉</h1>
        <p>This section holds special moments and surprises!</p>
      </div>

      <div className="gift-section">
        {stories.map((story) => (
          <div key={story.id} className="gift-box-container">
            <div className="gift-box" onClick={() => handleGiftClick(story)}>
              {story.emoji}
            </div>
          </div>
        ))}
      </div>

      <div className="hug-section">
        <button className="hug-button" onClick={handleHugClick}>
          🫂
        </button>
      </div>

      {showPasswordPrompt && (
        <div className="pop-up-backdrop">
          <div className="password-prompt">
            <h2>Enter Password</h2>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter password"
              className="password-input"
            />
            {passwordError && <p className="password-error">{passwordError}</p>}
            <div className="password-buttons">
              <button className="password-submit" onClick={handlePasswordSubmit}>
                Submit
              </button>
              <button
                className="password-cancel"
                onClick={() => {
                  setShowPasswordPrompt(false);
                  setPasswordInput('');
                  setPasswordError('');
                  setSelectedStory(null);
                  setPasswordAction(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {activeStory && (
        <div className="pop-up-backdrop">
          <div className="pop-up-content">
            <h2>{activeStory.title}</h2>
            <div className="message-screen">
              <div className="typing-text">
                {displayedText === '' ? (
                  <div className="typing-loader">
                    Typing your message<span className="dots">...</span>
                  </div>
                ) : (
                  displayedText.split('\n\n').map((part, index) => (
                    <div key={index}>
                      {part.startsWith('![Our Memory]') ? (
                        <img
                          src={part.match(/\((.*?)\)/)[1]}
                          alt="Our Memory"
                          className="letter-image"
                        />
                      ) : (
                        part
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
            <button className="close-pop-up" onClick={() => setActiveStory(null)}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className="album-boxes">
        <div className="box" onClick={() => navigate('/memory-letter')}>💌 A Memory Letter</div>
        <div className="box" onClick={() => navigate('/collage')}>📸 Random Collage</div>
        <div className="box" onClick={() => navigate('/tiny-clips')}>🎥 Tiny Clips</div>
      </div>

      <button className="back-button" onClick={() => navigate('/')}>
        ⬅ Back to Home
      </button>
    </div>
  );
}

export default AlbumPage;
