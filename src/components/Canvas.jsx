import * as THREE from "three";
import { useEffect, useContext, useRef } from "react";
import { Box } from "@mui/material";
import { SizeContext } from "../context/SizeContext";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { IcingContext } from "../context/IcingContext";
import { RibbonContext } from "../context/RibbonContext";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const cubePath = "cake.glb";

export default function Canvas() {
  const { size } = useContext(SizeContext);
  const { icing } = useContext(IcingContext);
  const { ribbon } = useContext(RibbonContext);
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const hemLightRef = useRef(null);
  const modelRef = useRef(null);
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

    // Load and add the GLTF model
    loader.load(cubePath, (gltf) => {
      const model = gltf.scene;
      model.scale.set(2, 2, 2); // Adjust the scale if needed
      scene.add(model);
      modelRef.current = model;

      // Additional directional light to emphasize bevels
      const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
      dirLight.position.set(10, 10, 10);
      scene.add(dirLight);

      // Initial setup for model size and color
      updateModelProperties();
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

  // Function to update model properties based on context changes
  const updateModelProperties = () => {
    if (modelRef.current) {
      const cake = modelRef.current.getObjectByName("Cake");
      const upperRibbon = modelRef.current.getObjectByName("RibbonUpper");
      const lowerRibbon = modelRef.current.getObjectByName("RibbonLower");

      console.log({ cake, upperRibbon, lowerRibbon });

      // Define material for a rough, matte icing
      const icingMaterialProps = {
        roughness: 1, // High roughness for a matte finish
        metalness: 0, // No metalness for a non-reflective look
      };

      if (cake) {
        cake.scale.set(size / 2, 1, size / 2);
        cake.material = new THREE.MeshStandardMaterial(icingMaterialProps);
        cake.material.color.set(icing);
      }

      // Define material for shiny, silk-like ribbons
      const silkMaterialProps = {
        roughness: 0, // Lower roughness for shininess
        metalness: 0.1, // Small metalness for sheen
        clearcoat: 1, // High clearcoat for extra shine
        clearcoatRoughness: 0.5, // Very smooth clearcoat layer
      };

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

  // Update model properties when `size` or `icing` changes
  useEffect(() => {
    updateModelProperties();
  }, [size, icing, ribbon]);

  return (
    <Box
      component={"canvas"}
      id="build-a-cake"
      sx={{ width: "100%", height: "100dvh", overflow: "hidden" }}
    />
  );
}
