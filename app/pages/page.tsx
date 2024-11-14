"use client";

import React from "react";
import Link from "next/link";

const Pages = () => {
  return (
    <div className="container">
      <section className="container-section" id="contact">
        <h2>Pages & Utilities</h2>
        <p>Here&apos;s some endpoints accross this website:</p>
        <div className="contact-info">
          <p>
            <Link draggable={false} href="/2b2t" className="underline-animation" style={{ display: 'block' }}>
              2b2t stats, info and more
            </Link>
          </p>
        </div>
        <p style={{ fontStyle: "italic", marginTop: 20 }}>underline is broken but I can&apos;t be bothered to fix it. api docs coming soon!</p>
      </section>
    </div>
  );
};

export default Pages;
