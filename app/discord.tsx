import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import './discord.css'

interface LanyardResponse {
  data: LanyardData
  success: boolean
}

interface LanyardData {
  kv: Record<string, any>
  discord_user: DiscordUser
  activities: Activity[]
  discord_status: string
  active_on_discord_web: boolean
  active_on_discord_desktop: boolean
  active_on_discord_mobile: boolean
  listening_to_spotify: boolean
  spotify: SpotifyInfo
}

interface DiscordUser {
  id: string
  username: string
  avatar: string
  discriminator: string
  clan: string | null
  avatar_decoration_data: string | null
  bot: boolean
  global_name: string
  display_name: string
}

interface Activity {
  id: string
  name: string
  type: number
  state: string
  details: string
  application_id: string
  timestamps: ActivityTimestamps
  assets: ActivityAssets
  created_at: number
  flags?: number
  session_id?: string
  sync_id?: string
  party?: PartyInfo
}

interface ActivityTimestamps {
  start: number
  end?: number
}

interface ActivityAssets {
  large_image: string
  large_text: string
  small_image?: string
  small_text?: string
}

interface PartyInfo {
  id: string
}

interface SpotifyInfo {
  timestamps: ActivityTimestamps
  album: string
  album_art_url: string
  artist: string
  song: string
  track_id: string
}

const DiscordCard: React.FC = () => {
  const [discordStatus, setDiscordStatus] = useState<LanyardResponse>()
  const hasFetched = useRef(false)
  const [timers, setTimers] = useState<{ [key: string]: number }>({})

  const fetchDiscordStatus = async () => {
    try {
      const response = await fetch(
        'https://api.lanyard.rest/v1/users/1245396407607889954'
      )
      const data: LanyardResponse = await response.json()

      if (!response.ok) {
        throw new Error(
          data.success ? 'Failed to fetch data' : data.success.toString()
        )
      }

      setDiscordStatus(data)
    } catch (error: any) {}
  }

  useEffect(() => {
    if (!hasFetched.current) {
      fetchDiscordStatus()
      hasFetched.current = true
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (discordStatus?.data.activities) {
        const newTimers = { ...timers }

        discordStatus.data.activities.forEach(activity => {
          if (activity.timestamps.start) {
            const startTime = activity.timestamps.start
            const elapsed = Math.floor((Date.now() - startTime) / 1000)
            newTimers[activity.id] = elapsed
          }
        })

        setTimers(newTimers)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [discordStatus, timers])

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
        return 'Unknown Activity'
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

  const renderActivities = () => {
    if (
      !discordStatus?.data.activities ||
      discordStatus.data.activities.length === 0
    ) {
      return null
    }

    return (
      <div className='activities-card'>
        <div className='activities-title'>Current Activities</div>
        <div className='activities-list'>
          {discordStatus.data.activities
            .filter(activity => activity.id !== 'spotify:1')
            .map(activity => (
              <div key={activity.id} className='activity-item'>
                <div className='activity-icons'>
                  <Image
                    src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`}
                    alt='Large Activity Image'
                    width={64}
                    height={64}
                    className='large-activity-image'
                  />
                  <Image
                    src={`https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.small_image}.png`}
                    alt='Small Activity Image'
                    width={40}
                    height={40}
                    className='small-activity-image'
                  />
                  <div className='activity-info'>
                    <p className='activity-name'>
                      {activity.name} ({renderActivityType(activity.type)})
                    </p>
                    {activity.details && (
                      <p className='activity-details'>{activity.details}</p>
                    )}
                    {activity.state && (
                      <p className='activity-details'>{activity.state}</p>
                    )}
                    {activity.timestamps.start && (
                      <p className='activity-time'>
                        Elapsed: {formatElapsedTime(timers[activity.id] || 0)}
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
      <p className='text-red-400 text-sm mb-4'>Note: This is currently WIP and I need to fix issues. This doesn&apos;t refresh automatically either.</p>
        <div className='icon-and-name'>
          <Image src="/favicon.png" alt="Icon" className='rounded-[35%] mr-3' width={90} height={90} />
          <div className='user-info'>
            <p className='discord-name'>
              {discordStatus?.data.discord_user.display_name}
              <span className='text-gray-400 font-extralight ml-2'>
                (@{discordStatus?.data.discord_user.username})
              </span>
            </p>
            <p className='discord-status'>
              Status: {discordStatus?.data.discord_status}
            </p>
          </div>
        </div>

        {discordStatus?.data.listening_to_spotify &&
          discordStatus.data.spotify && (
            <div className='spotify-card'>
              <div className='spotify-title'>Listening to Spotify</div>
              <div className='spotify-info'>
                <Image
                  src={discordStatus.data.spotify.album_art_url}
                  alt='Album Art'
                  width={100}
                  height={100}
                  className='album-art'
                />
                <div className='spotify-details'>
                  <p className='spotify-song'>
                    {discordStatus.data.spotify.song}
                  </p>
                  <p className='spotify-artist'>
                    <span className='text-white'>by</span>{' '}
                    {discordStatus.data.spotify.artist}
                  </p>
                  <p className='spotify-album'>
                    <span className='text-white'>on</span>{' '}
                    {discordStatus.data.spotify.album}
                  </p>
                </div>
              </div>
            </div>
          )}

        {renderActivities()}
      </div>
    </section>
  )
}

export default DiscordCard
