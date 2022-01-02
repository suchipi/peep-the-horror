import React from "react";
import Box from "react-boxxy";
import ReactPlayer from "react-player";
import AppState from "./AppState";
import { Row, Column, Padding } from "./Layout";
import Button from "./Button";

export default function Main({ appState }: { appState: AppState }) {
  const { url, currentTime, isPlaying } = appState.data;
  const { setUrl, setCurrentTime, addMarkedTime, setIsPlaying } =
    appState.controls;

  const playerRef = appState.data.playerRef;

  const setPlayingTrue = () => setIsPlaying(true);
  const setPlayingFalse = () => setIsPlaying(false);

  return (
    <Column tagName="main" flexBasis="67%">
      <label htmlFor="url" style={{ flexBasis: "100%" }}>
        Video URL
      </label>
      <input
        id="url"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
      />

      <Box position="relative" width="100%" height="0" paddingBottom="56%">
        <ReactPlayer
          ref={playerRef}
          playing={isPlaying}
          controls={true}
          progressInterval={16}
          url={url}
          onStart={setPlayingTrue}
          onPause={setPlayingFalse}
          onEnded={setPlayingFalse}
          onProgress={(data) => {
            setCurrentTime(data.playedSeconds);
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

      <Padding value="var(--spacing)" />

      <label htmlFor="current-time">Current Time</label>
      <Row gap="1em">
        <input
          id="current-time"
          type="number"
          min="0"
          step="0.1"
          value={currentTime.toFixed(3)}
          onChange={(event) =>
            setCurrentTime(parseFloat(event.target.value), true)
          }
          style={{ marginBottom: "0" }}
        />
        <Button
          onClick={() => addMarkedTime(currentTime)}
          backgroundColor="var(--ins-color)"
        >
          Mark {currentTime.toFixed(3)} (+)
        </Button>
      </Row>

      <Padding value="var(--spacing)" />

      <Row gap="var(--spacing)">
        <Button onClick={setPlayingTrue}>Play (0)</Button>
        <Button onClick={setPlayingFalse}>Pause (.)</Button>
      </Row>
    </Column>
  );
}
