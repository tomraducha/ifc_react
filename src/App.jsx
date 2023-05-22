import Header from "./components/Header";
import InputFile from "./components/InputFile";
import ThreeCanvas from "./components/ThreeCanvas";
import { Box } from "@mui/material";
import Menu from "./components/Menu";
import useIfc from "./hooks/useIfc";

function App() {
  const { name } = useIfc();

  return (
    <>
      <Header />
      <InputFile />
      <Box sx={{ flexDirection: "row" }}>
        <Menu name={name} />
        <ThreeCanvas />
      </Box>
    </>
  );
}

export default App;
