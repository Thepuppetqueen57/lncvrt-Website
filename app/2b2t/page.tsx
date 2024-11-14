"use client";

import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import { copyToClipboard } from '../../lib/clipboard';
import Link from "next/link";

interface DNSRecord {
  name: string;
  type: string;
  class: string;
  ttl: number;
  rdlength: number;
  rdata: string;
  priority?: number;
  weight?: number;
  port?: number;
  target?: string;
  cname?: string;
  address?: string;
}

interface Status {
  ip: string;
  port: number;
  debug: {
    ping: boolean;
    query: boolean;
    srv: boolean;
    querymismatch: boolean;
    ipinsrv: boolean;
    cnameinsrv: boolean;
    animatedmotd: boolean;
    cachehit: boolean;
    cachetime: number;
    cacheexpire: number;
    apiversion: number;
    dns: {
      srv: DNSRecord[];
      srv_a: DNSRecord[];
    };
    error: {
      query: string;
    };
  };
  motd: {
    raw: string[];
    clean: string[];
    html: string[];
  };
  players: {
    online: number;
    max: number;
  };
  version: string;
  online: boolean;
  protocol: {
    version: number;
    name: string;
  };
  hostname: string;
  icon: string;
  software: string;
  info: {
    raw: string[];
    clean: string[];
    html: string[];
  };
  eula_blocked: boolean;
}

const Contact = () => {
  const [status, setStatus] = useState<Status | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const fetchGitHubProjects = async () => {
      try {
          const response = await axios.get("https://api.mcsrvstat.us/3/2b2t.org");
          const data = response.data;

          setStatus(data);
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

  const styleNumbers = (text: string) => {
    return text.replace(/\d+/g, (match) => `<span style="color: rgb(255, 170, 0);">${match}</span>`);
  };

  const getNumbers = (text: string) => {
    const match = text.match(/\d+/);
    return match ? match[0] : null;
  };

  return (
    <div className="container">
      <section className="contact-section" id="contact">
        <h2>2b2t Stats & Info</h2>
        <p>Online count, MOTD, and other info about 2b2t, in your browser.</p>
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div style={{ alignItems: "center" }}>
              <h3>MOTD:</h3>
              <p dangerouslySetInnerHTML={{ __html: status?.motd?.html?.[0] || "<p>N/A</p>" }} />
              <p dangerouslySetInnerHTML={{ __html: status?.motd?.html?.[1] || "<p>N/A</p>" }} />
              <h3>Players:</h3>
              <p>Total Online: <span style={{ color: "#FFAA00" }}>{status?.players?.online || 0}</span></p>
              <p dangerouslySetInnerHTML={{ __html: styleNumbers(status?.info?.clean?.[0] || "In-game: N/A").replace("In-game", "In game") }} />
              <p dangerouslySetInnerHTML={{ __html: styleNumbers(status?.info?.clean?.[1] || "Queue: N/A") }} />
              <p dangerouslySetInnerHTML={{ __html: styleNumbers(status?.info?.clean?.[2] || "Priority queue: N/A") }} />
              <p>Peasant Queue: <span style={{ color: "#FFAA00" }}>{status?.info?.clean ? (getNumbers(status?.info.clean[1] || "0") && getNumbers(status?.info.clean[2] || "0") ? (parseInt(getNumbers(status?.info.clean[1] || "0")!, 10) - parseInt(getNumbers(status?.info.clean[2] || "0")!, 10)) : 0) : 0}
              </span></p>
              <h3>Other Info</h3>
              <p>Icon:</p>
              <img src={status?.icon} style={{ display: "block", margin: "0 auto" }} />
              <p>EULA Blocked: {JSON.stringify(status?.eula_blocked)}</p>
              <p>Hostname: <span className="underline-animation" onClick={() => copyToClipboard(status?.hostname)}>{status?.hostname}</span></p>
              <p>Real IP: <span className="underline-animation" onClick={() => copyToClipboard(`${status?.ip}:${status?.port}`)}>{`${status?.ip}:${status?.port}`}</span></p>
            </div>
          )}
        </div>
        <p style={{ marginTop: "20px" }}>Automatic refreshes soon, credits to <Link draggable={false} className="underline-animation" href="https://mcsrvstat.us/server/2b2t.org">mcsrvstat.us</Link> for info fetching in the browser!</p>
      </section>
    </div>
  );
};

export default Contact;
