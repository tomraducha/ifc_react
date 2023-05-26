import Header from "./components/Header";
import InputFile from "./components/InputFile";
import ThreeCanvas from "./components/ThreeCanvas";
import { Box } from "@mui/material";
import Menu from "./components/Menu";
import useIfc from "./hooks/useIfc";
import CardProperties from "./components/CardProperties";
import { useState } from "react";
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

  function handleClose() {
    setSelectedElement(null);
  }

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
