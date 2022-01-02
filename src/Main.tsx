import React from "react";
import AppState from "./AppState";
import { Row, Column, Padding } from "./Layout";
import Player from "./Player";
import Button from "./Button";

export default function Main({ appState }: { appState: AppState }) {
  const { data, controls } = appState;

  return (
    <Column tagName="main" flexBasis="67%">
      <label htmlFor="url">Video URL</label>
      <input
        id="url"
        value={data.url}
        onChange={(event) => controls.setUrl(event.target.value)}
      />

      <Player appState={appState} />

      <Padding value="var(--spacing)" />

      <label htmlFor="current-time">Current Time</label>
      <Row gap="1em">
        <input
          id="current-time"
          type="number"
          min="0"
          step="0.001"
          value={data.currentTime.toFixed(3)}
          onChange={(event) =>
            controls.setCurrentTime(parseFloat(event.target.value), true)
          }
          style={{ marginBottom: "0" }}
        />
        <Button
          onClick={() => controls.addMarkedTime(data.currentTime)}
          backgroundColor="var(--ins-color)"
        >
          Save Time {data.currentTime.toFixed(3)} (+)
        </Button>
      </Row>

      <Padding value="var(--spacing)" />

      <Row gap="var(--spacing)">
        <Button onClick={() => controls.setIsPlaying(!data.isPlaying)}>
          Play/Pause (Spacebar or 0)
        </Button>
        <Button onClick={() => controls.peepTheHorror(350)}>
          Peep The Horror (Alt + Down Arrow)
        </Button>
      </Row>
    </Column>
  );
}
