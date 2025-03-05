/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect, useRef } from "react";
import DiscordCard from "./discord";
import axios from "axios";

const Home = () => {
  const [isGitHubLinksToggled, setIsGitHubLinksToggled] = useState(false);
  const [shiftKeyPressedCount, setShiftKeyPressedCount] = useState(0);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const fetchGitHubProjects = async () => {
    try {
      const response = await axios.get("https://api.github.com/users/Lncvrt/repos", {
        params: {
          per_page: 2147483647
        }
      });
      const data = response.data;

      const filteredProjects = data.filter(
        (repo: any) => !repo.description?.startsWith("[H]")
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
      if (e.key === "Shift") {
        setShiftKeyPressedCount((prevCount) => prevCount + 1);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setShiftKeyPressedCount(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (shiftKeyPressedCount === 1) {
      setIsGitHubLinksToggled((prevToggled) => !prevToggled);
    }
  }, [shiftKeyPressedCount]);

  return (
    <div className="container">
      <DiscordCard />
      <section className="container-section" id="projects">
        <h2 style={{ marginBottom: "18px" }}>My Projects</h2>
        <div className="projects-container">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            projects.map((project) => (
              <div className="project-card" key={project.id}>
                <h3>
                  <a
                    draggable="false"
                    href={
                      project.name === 'Website' ? project.html_url : (isGitHubLinksToggled ? project.html_url || project.homepage : project.homepage || project.html_url)
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-animation"
                  >
                    <span style={{ color: project.name === "Website" ? "#22C5D2" : project.archived ? "#D29922" : "inherit" }}>{project.name}{project.name == "Website" ? <span>&nbsp;👑</span> : null}</span>
                  </a>
                  {project.language ? <span style={{ fontSize: 14 }}>&nbsp;({project.language})</span> : null}
                </h3>
                <div className="project-description">
                  <p>{project.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
        {isGitHubLinksToggled && (
          <p style={{ marginTop: "25px" }}>
            GitHub links for projects enabled.
          </p>
        )}
      </section>
    </div>
  );
};

export default Home;
