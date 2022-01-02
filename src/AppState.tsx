export type Data = {
  url: string;
  startTime: number;
  endTime: number;
  currentTime: number;
  isPlaying: boolean;
};

export type Controls = {
  setUrl: (url: string) => void;
  setStartTime: (startTime: number) => void;
  setEndTime: (endTime: number) => void;
  setCurrentTime: (currentTime: number) => void;
  play: () => void;
  pause: () => void;
};

type AppState = {
  data: Data;
  controls: Controls;
};

export default AppState;
