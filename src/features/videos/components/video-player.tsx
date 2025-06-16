import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";

import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import { cn } from "@/lib/utils";

interface VideoPlayerProps {
  src: string;
  className?: string;
}

export function VideoPlayer({ src, className }: VideoPlayerProps) {
  return (
    <MediaPlayer
      src={src}
      className={cn("vid_icn my-3", className)}
      playsInline
    >
      <MediaProvider />
      <DefaultVideoLayout icons={defaultLayoutIcons} noAudioGain />
    </MediaPlayer>
  );
}
