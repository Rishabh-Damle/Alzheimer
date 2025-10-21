type InstagramIconProps = {
  height?: number;
  width?: number;
};
export function InstagramIcon({ height = 30, width = 30 }: InstagramIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 512 512"
      fill="url(#instagramGradient)"
    >
      <defs>
        <linearGradient
          id="instagramGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#f58529" />
          <stop offset="50%" stopColor="#dd2a7b" />
          <stop offset="100%" stopColor="#8134af" />
        </linearGradient>
      </defs>
      <path d="M349.33 69.33H162.67C108.43 69.33 69.33 108.43 69.33 162.67v186.66c0 54.24 39.1 93.34 93.34 93.34h186.66c54.24 0 93.34-39.1 93.34-93.34V162.67c0-54.24-39.1-93.34-93.34-93.34zm61.34 280c0 33.93-27.41 61.34-61.34 61.34H162.67c-33.93 0-61.34-27.41-61.34-61.34V162.67c0-33.93 27.41-61.34 61.34-61.34h186.66c33.93 0 61.34 27.41 61.34 61.34v186.66z" />
      <circle cx="256" cy="256" r="80" />
      <circle cx="396" cy="116" r="20" />
    </svg>
  );
}
