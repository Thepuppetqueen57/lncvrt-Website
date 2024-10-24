import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="container">
      <section className="about-me-section" id="about">
        <h2>404</h2>
        <p>Sorry, the page you are looking for does not exist.</p>
        <p>Click <Link draggable={false} href="/" className="underline-animation">here</Link> to return to the main page</p>
      </section>
    </div>
  );
};

export default Home;
