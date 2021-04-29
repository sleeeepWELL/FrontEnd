import React, {useEffect}  from 'react';

import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as todoActions } from "../redux/modules/todo";

const DetailEmpty = (props) => {

  const dispatch =useDispatch();
  const day_list = useSelector((state) => state.todo.day_list); 


  return(
    <React.Fragment>
      <ModalComponent>
    
      <ModalHeader>
      <TimeText> {day_list.selectedAt}</TimeText> 
    <RightHeader>
      <FixButton  onClick={()=>{
       props._showEmpty(true)}}>ADD</FixButton> 
    </RightHeader>
      </ModalHeader>

    
    <TopContainer>
    <TimeText>수면시간 아직 기록되어있지 않습니다</TimeText> 
    </TopContainer>
    
    
      
      <TagContainer>
      <TimeText>태그 아직 기록되어 있지 않습니다</TimeText>
      </TagContainer>

      <ConditionContainer>
      <TimeText >컨디션 아직 기록되어 있지 않습니다 </TimeText>
     
      </ConditionContainer>

      <BottomContainer>
      <Contents>아직 기록되어 있지 않습니다</Contents>
      </BottomContainer>
    
       
      
      </ModalComponent>
    </React.Fragment>
  )
}



const ModalHeader = styled.div`
background-color: grey;
display: flex;
justify-content: space-between;
width: 100%;
height: 15%;
margin: 20px 0px 5px 0px;
`

const RightHeader = styled.div`
background-color: black;
width: 10%;
height: 60%;
`

const FixButton = styled.button`
    width: 100%;
    height: 30px;
    background-color: white;
    border: #FEE500;
    font-weight: bold;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    `
const ConditionImg= styled.img`
    width: 10%;
    height:100%;


`

const TopContainer =styled.div`
    background-color: grey;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 10%;
   `

const TimeText=styled.div`
    width: 60%;
    font-size: 15px;
    margin: 5px 0px 0px 10px;
    font-weight: bold;

`
   

const TagContainer =styled.div`
    
    background-color: grey;
    width: 100%;
    height: 10%;
    display:flex;
    flex-direction: column;
   
    justify-content: space-between;
   
   `
const ConditionContainer =styled.div`
    
    background-color: grey;
    width: 100%;
    height: 10%;
    display:flex; 
 `

const BottomContainer =styled.div`
    background-color: grey;
    width: 100%;
    height: 30%;
    display:flex;
    flex-direction: column;
    align-items: center;
    // margin-top:20px;
`

const Contents = styled.div`
    width: 100%;
    height: 55%;
    background-color: white;
    margin-top: 5px;
   
`
// const ReturnButton = styled.button`
//     width: 30%;
//     height: 30px;
//     background-color: white;
//     border: #FEE500;
//     font-weight: bold;
//     border-radius: 5px;
//     outline: none;
//     cursor: pointer;
//     margin-top:10px;
// `


const ModalComponent = styled.div`
  width: 100%;
  height: 30%;

  display:flex;
  flex-direction: column;


`


  export default DetailEmpty;