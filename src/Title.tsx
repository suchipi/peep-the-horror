import React from "react";
import Box from "react-boxxy";

export default function Title() {
  return (
    <Box
      tagName="h1"
      textTransform="uppercase"
      textAlign="center"
      margin="1rem 0 0 0"
      color="var(--background-color)"
    >
      Peep The Horror
    </Box>
  );
}
