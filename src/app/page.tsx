import DiscordCard from "./discord";

type Project = {
  name: string;
  url: string;
  description: string;
};

const projects: Project[] = [
  {
    name: "Triangles",
    url: "https://triangles.lncvrt.xyz/",
    description: "A geometry dash fan game made in Unity, with accounts, online levels, editor and more!",
  },
  {
    name: "Geometry Rays",
    url: "https://georays.puppet57.xyz/",
    description: "Another geometry dash fan game made by Puppet (I'm not the creator, I contribute to it)",
  },
  {
    name: "XPS",
    url: "https://xps.lncvrt.xyz/",
    description: "The original Xytriza's GDPS server! It has been brought back for a while now and it supports Windows, MacOS, Android (+ custom geode launcher), and iOS",
  },
  {
    name: "Geometry Tools",
    url: "https://geometrytools.lncvrt.xyz/",
    description: "A website with tools & info about Geometry Dash",
  },
  {
    name: "Name a color",
    url: "https://nameacolor.lncvrt.xyz/",
    description: "A website where you can name any color",
  },
  {
    name: "Berry Dash",
    url: "https://berrydash.lncvrt.xyz/",
    description: "A simple game where you catch berries to gain score",
  },
];

const Home = () => {
  return (
    <div className="container">
      <DiscordCard />
      <section className="container-section" id="projects">
        <h2 style={{ marginBottom: "18px" }}>My Projects</h2>
        <div className="projects-container">
          {projects.map((project) => (
            <div className="project-card" key={project.name}>
              <h3>
                <a
                  draggable="false"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-animation"
                >
                  <span>{project.name}</span>
                </a>
              </h3>
              <div className="project-description">
                <p>{project.description}</p>
              </div>
            </div>
          ))}
          <p>I create a lot of projects and don&apos;t finish them, I will create more after I have released 1.0 of <a href="http://triangles.lncvrt.xyz/" className="underline-animation">Triangles</a>.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
