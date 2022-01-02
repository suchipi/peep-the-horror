import React, { useState } from "react";
import { Row } from "./Layout";
import Main from "./Main";
import Aside from "./Aside";
import AppState from "./AppState";

export default function App() {
  const [url, setUrl] = useState<string>(
    "https://www.youtube.com/watch?v=wRmXuN53ggw"
  );
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const appState: AppState = {
    data: { url, startTime, endTime, currentTime, isPlaying },
    controls: {
      setUrl,
      setStartTime,
      setEndTime,
      setCurrentTime,
      play: () => setIsPlaying(true),
      pause: () => setIsPlaying(false),
    },
  };

  return (
    <Row
      margin="0 auto"
      padding="var(--spacing)"
      maxWidth="1200px"
      gap="var(--spacing)"
    >
      <Main appState={appState} />
      <Aside appState={appState} />
    </Row>
  );
}
