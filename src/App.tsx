import React, { useState } from "react";
import Box from "react-boxxy";
import ReactPlayer from "react-player";
import { Row, Column, Padding } from "./Layout";

export default function App() {
  const [url, setUrl] = useState<string>(
    "https://www.youtube.com/watch?v=wRmXuN53ggw"
  );
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  const [currentTime, setCurrentTime] = useState<number>(0);

  return (
    <Column>
      <Row>
        <label style={{ flexBasis: "100%" }}>
          Video URL
          <input value={url} onChange={(event) => setUrl(event.target.value)} />
        </label>
      </Row>

      <Box position="relative" width="100%" height="0" paddingBottom="56%">
        <ReactPlayer
          controls={true}
          progressInterval={16}
          url={url}
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

      <Row gap="1em">
        <Column flexBasis="100%">
          <label htmlFor="start-time">Start Time</label>
          <input
            id="start-time"
            type="number"
            step="0.1"
            value={startTime.toFixed(3)}
            onChange={(event) => setStartTime(parseFloat(event.target.value))}
          />
        </Column>

        <Column flexBasis="100%">
          <label htmlFor="end-time">End Time</label>
          <input
            id="end-time"
            type="number"
            step="0.1"
            value={endTime.toFixed(3)}
            onChange={(event) => setEndTime(parseFloat(event.target.value))}
          />
        </Column>
      </Row>

      <Row>
        <span className="time-label">Current Time:&nbsp;</span>
        <span className="current-time">{currentTime.toFixed(3)}</span>
      </Row>

      <Padding value="var(--spacing)" />

      <Row gap="1em">
        <button onClick={() => setStartTime(currentTime)}>
          Set Start Time to {currentTime.toFixed(3)}
        </button>
        <button onClick={() => setEndTime(currentTime)}>
          Set End Time to {currentTime.toFixed(3)}
        </button>
      </Row>
    </Column>
  );
}
