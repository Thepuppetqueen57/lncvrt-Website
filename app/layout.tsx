import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './styles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Lncvrt&apos;s Website</title>
          <link rel="icon" href="/favicon.ico" />
          <meta property="og:title" content="Lncvrt&apos;s Website" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="http://www.lncvrt.xyz/" />
          <meta property="og:image" content="http://www.lncvrt.xyz/favicon.png" />
          <meta property="og:description" content="This is Lncvrt&apos;s website with API, contacts, projects, and more!" />
          <meta name="theme-color" content="#861af0" />
          <meta name="twitter:card" content="summary_small_image" />
        </head>
        <body>
          <header className="top-bar">
            <div className="top-bar-content">
              <a draggable="false" href="/">
                <Image src="/favicon.png" alt="Icon" className="icon" width={40} height={40} />
              </a>
              <nav className="nav-links">
                <a draggable="false" href="/" className='underline-animation'>Home</a>
                <a draggable="false" href="/contacts" className='underline-animation'>Socials & Contacts</a>
                <Link draggable={false} href="/discord" className='underline-animation'>Discord</Link>
              </nav>
            </div>
          </header>
          <main className="main-content">
            {children}
          </main>
          <footer className="footer">
            <p>&copy; {currentYear} Lncvrt. All rights reserved.</p>
          </footer>
        </body>
      </html>
    </>
  );
};

export default Layout;