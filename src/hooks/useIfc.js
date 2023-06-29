/* Libs & plugins */
import { useEffect, useState } from "react";
import { Raycaster } from "three";
import { IFCLoader } from "web-ifc-three/IFCLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as threeIFc from "three";
import * as threeMeshBvhIfc from "three-mesh-bvh";
import * as webIfc from "web-ifc";

const {
  AmbientLight,
  AxesHelper,
  DirectionalLight,
  GridHelper,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} = threeIFc;

const { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } =
  threeMeshBvhIfc;

const { IfcAPI, IFCSPACE, IFCSITE, IFCBUILDING, IFCBUILDINGSTOREY } = webIfc;

export default function useIfc() {
  const [name, setName] = useState({
    Site: null,
    Buildings: null,
    Floors: null,
    Rooms: null,
  });
  const [lengthName, setLengthName] = useState({
    Site: null,
    Buildings: null,
    Floors: null,
    Rooms: null,
  });

  const [properties, setProperties] = useState({
    Site: null,
    Buildings: null,
    Floors: null,
    Rooms: null,
  });

  const [ifcApi, setIfcApi] = useState(null);

  useEffect(() => {
    const ifcapi = new IfcAPI();
    setIfcApi(ifcapi);

    //Sets up the IFC loading
    const raycaster = new Raycaster();
    raycaster.firstHitOnly = true;

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
        ifcLoader.load(
          ifcURL,
          (ifcModel) => {
            scene.add(ifcModel);
          },
          (progress) => {
            console.log("Progress: ", progress);
          },
          (error) => {
            console.log("Error: ", error);
          }
        );
      },
      false
    );

    /**
     *  This function sets the path to the WebAssembly binary that the ifcManager uses for multi-threading.
     **/

    async function setUpMultiThreading() {
      await ifcLoader.ifcManager.setWasmPath("../../../");
    }

    setUpMultiThreading();

    /**
     * Fetches an IFC file from a given URL and returns it as an array buffer.
     **/

    function getIfcFile(url) {
      return new Promise((resolve) => {
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
     **/

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
     * Initializes the ifcApi to request site data from an IFC file.
     **/

    function initIfcSite(ifcFileLocation) {
      ifcapi.Init().then(() => {
        getIfcFile(ifcFileLocation).then((ifcData) => {
          modelID = ifcapi.OpenModel(ifcData);
          let elements = getAllElements(modelID, IFCSITE);
          setProperties((prevState) => ({ ...prevState, Site: elements }));
          const filteredElements = elements.filter((element) => {
            const nameValue = element.Name.value;
            return nameValue !== null && !/\d{3}/.test(nameValue);
          });
          const name = filteredElements.map((element) => element.Name.value);
          setName((prevState) => ({ ...prevState, Site: name }));
          setLengthName((prevState) => ({ ...prevState, Site: name.length }));
          ifcapi.CloseModel(modelID);
        });
      });
    }

    /**
     * Initializes the ifcApi to request building data from an IFC file.
     **/

    function initIfcBuilding(ifcFileLocation) {
      ifcapi.Init().then(() => {
        getIfcFile(ifcFileLocation).then((ifcData) => {
          modelID = ifcapi.OpenModel(ifcData);
          let elements = getAllElements(modelID, IFCBUILDING);
          setProperties((prevState) => ({ ...prevState, Buildings: elements }));
          const filteredElements = elements.filter((element) => {
            const nameValue = element.Name.value;
            return nameValue !== null && !/\d{3}/.test(nameValue);
          });
          const name = filteredElements.map((element) => element.Name.value);
          setName((prevState) => ({ ...prevState, Buildings: name }));
          setLengthName((prevState) => ({
            ...prevState,
            Buildings: name.length,
          }));
          ifcapi.CloseModel(modelID);
        });
      });
    }

    /**
     * Initializes the ifcApi to request building story data from an IFC file.
     **/

    function initIfcBuildingStorey(ifcFileLocation) {
      ifcapi.Init().then(() => {
        getIfcFile(ifcFileLocation).then((ifcData) => {
          modelID = ifcapi.OpenModel(ifcData);
          let elements = getAllElements(modelID, IFCBUILDINGSTOREY);
          setProperties((prevState) => ({ ...prevState, Floors: elements }));
          const filteredElements = elements.filter((element) => {
            const nameValue = element.Name.value;
            return nameValue !== null && !/\d{3}/.test(nameValue);
          });
          const name = filteredElements.map((element) => element.Name.value);
          setName((prevState) => ({ ...prevState, Floors: name }));
          setLengthName((prevState) => ({ ...prevState, Floors: name.length }));
          ifcapi.CloseModel(modelID);
        });
      });
    }

    /**
     * Initializes the ifcApi to request space data from an IFC file.
     **/

    function initIfcSpace(ifcFileLocation) {
      ifcapi.Init().then(() => {
        getIfcFile(ifcFileLocation).then((ifcData) => {
          modelID = ifcapi.OpenModel(ifcData);
          let elements = getAllElements(modelID, IFCSPACE);
          setProperties((prevState) => ({ ...prevState, Rooms: elements }));
          const filteredElements = elements.filter((element) => {
            const nameValue = element.LongName.value;
            return nameValue !== null && !/\d{3}/.test(nameValue);
          });
          const longNames = filteredElements.map(
            (element) => element.LongName.value
          );
          setName((prevState) => ({ ...prevState, Rooms: longNames }));
          setLengthName((prevState) => ({
            ...prevState,
            Rooms: longNames.length,
          }));
          ifcapi.CloseModel(modelID);
        });
      });
    }
  }, []);

  return { name, lengthName, properties, ifcApi };
}
