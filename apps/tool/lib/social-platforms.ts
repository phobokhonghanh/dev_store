export interface SocialPlatform {
  name: string
  domain: string
  pattern: RegExp
  logo: string
}

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  {
    name: 'Facebook',
    domain: 'facebook.com',
    pattern: /(?:www\.)?facebook\.com/,
    logo: 'https://cdn-icons-png.flaticon.com/512/733/733547.png',
  },
  {
    name: 'Instagram',
    domain: 'instagram.com',
    pattern: /(?:www\.)?instagram\.com/,
    logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png',
  },
  {
    name: 'Twitter / X',
    domain: 'twitter.com',
    pattern: /(?:www\.)?(?:twitter\.com|x\.com)/,
    logo: 'https://cdn-icons-png.flaticon.com/512/733/733579.png',
  },
  {
    name: 'YouTube',
    domain: 'youtube.com',
    pattern: /(?:www\.)?youtube\.com/,
    logo: 'https://cdn-icons-png.flaticon.com/512/1384/1384060.png',
  },
  {
    name: 'LinkedIn',
    domain: 'linkedin.com',
    pattern: /(?:www\.)?linkedin\.com/,
    logo: 'https://cdn-icons-png.flaticon.com/512/174/174857.png',
  },
  {
    name: 'GitHub',
    domain: 'github.com',
    pattern: /(?:www\.)?github\.com/,
    logo: 'https://cdn-icons-png.flaticon.com/128/2504/2504911.png',
  },
  {
    name: 'TikTok',
    domain: 'tiktok.com',
    pattern: /(?:www\.)?tiktok\.com/,
    logo: 'https://cdn-icons-png.flaticon.com/512/3046/3046121.png',
  },
  {
    name: 'Telegram',
    domain: 't.me',
    pattern: /(?:www\.)?(?:t\.me|telegram\.me)/,
    logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111646.png',
  },
  {
    name: 'Zalo',
    domain: 'zalo.me',
    pattern: /(?:www\.)?zalo\.me/,
    logo: 'https://img.icons8.com/?size=96&id=0m71tmRjlxEe&format=png',
  },
  {
    name: 'Pinterest',
    domain: 'pinterest.com',
    pattern: /(?:www\.)?pinterest\.com/,
    logo: 'https://cdn-icons-png.flaticon.com/512/145/145808.png',
  },
  {
    name: 'Discord',
    domain: 'discord.com',
    pattern: /(?:www\.)?(?:discord\.com|discord\.gg)/,
    logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111370.png',
  },
  {
    name: 'Spotify',
    domain: 'spotify.com',
    pattern: /(?:www\.)?spotify\.com/,
    logo: 'https://cdn-icons-png.flaticon.com/128/3669/3669986.png',
  },
  {
    name: 'WhatsApp',
    domain: 'whatsapp.com',
    pattern: /(?:www\.)?whatsapp\.com/,
    logo: 'https://cdn-icons-png.flaticon.com/512/733/733585.png',
  },
  {
    name: 'reddit',
    domain: 'reddit.com',
    pattern: /(?:www\.)?reddit\.com/,
    logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111589.png',
  },
  {
    name: 'Twitch',
    domain: 'twitch.tv',
    pattern: /(?:www\.)?twitch\.tv/,
    logo: 'https://cdn-icons-png.flaticon.com/128/2111/2111668.png',
  },
  {
    name: 'Google',
    domain: 'google.com',
    pattern: /(?:www\.)?google\.com/,
    logo: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
  },
  {
    name: 'Apple',
    domain: 'apple.com',
    pattern: /(?:www\.)?apple\.com/,
    logo: 'https://cdn-icons-png.flaticon.com/512/0/747.png',
  },
  {
    name: 'Netflix',
    domain: 'netflix.com',
    pattern: /(?:www\.)?netflix\.com/,
    logo: 'https://cdn-icons-png.flaticon.com/512/5977/5977590.png',
  },
  {
    name: 'Snapchat',
    domain: 'snapchat.com',
    pattern: /(?:www\.)?snapchat\.com/,
    logo: 'https://cdn-icons-png.flaticon.com/512/3670/3670166.png',
  },
  {
    name: 'Slack',
    domain: 'slack.com',
    pattern: /(?:www\.)?slack\.com/,
    logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968929.png',
  },
  {
    name: 'Zoom',
    domain: 'zoom.us',
    pattern: /(?:www\.)?(?:zoom\.us|zoom\.com)/,
    logo: 'https://cdn-icons-png.flaticon.com/128/4401/4401470.png',
  },
  {
    name: 'Medium',
    domain: 'medium.com',
    pattern: /(?:www\.)?medium\.com/,
    logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968906.png',
  },
]

export const detectPlatform = (url: string): SocialPlatform | null => {
  if (!url) return null
  return SOCIAL_PLATFORMS.find((platform) => platform.pattern.test(url)) || null
}
