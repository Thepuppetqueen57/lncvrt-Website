"use client";

import React, { useState, useEffect, useRef } from 'react';

const Home = () => {
  const [isGitHubLinksToggled, setIsGitHubLinksToggled] = useState(false);
  const [shiftKeyPressedCount, setShiftKeyPressedCount] = useState(0);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const fetchGitHubProjects = async () => {
    try {
      const response = await fetch('https://api.github.com/users/Lncvrt/repos');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "No error was provided");
      }

      const filteredProjects = data.filter(
        (repo: any) => !repo.description?.startsWith('[H]')
      );

      setProjects(filteredProjects);
    } catch (error: any) {
      setError(`Failed to get projects: ${error.message || "No error was provided"}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchGitHubProjects();
      hasFetched.current = true;
    }
  }, []);

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
          {isLoading ? <p>Loading...</p> : error ? <p>{error}</p> : (
            projects.map((project) => (
              <div className="project-card" key={project.id}>
                <h3>
                  <a draggable="false" href={isGitHubLinksToggled && project.homepage ? project.html_url : project.homepage} target="_blank" rel="noopener noreferrer" className='underline-animation'>{project.name}</a>
                </h3>
                <div className="project-description">
                  <p>{project.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
        {isGitHubLinksToggled && <p style={{ marginTop: "25px" }}>GitHub links for projects enabled.</p>}
      </section>
    </div>
  );
};

export default Home;
