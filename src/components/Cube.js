import React from 'react';
import * as THREE from 'three';
import styled from "styled-components";

class Cube extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const width = 60
    const height = 60

    const scene = new THREE.Scene(30,50);
    const camera = new THREE.PerspectiveCamera(30, 1, 1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    this.element.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color:"yellow" });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const light = new THREE.HemisphereLight( 0x7e31eb);
    scene.add( light );

    camera.position.z = 4;

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.cube = cube;
    this.animate();
  }

  animate = () => {
    this.renderer.render(this.scene, this.camera);
    this.cube.rotation.x += 0.02;
    this.cube.rotation.y += 0.02;
    requestAnimationFrame(this.animate);
  }

  render() {
    return (
      <CubeContainer>
    <div ref={el => this.element = el}  style={{ width: '10%', height: '100%', border: '1px solid red' }} >
    </div>
      </CubeContainer>
    );
  }
}

const CubeContainer = styled.div`
 width:10%;
 background-color: blue;
 color: blue;
 
  
`;
export default Cube;