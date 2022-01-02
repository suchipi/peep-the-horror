import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import AppState from "./AppState";

export default function useNewAppState() {
  const [url, setUrl] = useState<string>(
    "https://www.youtube.com/watch?v=x7a9CXXu3oc"
  );

  const [markedTimesVersion, setMarkedTimesVersion] = useState<number>(0);
  const markedTimes = useRef<Array<number>>([]);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const playerRef = useRef<ReactPlayer | null>(null);

  const appState: AppState = {
    data: {
      url,
      markedTimes: markedTimes.current,
      currentTime,
      isPlaying,
      playerRef,
    },
    controls: {
      setUrl,
      setCurrentTime: (time: number, aggressively: boolean = false) => {
        setCurrentTime(Math.max(0, time));

        if (aggressively) {
          const player = playerRef.current;
          if (player != null) {
            player.seekTo(time, "seconds");
          }
        }
      },
      addMarkedTime: (time: number) => {
        markedTimes.current.push(time);
        setMarkedTimesVersion(markedTimesVersion + 1);
      },
      updateMarkedTimeAtIndex: (index: number, time: number) => {
        markedTimes.current[index] = time;
        setMarkedTimesVersion(markedTimesVersion + 1);
      },
      removeMarkedTimeAtIndex: (index: number) => {
        markedTimes.current.splice(index, 1);
        setMarkedTimesVersion(markedTimesVersion + 1);
      },
      setIsPlaying,
    },
  };

  return appState;
}
