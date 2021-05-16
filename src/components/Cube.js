import React, { useState, useRef } from 'react';
import * as THREE from 'three';
import styled from "styled-components";
import './Font.css';


const Cube =()=> {
    

  
  React.useEffect(() => {
      animate();
    }, []);
    
  const element= useRef();
  const width = 100
  const height = 100
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 1, 1000);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);

  console.log(element.current);
  element.current.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color:"green"});
  const color = new THREE.Color("rgba(242, 242, 242, 1)")
  const cube = new THREE.Mesh(geometry, material);
 
  scene.add(cube);

  scene.background =color;
  camera.position.z = 4;
 

const animate = () => {
  renderer.render(scene, camera);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  requestAnimationFrame(animate);
}

  return (
    <CubeContainer>
  <div className="Cube" ref={el => element = el}>
  </div>
    </CubeContainer>
  );

}



const CubeContainer = styled.div`
width:10%;
color: blue;


`;
export default Cube;