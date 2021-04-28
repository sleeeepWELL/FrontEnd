import React, {useState} from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const DetailPost = (props) => {
const todo_list = useSelector((state) => state.todo.todo_list);
const day_list = useSelector((state) => state.todo.day_list);
console.log(day_list)
//   const dispatch =useDispatch();
 
  
 // 해당날짜를 보내주면 서버에서 그에 해당하는 정보를 가져온다 
  return(
    <React.Fragment>

      <ModalComponent>
    
      <ModalHeader>
      <TimeText> {day_list.createdAt}</TimeText> 
    <RightHeader>
      <FixButton  onClick={()=>{
       props._showModify(true)}}>MODIFY</FixButton>
    </RightHeader>
      </ModalHeader>

    
    <TopContainer>
    <TimeText>수면시간 {day_list.totalSleep}H ({day_list.startSleep} ~ {day_list.endSleep})</TimeText> 
    </TopContainer>
    
    
      
      <TagContainer>
      <TimeText>태그 {day_list.tag}</TimeText>
      </TagContainer>

      <ConditionContainer>
      <TimeText style={{width:"7%"}}>컨디션 {day_list.condition}</TimeText>
      <ConditionImg src={"https://cdn.crowdpic.net/list-thumb/thumb_l_17FE5A46A4D396FA6FB0E0DFA0E79376.png"}/>    
      </ConditionContainer>

      <BottomContainer>
      <Contents>{day_list.memo}</Contents>
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


  export default DetailPost;