import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import './discord.css'
import { useLanyard } from 'react-use-lanyard'

const DiscordCard: React.FC = () => {
  const [timers, setTimers] = useState<{ [key: string]: number }>({})

  const { loading, status } = useLanyard({
    userId: '1245396407607889954',
    socket: true
  })

  useEffect(() => {
    const interval = setInterval(() => {
      if (status?.activities) {
        setTimers(prevTimers => {
          const newTimers = { ...prevTimers }

          status?.activities.forEach(activity => {
            if (activity.timestamps?.start) {
              const startTime = activity.timestamps.start
              const elapsed = Math.floor((Date.now() - startTime) / 1000)
              newTimers[activity.id] = elapsed
            }
          })

          return newTimers
        })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [status])

  const renderActivityType = (type: number) => {
    switch (type) {
      case 0:
        return 'Playing'
      case 1:
        return 'Streaming'
      case 2:
        return 'Listening'
      case 3:
        return 'Watching'
      default:
        return
    }
  }

  const formatElapsedTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (days > 0) {
      return `${days}:${hours}:${String(minutes).padStart(2, '0')}:${String(
        secs
      ).padStart(2, '0')}`
    } else {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(
        secs
      ).padStart(2, '0')}`
    }
  }

  const capitalizeFirst = (str: string | undefined) => {
    if (typeof str !== 'string' || str.length === 0) return ''
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const renderActivities = () => {
    if (
      !status?.activities ||
      status.activities.length === 0 ||
      (status.activities.length === 1 &&
        status.activities[0].id === 'spotify:1')
    ) {
      return null
    }

    return (
      <div className='activty-card'>
        <div className='activty-title'>Current Activities</div>
        <div className='activty-info mt-[-8px]'>
          {status?.activities
            .filter(activity => activity.id !== 'spotify:1')
            .map(activity => (
              <div key={activity.id} className='activity-item'>
                <div className='activity-icons'>
                  {activity.assets?.large_image && (
                    <Image
                      src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png?size=128`}
                      alt='Large Activity Image'
                      width={128}
                      height={128}
                      quality={100}
                      className='large-activity-image'
                    />
                  )}
                  {activity.assets?.small_image && (
                    <Image
                      src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.small_image}.png?size=48`}
                      alt='Small Activity Image'
                      width={48}
                      height={48}
                      quality={100}
                      className='small-activity-image'
                    />
                  )}
                  <div className='activity-info'>
                    <p className='activity-name'>
                      {renderActivityType(activity.type)} {activity.name}
                    </p>
                    {activity.details && (
                      <p className='activity-details'>{activity.details}</p>
                    )}
                    {activity.state && (
                      <p className='activity-details'>{activity.state}</p>
                    )}
                    {activity?.timestamps?.start && (
                      <p className='activity-time'>
                        <i className='fa-solid fa-gamepad'></i>{' '}
                        {formatElapsedTime(timers[activity.id] || 0)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    )
  }

  return (
    <section className='discord-card-section' id='discord-card'>
      <div className='card-content'>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className='icon-and-name'>
              <Image
                src='/favicon.png'
                alt='Icon'
                className='rounded-[35%] mr-3'
                width={90}
                height={90}
              />
              <div className='user-info'>
                <p className='discord-name'>
                  {status?.discord_user.global_name}
                  <span className='text-gray-400 font-extralight ml-2'>
                    (@{status?.discord_user.username})
                  </span>
                </p>
                <p className='discord-status'>
                  Status: {capitalizeFirst(status?.discord_status)}
                </p>
              </div>
            </div>

            {status?.listening_to_spotify && status.spotify && (
              <div className='activty-card'>
                <div className='activty-title'>Listening to Spotify</div>
                <div className='flex items-center gap-4'>
                  <Image
                    src={`${status.spotify.album_art_url}?size=128`}
                    alt='Album Art'
                    width={100}
                    height={100}
                    quality={100}
                    className='album-art'
                  />
                  <div className='spotify-details'>
                    <p className='spotify-song'>{status.spotify.song}</p>
                    <p className='spotify-artist'>
                      <span className='text-white'>by</span>{' '}
                      {status.spotify.artist}
                    </p>
                    <p className='spotify-album'>
                      <span className='text-white'>on</span>{' '}
                      {status.spotify.album}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {renderActivities()}
          </>
        )}
      </div>
    </section>
  )
}

export default DiscordCard
