import React, { useState, useEffect } from 'react';
import './MemoryLetterPage.css';
import { useNavigate } from 'react-router-dom';

function MemoryLetterPage() {
  const [typedText, setTypedText] = useState('');
  const navigate = useNavigate();

  const fullText = `Frrom the very beginning, what we’ve shared has felt rare—something quietly beautiful.
Every memory with you feels like a page from a story I never want to stop reading.
Thank you for being that constant light in my life, for making everything better just by being part of it.
Here’s to all the moments we’ve had—and the many more we’ll create together. 💖

Being around you feels like home, no matter where we are.
Whether we’re laughing out loud or just sitting in silence, everything feels right with you.
You’ve touched my heart in ways I didn’t even know were possible.
You make even the most ordinary days feel unforgettable.
And I want to keep writing this story with you—moment by moment, smile by smile. 💫

What we’ve built doesn’t rely on big words or dramatic gestures—it’s in the small things.
The way silence feels comfortable with you.
The way you get me without me having to explain.
You’ve become a part of my rhythm—like a favorite song playing softly in the background.
Time might keep changing the world around us, but the ease of being with you? That stays.

I know the last couple of months weren’t easy—
and I wasn’t there the way I should have been.
But you… you handled it all.
You faced everything head-on, without flinching.
And not only did you make it through—you shined.
Watching you grow and succeed, even from a distance,
made me realize just how strong and incredible you truly are.
You carried it all with so much grace, and I couldn't be prouder of you.

To the girl who became her own strength—
Thank you for not giving up.
Thank you for letting me still be a part of your story.

I’m here now—showing up better, loving louder, and choosing you, every single day.

With all that I am,
And everything I’m becoming—
For you. 💫`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(prev => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="letter-page">
      <button className="back-button" onClick={() => navigate(-1)}>← Go Back</button>
      <div className="scroll-paper">
        <h2 className="letter-title">To Someone Special 💖</h2>
        <div className="letter-text">
          <p>{typedText}</p>
        </div>
      </div>
    </div>
  );
}

export default MemoryLetterPage;
