import Header from "./components/Header";
import InputFile from "./components/InputFile";
import ThreeCanvas from "./components/ThreeCanvas";
import { Box } from "@mui/material";
import Menu from "./components/Menu";
import useIfc from "./hooks/useIfc";

function App() {
  const { name } = useIfc();
  const { lengthName } = useIfc();

  return (
    <>
      <Header />
      <InputFile />
      <p>Progress:</p>
      <p id="progress-text">0</p>
      <p>%</p>
      <Box sx={{ flexDirection: "row" }}>
        <Menu name={name} lengthName={lengthName} />
        <ThreeCanvas />
      </Box>
    </>
  );
}

export default App;
