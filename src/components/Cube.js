import React from "react";
import * as THREE from "three";
import "./Font.css";

class Cube extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const width = 80;
    const height = 80;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    this.element.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "rgb(255,255,204)" });
    const color = new THREE.Color("rgba(219,219,219,1)");
    const cube = new THREE.Mesh(geometry, material);

    scene.add(cube);

    const colorC = [
      new THREE.MeshBasicMaterial({ color: "rgb(255,255,204)" }),
      new THREE.MeshBasicMaterial({ color: "rgb(255,255,102)" }),
      new THREE.MeshBasicMaterial({ color: "rgb(204,204,153)" }),
      new THREE.MeshBasicMaterial({ color: "rgb(255,255,204)" }),
      new THREE.MeshBasicMaterial({ color: "rgb(204,204,102)" }),
      new THREE.MeshBasicMaterial({ color: "rgb(255,255,102)" }),
    ];

    var outlineMesh1 = new THREE.Mesh(geometry, colorC);

    cube.add(outlineMesh1);

    scene.background = color;

    camera.position.z = 4;

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.cube = cube;
    this.animate();
  }

  animate = () => {
    this.renderer.render(this.scene, this.camera);
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    requestAnimationFrame(this.animate);
  };

  render() {
    return (
      <div
        ref={(el) => (this.element = el)}
        style={{ margin: "0% 0% 0% 0%" }}
      />
    );
  }
}

export default Cube;
