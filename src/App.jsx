/* BTIB */
import Header from "./components/Header/Header";
import InputFile from "./components/InputFile/InputFile";
import ThreeCanvas from "./components/ThreeCanvas/ThreeCanvas";
import CardProperties from "./components/CardProperties/CardProperties";
import Menu from "./components/Menu/Menu";
import useIfc from "./hooks/useIfc";
/* Libs & plugins */
import { useState } from "react";
import { Box } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f00",
    },
  },
});

function App() {
  const { name, lengthName, properties } = useIfc();
  const [selectedElement, setSelectedElement] = useState(null);

  ////////////////////////////////////////////////////////////////
  // Event handlers
  ////////////////////////////////////////////////////////////////

  function handleClose() {
    setSelectedElement(null);
  }

  ////////////////////////////////////////////////////////////////
  // JSX
  ////////////////////////////////////////////////////////////////

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <InputFile />
        <Box
          sx={{
            flexDirection: "row",
            position: "absolute",
            top: 0,
            zIndex: 1,
            opacity: 0.9,
          }}
        >
          <CardProperties
            selectedElement={selectedElement}
            onClose={handleClose}
          />
          <Menu
            name={name}
            lengthName={lengthName}
            properties={properties}
            setSelectedElement={setSelectedElement}
          />
        </Box>
        <Box sx={{ flexDirection: "row" }}>
          <ThreeCanvas />
        </Box>
      </ThemeProvider>
    </>
  );
}

export default App;
