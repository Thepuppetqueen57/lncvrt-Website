import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faDiscord, faGithub, faReddit, faSpotify, faSteam, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  return (
    <div className="container">
      <section className="container-section">
        <h2>My Socials and Contacts</h2>
        <p>Feel free to reach out to me via the following methods:</p>
        <div className="contact-info">
          <p>
            <FontAwesomeIcon icon={faDiscord} className="inline mr-2" />
            Discord: <span className="underline-animation">@lncvrt</span>
          </p>
          <p>
            <FontAwesomeIcon icon={faDiscord} className="inline mr-2" />
            Discord Server: <Link prefetch={false} draggable={false} href="/discord" className="underline-animation" target="_blank">click here</Link>
          </p>
          <p>
            <FontAwesomeIcon icon={faEnvelope} className="inline mr-2" />
            Email: <Link draggable={false} href="mailto:lncvrtreal@gmail.com" className="underline-animation" target="_blank">lncvrtreal@gmail.com</Link>
          </p>
          <p>
            <FontAwesomeIcon icon={faTwitter} className="inline mr-2" />
            Twitter: <Link draggable={false} href="https://x.com/lncvrt" className="underline-animation" target="_blank">@lncvrt</Link>
          </p>
          <p>
            <FontAwesomeIcon icon={faReddit} className="inline mr-2" />
            Reddit: <Link draggable={false} href="https://www.reddit.com/user/XytrizaReal/" className="underline-animation" target="_blank">@XytrizaReal</Link>
          </p>
          <p>
            <FontAwesomeIcon icon={faGithub} className="inline mr-2" />
            GitHub: <Link draggable={false} href="https://github.com/Lncvrt" className="underline-animation" target="_blank">@lncvrt</Link>
          </p>
          <p>
            <FontAwesomeIcon icon={faYoutube} className="inline mr-2" />
            YouTube: <Link draggable={false} href="https://www.youtube.com/@Lncvrt" className="underline-animation" target="_blank">@Lncvrt</Link>
          </p>
          <p>
            <FontAwesomeIcon icon={faSteam} className="inline mr-2" />
            Steam: <Link draggable={false} href="https://steamcommunity.com/id/lncvrt/" className="underline-animation" target="_blank">lncvrt</Link>
          </p>
          <p>
            <FontAwesomeIcon icon={faSpotify} className="inline mr-2" />
            Spotify: <Link draggable={false} href="https://open.spotify.com/user/31uqd5hcdnaq2zlqrvy7sd4lb2iy" className="underline-animation" target="_blank">Lncvrt</Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
