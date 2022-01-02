import React from "react";
import AppState from "./AppState";
import { Row, Column, Padding } from "./Layout";

export default function Aside({ appState }: { appState: AppState }) {
  const { url, startTime, endTime, currentTime } = appState.data;
  const { setUrl, setStartTime, setEndTime, setCurrentTime, play } =
    appState.controls;

  return (
    <Column tagName="aside" gap="var(--spacing)">
      <button
        onClick={() => {
          setCurrentTime(startTime);
          play();
        }}
      >
        Jump to start time
      </button>
      <button
        onClick={() => {
          setCurrentTime(endTime);
          play();
        }}
      >
        Jump to end time
      </button>
    </Column>
  );
}
