import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import "./discord.css";
import { useLanyard } from "react-use-lanyard";
import Link from "next/link";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faHeadphones } from "@fortawesome/free-solid-svg-icons";

const DiscordCard: React.FC = () => {
  const [timers, setTimers] = useState<{ [key: string]: number }>({});
  const { loading, status } = useLanyard({
    userId: "1245396407607889954",
    socket: true,
  });
  const [bio, setBio] = useState<string>("Loading...");
  const hasFetched = useRef(false);

  const customStatus = status?.activities?.find(activity => activity.id === "custom");

  const fetchGitHubProjects = async () => {
    try {
      const response = await axios.get(
        "https://api.github.com/users/Lncvrt"
      );
      const data = response.data.bio;

      setBio(data);
    } catch {
      setBio("N/A")
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchGitHubProjects();
      hasFetched.current = true;
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (status?.activities) {
        setTimers((prevTimers) => {
          const newTimers = { ...prevTimers };

          status.activities.forEach((activity) => {
            if (activity.timestamps?.start) {
              const startTime = activity.timestamps.start;
              const elapsed = Math.floor((Date.now() - startTime) / 1000);
              newTimers[activity.id] = elapsed;
            }
          });

          return newTimers;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  const renderActivityType = (type: number) => {
    switch (type) {
      case 0:
        return "Playing";
      case 1:
        return "Streaming";
      case 2:
        return "Listening";
      case 3:
        return "Watching";
      default:
        return;
    }
  };

  const formatElapsedTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (days > 0) {
      return `${days}:${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(
        secs
      ).padStart(2, "0")}`;
    }
    return `${minutes > 0 ? minutes : 0}:${String(secs).padStart(2, "0")}`;
  };

  const capitalizeFirst = (str: string | undefined) => {
    if (typeof str !== "string" || str.length === 0) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const isEmoji = (input: string) => {
    const emojiRegex = /\p{Emoji}/u;
    return emojiRegex.test(input);
  }

  const renderActivities = () => {
    if (
      !status?.activities ||
      status.activities.length === 0 ||
      (status.activities.length === 1 &&
        ["spotify:1", "custom"].includes(status.activities[0].id)) ||
      (status.activities.length === 2 &&
        ["spotify:1", "custom"].includes(status.activities[0].id) &&
        ["spotify:1", "custom"].includes(status.activities[1].id))
    ) {
      return null;
    }

    return (
      <div className="activty-card">
        <div className="activty-title">Current Activities</div>
        <div className="mt-[-8px]">
          {status.activities
            .filter((activity) => activity.id !== "spotify:1")
            .map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="flex items-center gap-4">
                  <Image
                    src={activity.assets?.large_image ? `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png?size=128` : "https://lanyard-profile-readme.vercel.app/assets/unknown.png"}
                    alt="Large Activity Image"
                    width={100}
                    height={100}
                    quality={100}
                    className="activity-icon"
                    draggable={false}
                    style={{ filter: activity.assets?.large_image ? "none" : "invert(1)" }}
                    unoptimized={true}
                  />
                  {activity.assets?.small_image && (
                    <Image
                      src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.small_image}.png?size=48`}
                      alt="Small Activity Image"
                      width={48}
                      height={48}
                      quality={100}
                      className="small-activity-image"
                      draggable={false}
                      unoptimized={true}
                    />
                  )}
                  <div className="activity-details">
                    <p className="activity-name">
                      {renderActivityType(activity.type)} {activity.name}
                    </p>
                    {activity.details && <p>{activity.details}</p>}
                    {activity.state && <p>{activity.state}</p>}
                    {activity.timestamps?.start && (
                      <p className="activity-time">
                        <FontAwesomeIcon icon={faGamepad} className="mr-1" />
                        {formatElapsedTime(timers[activity.id] || 0)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };

  const renderSpotifyActivity = () => {
    if (status?.listening_to_spotify && status.spotify) {
      const startTime = status.spotify.timestamps?.start;
      const endTime = status.spotify.timestamps?.end;

      const formattedStartTime = startTime ? formatElapsedTime(Math.floor((Date.now() - startTime) / 1000)) : "N/A";

      const formattedEndTime = endTime ? formatElapsedTime(Math.floor((endTime - startTime) / 1000)) : "N/A";

      return (
        <div className="activty-card">
          <div className="activty-title">Listening to Spotify</div>
          <div className="flex items-center gap-4">
            <Image
              src={`${status.spotify.album_art_url}?size=128`}
              alt="Album Art"
              width={100}
              height={100}
              quality={100}
              className="activity-icon"
              draggable={false}
              unoptimized={true}
            />
            <div className="activity-details">
              <p className="activity-name">
                <Link draggable={false} className="underline-animation" href={`https://open.spotify.com/search/${encodeURIComponent(status.spotify.song)}/tracks`} target="_blank">
                  {status.spotify.song}
                </Link></p>
              <p>
                <Link draggable={false} className="underline-animation" style={{ fontWeight: "normal" }} href={`https://open.spotify.com/search/${encodeURIComponent(status.spotify.artist)}/artists`} target="_blank">
                  <span className="text-white">by</span> {status.spotify.artist}
                </Link>
              </p>
              <p>
                <Link draggable={false} className="underline-animation" style={{ fontWeight: "normal" }} href={`https://open.spotify.com/search/${encodeURIComponent(status.spotify.album)}/albums`} target="_blank">
                  <span className="text-white">on</span> {status.spotify.album}
                </Link>
              </p>
              <p className="activity-time">
                <FontAwesomeIcon icon={faHeadphones} className="mr-1" />
                {`${formattedStartTime} - ${formattedEndTime}`}
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="container-section" id="discord-card" style={{ marginBottom: "24px" }}>
      <div className="card-content">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="icon-and-name">
              <div className="relative">
                <Image
                  src={`https://cdn.discordapp.com/avatars/${status?.discord_user.id}/${status?.discord_user.avatar}.png?size=128`}
                  alt="Icon"
                  className="rounded-[50%] mr-3"
                  width={90}
                  height={90}
                  draggable={false}
                  unoptimized={true}
                />
                <i className={`status-card ${status?.discord_status}`}></i>
              </div>
              <div className="user-info">
                <p className="discord-name">
                  {status?.discord_user.global_name}&nbsp;
                  <span className="text-gray-300 font-extralight">
                    (@{status?.discord_user.username})
                  </span>
                </p>
                <div className="discord-info">
                  {customStatus != null ? (
                    <div>
                      <span>Status: {customStatus.emoji?.name != null && isEmoji(customStatus.emoji?.name) ? <span>{customStatus.emoji?.name}&nbsp;</span> : null}{capitalizeFirst(customStatus.state)}</span>
                      <br />
                    </div>
                  ) : null}
                  {bio != null ? <span>About Me: {capitalizeFirst(bio)}</span> : null}
                </div>
              </div>
            </div>

            {renderSpotifyActivity()}
            {renderActivities()}
          </>
        )}
      </div>
    </section>
  );
};

export default DiscordCard;
