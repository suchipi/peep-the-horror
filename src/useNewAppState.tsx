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

  const horror = useRef({
    target: null as number | null,
    timeout: null as NodeJS.Timeout | null,
  }).current;

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
      clearMarkedTimes: () => {
        markedTimes.current = [];
        setMarkedTimesVersion(markedTimesVersion + 1);
      },
      setIsPlaying,
      peepTheHorror: (duration: number) => {
        const returnTime = horror.target ?? appState.data.currentTime;

        if (horror.timeout != null) {
          clearTimeout(horror.timeout);
        }

        horror.target = returnTime;
        appState.controls.setCurrentTime(returnTime, true);
        appState.controls.setIsPlaying(true);

        horror.timeout = setTimeout(() => {
          appState.controls.setIsPlaying(false);
          appState.controls.setCurrentTime(returnTime, true);
          horror.timeout = null;
          horror.target = null;
        }, duration);
      },
    },
  };

  return appState;
}
