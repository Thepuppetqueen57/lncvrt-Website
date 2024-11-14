/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.scdn.co',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'cdn.discordapp.com',
          port: '',
          pathname: '/app-assets/**/**',
        },
        {
          protocol: 'https',
          hostname: 'cdn.discordapp.com',
          port: '',
          pathname: '/avatars/**/**',
        },
        {
          protocol: 'https',
          hostname: 'lanyard-profile-readme.vercel.app',
          port: '',
          pathname: '/assets/unknown.png',
        }
      ],
    },
  };

export default nextConfig;
