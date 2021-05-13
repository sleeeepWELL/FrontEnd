import React from 'react';
import * as THREE from 'three';
import styled from "styled-components";
import './Font.css';


class Cube extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const width = 80
    const height = 80

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    this.element.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color:"yellow"});
    const color = new THREE.Color("rgba(242, 242, 242, 1)")
    const cube = new THREE.Mesh(geometry, material);
   
    scene.add(cube);

   
    camera.position.z = 4;

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.cube = cube;
    this.animate();
    scene.background =color;
    
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
    <div className="Cube" ref={el => this.element = el}>
    </div>
      </CubeContainer>
    );
  }
}


	
const CubeContainer = styled.div`
 width:10%;
 color: blue;
 
  
`;
export default Cube;