import React from "react";
import * as THREE from "three";
import "./Font.css";

class Cube extends React.Component {
 
  componentDidMount() {
    const width = 120;
    const height = 120;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    this.element.appendChild(renderer.domElement);

    let loader;
    loader = new THREE.TextureLoader();  
    loader.crossOrigin = '';
    const moonTexture = loader.load( 'https://images.unsplash.com/photo-1607513746994-51f730a44832?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80' );


    const geometry =  new THREE.SphereGeometry( 25, 30, 30 );
    const material = new THREE.MeshBasicMaterial({ map: moonTexture });
    const color = new THREE.Color("#DBDBDB");
    const cube = new THREE.Mesh(geometry, material);
  

    scene.add(cube);

    const colorC = [
      new THREE.MeshBasicMaterial({ color: "#FAFAD2" }),
      new THREE.MeshBasicMaterial({ color: "#FFFF96" }),
      new THREE.MeshBasicMaterial({ color: "#FEF1B2" }),
      new THREE.MeshBasicMaterial({ color: "#FFF978" }),
      new THREE.MeshBasicMaterial({ color: "#FFE65A" }),
      new THREE.MeshBasicMaterial({ color: "#FFEB46" }),
    ];

    var outlineMesh1 = new THREE.Mesh(geometry, colorC);

    cube.add(outlineMesh1);

    scene.background = color;

    camera.position.z = 145;

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
