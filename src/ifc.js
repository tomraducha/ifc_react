import {
  AmbientLight,
  AxesHelper,
  DirectionalLight,
  GridHelper,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Raycaster, Vector2 } from "three";
import {
  acceleratedRaycast,
  computeBoundsTree,
  disposeBoundsTree,
} from "three-mesh-bvh";

import {
  IfcAPI,
  IFCSPACE,
  IFCSITE,
  IFCBUILDING,
  IFCBUILDINGSTOREY,
} from "web-ifc/web-ifc-api";

import { IFCLoader } from "web-ifc-three/IFCLoader";

function ifc() {
  const ifcapi = new IfcAPI();

  //Sets up the IFC loading
  // const ifcModels = [];
  const raycaster = new Raycaster();
  raycaster.firstHitOnly = true;
  const mouse = new Vector2();

  //Creates the Three.js scene
  const scene = new Scene();

  //Object to store the size of the viewport
  const size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  //Creates the camera (point of view of the user)
  const aspect = size.width / size.height;
  const camera = new PerspectiveCamera(75, aspect);
  camera.position.z = 15;
  camera.position.y = 13;
  camera.position.x = 8;

  //Creates the lights of the scene
  const lightColor = 0xffffff;

  const ambientLight = new AmbientLight(lightColor, 0.5);
  scene.add(ambientLight);

  const directionalLight = new DirectionalLight(lightColor, 1);
  directionalLight.position.set(0, 10, 0);
  directionalLight.target.position.set(-5, 0, 0);
  scene.add(directionalLight);
  scene.add(directionalLight.target);

  //Sets up the renderer, fetching the canvas of the HTML
  const threeCanvas = document.getElementById("three-canvas");
  const renderer = new WebGLRenderer({
    canvas: threeCanvas,
    alpha: true,
  });

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  //Creates grids and axes in the scene
  const grid = new GridHelper(50, 30);
  scene.add(grid);

  const axes = new AxesHelper();
  axes.material.depthTest = false;
  axes.renderOrder = 1;
  scene.add(axes);

  //Creates the orbit controls (to navigate the scene)
  const controls = new OrbitControls(camera, threeCanvas);
  controls.enableDamping = true;
  controls.target.set(-2, 0, 0);

  //Animation loop
  const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();

  //Adjust the viewport to the size of the browser
  window.addEventListener("resize", () => {
    size.width = window.innerWidth;
    size.height = window.innerHeight;
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
  });

  let modelID = 0;
  // Sets up the IFC loading
  const ifcLoader = new IFCLoader();
  ifcLoader.ifcManager.setupThreeMeshBVH(
    computeBoundsTree,
    disposeBoundsTree,
    acceleratedRaycast
  );
  ifcLoader.ifcManager.setWasmPath("./public/");
  const input = document.getElementById("file-input");
  input.addEventListener(
    "change",
    (changed) => {
      const file = changed.target.files[0];
      var ifcURL = URL.createObjectURL(file);
      initIfcSpace(ifcURL);
      initIfcSite(ifcURL);
      initIfcBuilding(ifcURL);
      initIfcBuildingStorey(ifcURL);
      ifcLoader.load(ifcURL, (ifcModel) => {
        scene.add(ifcModel);
        console.log(ifcModel);
      });
    },
    false
  );

  // async function loadIFC() {
  //   await ifcLoader.ifcManager.setWasmPath("../../wasm/");
  //   ifcLoader.load("../../../IFC/01.ifc", (ifcModel) => {
  //     ifcModels.push(ifcModel);
  //     scene.add(ifcModel);
  //   });
  // }

  // loadIFC();

  /**
   * Requests the data from the url
   *
   * @param {string} url
   * @returns
   */
  function getIfcFile(url) {
    return new Promise((resolve, reject) => {
      var oReq = new XMLHttpRequest();
      oReq.responseType = "arraybuffer";
      oReq.addEventListener("load", () => {
        resolve(new Uint8Array(oReq.response));
      });
      oReq.open("GET", url);
      oReq.send();
    });
  }

  /**
   * Gets the elements of the requested model
   *
   * @param {string} modelID The model ID
   * @param {string} model The model type to retrieve
   * @returns
   */
  function getAllElements(modelID, model) {
    // Get all the propertyset lines in the IFC file
    let lines = ifcapi.GetLineIDsWithType(modelID, model);
    let lineSize = lines.size();
    let spaces = [];
    for (let i = 0; i < lineSize; i++) {
      // Getting the ElementID from Lines
      let relatedID = lines.get(i);
      // Getting Element Data using the relatedID
      let relDefProps = ifcapi.GetLine(modelID, relatedID);
      spaces.push(relDefProps);
    }
    return spaces;
  }

  /**
   * Initializes the ifcApi to request data.
   *
   * @param {string} ifcFileLocation
   */
  function initIfcModel(ifcFileLocation, modelType) {
    ifcapi.Init().then(() => {
      getIfcFile(ifcFileLocation).then((ifcData) => {
        modelID = ifcapi.OpenModel(ifcData);
        // let isModelOpened = ifcapi.IsModelOpen(modelID);
        let elements = getAllElements(modelID, modelType);

        if (modelType === IFCSPACE) {
          const longNames = elements.map((element) => element.LongName.value);
          console.log(longNames);
        } else {
          const names = elements.map((element) => element.Name.value);
          console.log(names);
        }

        ifcapi.CloseModel(modelID);
      });
    });
  }

  function initIfcSite(ifcFileLocation) {
    initIfcModel(ifcFileLocation, IFCSITE);
  }

  function initIfcBuilding(ifcFileLocation) {
    initIfcModel(ifcFileLocation, IFCBUILDING);
  }

  function initIfcBuildingStorey(ifcFileLocation) {
    initIfcModel(ifcFileLocation, IFCBUILDINGSTOREY);
  }

  function initIfcSpace(ifcFileLocation) {
    initIfcModel(ifcFileLocation, IFCSPACE);
  }
}

export default ifc;
