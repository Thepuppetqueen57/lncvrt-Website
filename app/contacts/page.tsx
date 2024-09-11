"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Contact = () => {
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setIsShiftPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        setIsShiftPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="container">
      <section className="contact-section" id="contact">
        <h2>My Socials and Contacts</h2>
        <p>Feel free to reach out to me via the following methods:</p>
        <div className="contact-info">
          <p>
            <i className="fab fa-discord"></i>
            Discord: <span className="underline-animation">@lncvrt</span>&nbsp;(I will reply quickly)
          </p>
          <p>
            <i className="fab fa-discord"></i>
            Discord Server: <Link draggable={false} href="/discord" className="underline-animation">click here</Link>&nbsp;
          </p>
          <p>
            <i className="fas fa-envelope"></i>
            Email: <a draggable="false" href="mailto:lncvrtreal@gmail.com" className="underline-animation">lncvrtreal@gmail.com</a>&nbsp;(May take longer to reply)
          </p>
          <p>Below this is socials. I will likely not reply there.</p>
          <p>
            <i className={isShiftPressed ? "fab fa-twitter" : "fab fa-x-twitter"}></i>
            {isShiftPressed ? " Twitter: " : " X: "}
            <a draggable="false" href="https://x.com/lncvrt" className="underline-animation">@lncvrt</a>
          </p>
          <p>
            <i className="fab fa-reddit"></i>
            Reddit: <a draggable="false" href="https://www.reddit.com/user/Lncvrt/" className="underline-animation">@lncvrt</a>
          </p>
          <p>
            <i className="fab fa-github"></i>
            GitHub: <a draggable="false" href="https://github.com/Lncvrt" className="underline-animation">@lncvrt</a>
          </p>
          <p>
            <i className="fab fa-youtube"></i>
            YouTube: <a draggable="false" href="https://www.youtube.com/channel/UCmQw2yk1PRJfOmwA2YHFuZA" className="underline-animation">@Lncvrt</a>
          </p>
          <p>
            <i className="fab fa-steam"></i>
            Steam: <a draggable="false" href="https://steamcommunity.com/id/lncvrt/" className="underline-animation">lncvrt</a>
          </p>
          <p>
            <i className="fab fa-instagram"></i>
            Instagram: <a draggable="false" href="https://www.instagram.com/lncvrtreal/" className="underline-animation">lncvrtreal</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
