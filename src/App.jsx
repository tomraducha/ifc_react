import { init } from "./ifc";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    init();
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
