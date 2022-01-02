import React from "react";
import ReactPlayer from "react-player";

export type Data = {
  // The currently loaded (or requested) video
  url: string;

  // The current position of the playhead (in seconds).
  currentTime: number;

  // An array of times the user has marked, to jump to later.
  markedTimes: Array<number>;

  // Whether the video is currently playing
  isPlaying: boolean;

  // Ref to the react-player component instance.
  playerRef: React.MutableRefObject<ReactPlayer | null>;

  // Ref to the current time input
  currentTimeInputRef: React.MutableRefObject<HTMLInputElement | null>;
};

export type Controls = {
  // Set the video url; loads it in the player
  setUrl: (url: string) => void;

  // Marks a timestamp so you can jump back to it later.
  addMarkedTime: (time: number) => void;

  // Update the timestamp associated with the marked time in the cooresponding index
  updateMarkedTimeAtIndex: (index: number, time: number) => void;

  // Remove the marked time at the corresponding index
  removeMarkedTimeAtIndex: (index: number) => void;

  // Remove all marked times
  clearMarkedTimes: () => void;

  // Sets the current position of the playhead. Pass true for `lazy` to set
  // the current time in React's state without telling the video player to
  // seek.
  setCurrentTime: (currentTime: number, lazy?: boolean) => void;

  // Sets whether the video is playing; call with `true` to play, `false` to pause.
  setIsPlaying: (playing: boolean) => void;

  // Notes the current playhead position, plays the video for `duration` ms,
  // then returns to the original playhead position. Useful for previewing audio at a given timestamp.
  peepTheHorror: (duration: number) => void;

  // Sets the value of the current time input ref to the value of the "currentTime" state.
  // Use this to control when the input should be controlled.
  syncCurrentTimeInput: () => void;
};

type AppState = {
  // the current state of the system
  data: Data;

  // actions you can take to modify the state of the system
  controls: Controls;
};

export default AppState;
