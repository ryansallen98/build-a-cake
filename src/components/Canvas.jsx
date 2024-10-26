import * as THREE from "three";
import { useEffect, useContext, useRef } from "react";
import { Box } from "@mui/material";
import { SizeContext } from "../context/SizeContext";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { IcingContext } from "../context/IcingContext";
import { RibbonContext } from "../context/RibbonContext";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { CandleContext } from "../context/CandleContext";

const cubePath = "cake.glb";
const candlePath = "candle.glb";

export default function Canvas() {
  const { size } = useContext(SizeContext);
  const { icing } = useContext(IcingContext);
  const { ribbon } = useContext(RibbonContext);
  const { candle } = useContext(CandleContext);
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const hemLightRef = useRef(null);
  const cakeRef = useRef(null);
  const candlesRef = useRef([]); // Array to keep track of candle models
  const loader = new GLTFLoader();

  useEffect(() => {
    const canvas = document.getElementById("build-a-cake");
    const scene = sceneRef.current;

    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.set(20, 20, 15);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setClearColor(0xeeeeee);
    rendererRef.current = renderer;

    // Set up orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;

    // Add hemisphere light
    const hemLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    hemLight.position.set(5, 20, 10);
    scene.add(hemLight);
    hemLightRef.current = hemLight;

    // Load and add the GLTF cake
    loader.load(cubePath, (gltf) => {
      const cake = gltf.scene;
      cake.scale.set(2, 2, 2); // Adjust the scale if needed
      scene.add(cake);
      cakeRef.current = cake;

      // Additional directional light to emphasize bevels
      const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
      dirLight.position.set(10, 10, 10);
      scene.add(dirLight);

      // Initial setup for cake size and color
      updateCakeProperties();
    });

    const animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  // Function to add candles based on current candle count
  const updateCandles = () => {
    if (cakeRef.current) {
      // Remove existing candles
      candlesRef.current.forEach((candle) => {
        cakeRef.current.remove(candle);
      });
      candlesRef.current = []; // Clear the candles array

      // Define candle placement logic
      const innerCircleCount = Math.min(candle, 10); // Max 10 candles in inner circle
      const outerCircleCount = candle > 10 ? candle - 10 : 0; // Remaining candles for outer circle

      // Load and position inner circle candles
      for (let i = 0; i < innerCircleCount; i++) {
        loader.load(candlePath, (candleGltf) => {
          const newCandle = candleGltf.scene;
          newCandle.scale.set(0.5, 0.5, 0.5);

          // Set candle color
          const candleDecoration = newCandle.getObjectByName("Kaars001_0");
          const candleStick = newCandle.getObjectByName("Kaars001_1");
          const candleBase = newCandle.getObjectByName("Kaars001_2");
          candleBase.material.color.set(ribbon.upper);
          candleStick.material.color.set(icing);
          candleDecoration.material.color.set("#ffffff");

          // Calculate candle position in inner circle
          const angle = (i / innerCircleCount) * Math.PI * 2;
          const radius = 2; // Radius for the inner circle
          const x = radius * Math.cos(angle);
          const z = radius * Math.sin(angle);

          newCandle.position.set(x, 0.7, z);
          cakeRef.current.add(newCandle);
          candlesRef.current.push(newCandle); // Track this candle in candlesRef
        });
      }

      // Load and position outer circle candles if needed
      for (let j = 0; j < outerCircleCount; j++) {
        loader.load(candlePath, (candleGltf) => {
          const newCandle = candleGltf.scene;
          newCandle.scale.set(0.5, 0.5, 0.5);

          // Update candle colors
          const candleDecoration = newCandle.getObjectByName("Kaars001_0");
          const candleStick = newCandle.getObjectByName("Kaars001_1");
          const candleBase = newCandle.getObjectByName("Kaars001_2");
          candleBase.material.color.set(ribbon.upper);
          candleStick.material.color.set(icing);
          candleDecoration.material.color.set("#ffffff");

          // Calculate candle position in outer circle
          const angle = (j / outerCircleCount) * Math.PI * 2;
          const outerRadius = 3; // Larger radius for the outer circle
          const x = outerRadius * Math.cos(angle);
          const z = outerRadius * Math.sin(angle);

          newCandle.position.set(x, 0.7, z);
          cakeRef.current.add(newCandle);
          candlesRef.current.push(newCandle); // Track this candle in candlesRef
        });
      }
    }
  };

  // Define material for a rough, matte icing
  const icingMaterialProps = {
    roughness: 1,
    metalness: 0,
  };

  // Define material for shiny, silk-like ribbons
  const silkMaterialProps = {
    roughness: 0,
    metalness: 0.1,
    clearcoat: 1,
    clearcoatRoughness: 0.5,
  };

  // Function to update cake properties based on context changes
  const updateCakeProperties = () => {
    if (cakeRef.current) {
      const cake = cakeRef.current.getObjectByName("Cake");
      const upperRibbon = cakeRef.current.getObjectByName("RibbonUpper");
      const lowerRibbon = cakeRef.current.getObjectByName("RibbonLower");

      if (cake) {
        cake.scale.set(size / 2, 1, size / 2);
        cake.material = new THREE.MeshStandardMaterial(icingMaterialProps);
        cake.material.color.set(icing);
      }

      if (upperRibbon) {
        upperRibbon.scale.set(size / 2 + 0.01, 0.4, size / 2 + 0.01);
        upperRibbon.material = new THREE.MeshPhysicalMaterial(
          silkMaterialProps
        );
        upperRibbon.material.color.set(ribbon.upper);
      }

      if (lowerRibbon) {
        lowerRibbon.scale.set(size / 2 + 0.02, 0.3, size / 2 + 0.02);
        lowerRibbon.material = new THREE.MeshPhysicalMaterial(
          silkMaterialProps
        );
        lowerRibbon.material.color.set(ribbon.lower);
      }
    }
  };

  // Update cake and candles when context changes
  useEffect(() => {
    updateCakeProperties();
    updateCandles();
  }, [size, icing, ribbon, candle]);

  return (
    <Box
      component={"canvas"}
      id="build-a-cake"
      sx={{ width: "100%", height: "100dvh", overflow: "hidden" }}
    />
  );
}
