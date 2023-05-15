import "./App.css";
import { init } from "./ifc";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    init();
  });

  return (
    <>
      <input type="file" name="load" id="file-input" />
      <canvas id="three-canvas"></canvas>
    </>
  );
}

export default App;
