import React from "react";

import "./App.css";
import { Box, Container, Stack } from "@mui/material";

function App() {
  return (
    <Container maxWidth="sm">
      <Stack flexDirection={"column"}>
        <Box sx={{ my: 4 }}>
          <p> lets start our project</p>
        </Box>
      </Stack>
    </Container>
  );
}

export default App;
