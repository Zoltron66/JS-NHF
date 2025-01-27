import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//import dataJSON from "./data/app-data.json" with {type:"json"};

function main() {

    // Canvas + Renderer Create + Setup
    const canvas = document.querySelector('#canv');
	const renderer = new THREE.WebGLRenderer({antialias: true, canvas, alpha: true});

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(window.devicePixelRatio);
    
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Make Scene
	function makeScene(elem) {

		// Scene Create
		const scene = new THREE.Scene();
		
		// Camera Create
		const camera = new THREE.PerspectiveCamera(45, 1, 1, 100);
            camera.position.set(3, 3, 3);

		// Setup Controls
        const controls = new OrbitControls(camera, renderer.domElement);
			controls.enableDamping = true;
            controls.enablePan = false;
			controls.enableZoom =false;
            controls.minPolarAngle = 0.5;
            controls.maxPolarAngle = 2;
            controls.autoRotate = true;
            controls.target = new THREE.Vector3(0, 1, 0);
            controls.update();

		return {scene, camera, elem, controls};
	}

    // Setup New Scene
    function setupNewScene(spanId, d3ObjectName) {

        // Setup Scene Object
		const sceneObj = makeScene(document.querySelector(`#s-${spanId}`));

		// Setup SpotLights
        {
            const mainSL = new THREE.SpotLight(0x00FFFFFF, 4000, 100, 0.08, 1);
            mainSL.position.set(-20, 20, -20);
            mainSL.castShadow = true;
            mainSL.shadow.bias = -0.00001;
            sceneObj.scene.add(mainSL);
    
            const balancerSL = new THREE.SpotLight(0x00FFFFFF, 4000, 100, 0.08, 1);
            balancerSL.position.set(20, 20, 20);
            sceneObj.scene.add(balancerSL);
    
            const ambientSL_01 = new THREE.SpotLight(0x00FFCC66, 1500, 100, 0.08, 1);
            ambientSL_01.position.set(20, 20, -20);
            sceneObj.scene.add(ambientSL_01);
    
            const ambientSL_02 = new THREE.SpotLight(0x00FFCC66, 1500, 100, 0.08, 1);
            ambientSL_02.position.set(-20, 20, 20);
            sceneObj.scene.add(ambientSL_02);
        }

        //Load + Setup 3D model:
        {
            const loader = new GLTFLoader().setPath('../media/3d/models/');
            loader.load(
            d3ObjectName,
            (gltf) => {
            const mesh = gltf.scene;
            mesh.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });
            mesh.position.set(0, 0, 0);
            sceneObj.scene.add(mesh);
            }); 
        }
        
		return sceneObj;
	}

	// Create Scene List
	function createSceneList() {
		let list = [];

		if (document.getElementById("main").className === "work") {
			/*
			dataJSON.work_experience.forEach((item, index) => {
				list.push(setupNewScene(index + 1, item.d3_model_name));
			});
			*/
			const viewportCount = parseInt(document.getElementById("SumM").className, 10);
			for (let i = 0; i < viewportCount; i++) {
				list.push(setupNewScene(i + 1, document.querySelector(`#l-${i + 1}`).className));
			}

		} else {
			const viewportCount = parseInt(document.getElementById("SumM").className, 10);
			for (let i = 0; i < viewportCount; i++) {
				list.push(setupNewScene(i + 1, document.querySelector(`#l-${i + 1}`).className));
			}
		}

		return list;
	}

	const sceneObjS = createSceneList();

	// Resize Renderer
	function resizeRendererToDisplaySize(renderer) {

		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
			renderer.setSize(width, height, false);
		}
		return needResize;
	}

	// Rernder Scene + Update Controls
	function renderAndUpdateSceneObj(sceneObj) {

		const {scene, camera, elem, controls} = sceneObj;

		// get the viewport relative position of this element
		const {left, right, top, bottom, width, height} =
        elem.getBoundingClientRect();

		// If offscreen:
		const isOffscreen =
        bottom < 0 ||
        top > renderer.domElement.clientHeight ||
        right < 0 ||
        left > renderer.domElement.clientWidth;
		if (isOffscreen) {return;}

		// Change Camera aspect ratio
		camera.aspect = width / height;
		camera.updateProjectionMatrix();


		const positiveYUpBottom = renderer.domElement.clientHeight - bottom;
		renderer.setScissor(left, positiveYUpBottom, width, height);
		renderer.setViewport(left, positiveYUpBottom, width, height);

		controls.update();
		renderer.render(scene, camera);
	}

	function animate() {
		// Resize Renderer
		resizeRendererToDisplaySize(renderer);

		// Setup Render Blocks
		renderer.setScissorTest(false);
		renderer.clear(true, true);
		renderer.setScissorTest(true);

		// Render Scene + Update Controls
		sceneObjS.forEach(item => {
			renderAndUpdateSceneObj(item);
		});

		requestAnimationFrame(animate);
	}

	requestAnimationFrame(animate);
}

main();
