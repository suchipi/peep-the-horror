import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import AppState from "./AppState";

export default function useNewAppState() {
  const [url, setUrl] = useState<string>(
    "https://www.youtube.com/watch?v=x7a9CXXu3oc"
  );

  const [markedTimesVersion, setMarkedTimesVersion] = useState<number>(0);
  const markedTimes = useRef<Array<number>>([
    0.755, 2.176, 2.391, 2.613, 4.47, 6.988,
  ]);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const playerRef = useRef<ReactPlayer | null>(null);
  const currentTimeInputRef = useRef<HTMLInputElement | null>(null);

  const horror = useRef({
    target: null as number | null,
    timeout: null as NodeJS.Timeout | null,
  }).current;

  const data = {
    url,
    markedTimes: markedTimes.current,
    currentTime,
    isPlaying,
    playerRef,
    currentTimeInputRef,
  };

  const controls = {
    setUrl,
    setCurrentTime: (time: number, lazy: boolean = false) => {
      setCurrentTime(Math.max(0, time));

      if (!lazy) {
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
      const returnTime = horror.target ?? data.currentTime;

      if (horror.timeout != null) {
        clearTimeout(horror.timeout);
      }

      horror.target = returnTime;
      controls.setCurrentTime(returnTime);
      controls.setIsPlaying(true);

      horror.timeout = setTimeout(() => {
        controls.setIsPlaying(false);
        controls.setCurrentTime(returnTime);
        horror.timeout = null;
        horror.target = null;
      }, duration);
    },
    syncCurrentTimeInput: () => {
      const input = currentTimeInputRef.current;
      if (!input) return;

      input.value = currentTime.toFixed(3);
    },
  };

  const appState: AppState = { data, controls };
  return appState;
}
