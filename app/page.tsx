import React from 'react';

const Home = () => {
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
              <a draggable="false" href="https://github.com/Lncvrt/AlwaysNightVision" target="_blank" rel="noopener noreferrer" className='underline-animation'>AlwaysNightVision</a>
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
              <p>A beta 1.7.3 bukkit plugin that adds some features to WorldGuard as seen in the modern versions.</p>
            </div>
          </div>
          <div className="project-card">
            <h3>
              <a draggable="false" href="https://github.com/Lncvrt/ColorPicker" target="_blank" rel="noopener noreferrer" className='underline-animation'>ColorPicker</a>
            </h3>
            <div className="project-description">
              <p>A windows app made to find colors on your screen with the exact hex/hsl/rgb/cmyk values that you want (Written in C#).</p>
            </div>
          </div>
          <div className="project-card">
            <h3>BetaKeepInventory</h3>
            <div className="project-description">
              <p>A beta 1.7.3 bukkit plugin that adds Keep Inventory to the game. (NOT AVAILABLE FOR DOWNLOAD)</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
