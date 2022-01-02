import React from "react";
import Box from "react-boxxy";
import ReactPlayer from "react-player";
import AppState from "./AppState";

export default function Player({ appState }: { appState: AppState }) {
  const { data, controls } = appState;

  const playerRef = data.playerRef;

  const setPlayingTrue = () => controls.setIsPlaying(true);
  const setPlayingFalse = () => controls.setIsPlaying(false);

  return (
    <Box
      tagName="article"
      position="relative"
      width="100%"
      height="0"
      paddingBottom="56%"
    >
      <ReactPlayer
        ref={playerRef}
        playing={data.isPlaying}
        controls={true}
        progressInterval={16}
        url={data.url}
        onStart={setPlayingTrue}
        onPause={setPlayingFalse}
        onEnded={setPlayingFalse}
        onProgress={(data) => {
          controls.setCurrentTime(data.playedSeconds, true);
        }}
        width="initial"
        height="initial"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          bottom: "0",
          right: "0",
        }}
      />
    </Box>
  );
}
