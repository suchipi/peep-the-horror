import React, { useEffect } from "react";
import Box from "react-boxxy";
import { Column, Row, Spacer } from "./Layout";
import Main from "./Main";
import Aside from "./Aside";
import useNewAppState from "./useNewAppState";
import useKeyboardControls from "./useKeyboardControls";
import useFocusGrabber from "./useFocusGrabber";
import Title from "./Title";
import ForkMe from "./ForkMe";
import Instructions from "./instructions.mdx";

export default function App() {
  const appState = useNewAppState();
  useKeyboardControls(appState);
  useFocusGrabber();

  useEffect(() => {
    document.body.tabIndex = 0;
  }, []);

  return (
    <React.StrictMode>
      <Column>
        <Title />
        <Row
          margin="0 auto"
          padding="var(--spacing)"
          width="100vw"
          maxWidth="1600px"
          gap="var(--spacing)"
          backgroundColor="var(--background-color)"
          borderRadius="var(--border-radius)"
        >
          <Main appState={appState} />
          <Aside appState={appState} />
        </Row>
      </Column>

      <Spacer value="2rem" />

      <Box tagName="footer" backgroundColor="var(--background-color)">
        <Box width="100vw" maxWidth="1600px" margin="0 auto" padding="2rem">
          <Instructions />

          <Spacer value="2rem" />

          <Box textAlign="center">
            Made by{" "}
            <a href="https://suchipi.com" target="_blank">
              Suchipi
            </a>{" "}
            with ❤️
          </Box>
        </Box>
      </Box>

      <ForkMe />
    </React.StrictMode>
  );
}
