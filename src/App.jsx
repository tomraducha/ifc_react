import { useEffect } from "react";
import ifc from "./ifc";

function App() {
  useEffect(() => {
    ifc();
  });

  return (
    <>
      <div className="header">
        <h1>Bienvenue chez Vayandata</h1>
      </div>
      <div className="input">
        <input type="file" name="load" id="file-input" />
      </div>
      <div id="output"></div>
      <div className="canvas">
        <canvas id="three-canvas"></canvas>
      </div>
    </>
  );
}

export default App;
