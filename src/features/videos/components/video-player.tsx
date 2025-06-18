import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

import { cn } from "@/lib/utils";

import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

interface VideoPlayerProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
}

export function VideoPlayer({
  src,
  className,
  autoPlay,
  muted,
}: VideoPlayerProps) {
  return (
    <MediaPlayer
      src={src}
      className={cn("vid_icn my-3", className)}
      playsInline
      autoPlay={autoPlay}
      muted={muted}
    >
      <MediaProvider />
      <DefaultVideoLayout icons={defaultLayoutIcons} noAudioGain />
    </MediaPlayer>
  );
}
