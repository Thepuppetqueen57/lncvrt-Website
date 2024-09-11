"use client";

import React, { useState, useEffect } from 'react';

const Home = () => {
  const [isGitHubLinksToggled, setIsGitHubLinksToggled] = useState(false);
  const [shiftKeyPressedCount, setShiftKeyPressedCount] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setShiftKeyPressedCount(prevCount => prevCount + 1);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setShiftKeyPressedCount(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (shiftKeyPressedCount === 1) {
      setIsGitHubLinksToggled(prevToggled => !prevToggled);
    }
  }, [shiftKeyPressedCount]);

  return (
    <div className="container">
      <section className="about-me-section" id="about">
        <h2>Hey, I&apos;m Lncvrt!</h2>
        <p>I&apos;m a Java developer who makes Minecraft plugins and mods. I&apos;m busy right now, so I might not get back to you right away if you reach out.</p>  
      </section>
      <section className="projects-section" id="projects">
        <h2 style={{ marginBottom: '18px' }}>My Projects</h2>
        <div className="projects-container">
          <div className="project-card">
            <h3>
              <a draggable="false" href={isGitHubLinksToggled ? "https://github.com/Lncvrt/AlwaysNightVision" : "https://modrinth.com/plugin/anv"} target="_blank" rel="noopener noreferrer" className='underline-animation'>AlwaysNightVision</a>
            </h3>
            <div className="project-description">
              <p>A simple Minecraft Plugin for Spigot that gives you the night vision effect automatically when joining.</p>
            </div>
          </div>
          <div className="project-card">
            <h3>
              <a draggable="false" href="https://github.com/Lncvrt/WorldGuardBetaUtils" target="_blank" rel="noopener noreferrer" className='underline-animation'>WorldGuardBetaUtils</a>
            </h3>
            <div className="project-description">
              <p>A Beta 1.7.3 plugin that adds some features to WorldGuard as seen in the modern versions.</p>
            </div>
          </div>
          <div className="project-card">
            <h3>
              <a draggable="false" href="https://github.com/Lncvrt/ColorPicker" target="_blank" rel="noopener noreferrer" className='underline-animation'>ColorPicker</a>
            </h3>
            <div className="project-description">
              <p>A Windows App made to find colors on your screen with the exact hex/hsl/rgb/cmyk values that you want.</p>
            </div>
          </div>
          <div className="project-card">
            <h3>BetaKeepInventory</h3>
            <div className="project-description">
              <p>A Beta 1.7.3 plugin that adds Keep Inventory to the game. (NOT AVAILABLE FOR DOWNLOAD)</p>
            </div>
          </div>
          <div className="project-card">
            <h3>
              <a draggable="false" href={isGitHubLinksToggled ? "https://github.com/Lncvrt/chat-clear-plus" : "https://modrinth.com/plugin/ccp"} target="_blank" rel="noopener noreferrer" className='underline-animation'>ChatClear+</a>
            </h3>
            <div className="project-description">
              <p>A simple Fabric mod designed to enhance the way servers clear chat messages, improving the normal method of flooding the chat with empty newlines.</p>
            </div>
          </div>
        </div>
        {isGitHubLinksToggled && <p style={{ marginTop: "25px" }}>GitHub links for projects enabled.</p>}
      </section>
    </div>
  );
};

export default Home;
