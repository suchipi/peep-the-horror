import React, { useEffect } from "react";
import AppState from "./AppState";
import { Row, Column, Spacer } from "./Layout";
import Player from "./Player";
import Button from "./Button";

export default function Main({ appState }: { appState: AppState }) {
  const { data, controls } = appState;

  useEffect(() => {
    const input = data.currentTimeInputRef.current;
    if (!input) return;

    if (document.activeElement !== input) {
      controls.syncCurrentTimeInput();
    }
  }, [data.currentTimeInputRef.current, data.currentTime]);

  useEffect(() => {
    return () => controls.clearMarkedTimes();
  }, [data.url]);

  return (
    <Column tagName="main" flexBasis="67%">
      <label htmlFor="url">Video URL</label>
      <input
        id="url"
        value={data.url}
        onChange={(event) => controls.setUrl(event.target.value)}
      />

      <Player appState={appState} />

      <Spacer value="var(--spacing)" />

      <label htmlFor="current-time">Current Time</label>
      <Row gap="1em">
        <input
          ref={data.currentTimeInputRef}
          id="current-time"
          type="number"
          min="0"
          step="0.001"
          onChange={(event) => {
            controls.setCurrentTime(parseFloat(event.target.value));
          }}
          style={{ marginBottom: "0" }}
        />
        <Button onClick={() => controls.addMarkedTime(data.currentTime)}>
          Save Time {data.currentTime.toFixed(3)} (+)
        </Button>
      </Row>

      <Spacer value="var(--spacing)" />

      <Row gap="var(--spacing)">
        <Button
          secondary
          onClick={() => controls.setIsPlaying(!data.isPlaying)}
        >
          Play/Pause (Spacebar or 0)
        </Button>
        <Button
          contrast
          onMouseDown={controls.startPeeping}
          onMouseUp={controls.stopPeeping}
        >
          Peep The Horror (Alt + Down Arrow)
        </Button>
      </Row>
    </Column>
  );
}
