import React from "react";
import ReactPlayer from "react-player";

export type Data = {
  url: string;
  currentTime: number;
  markedTimes: Array<number>;
  isPlaying: boolean;
  playerRef: React.MutableRefObject<ReactPlayer | null>;
};

export type Controls = {
  setUrl: (url: string) => void;
  addMarkedTime: (time: number) => void;
  updateMarkedTimeAtIndex: (index: number, time: number) => void;
  removeMarkedTimeAtIndex: (index: number) => void;
  setCurrentTime: (currentTime: number, aggressively?: boolean) => void;
  setIsPlaying: (playing: boolean) => void;
};

type AppState = {
  data: Data;
  controls: Controls;
};

export default AppState;
