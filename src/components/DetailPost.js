import React, {useState} from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

const DetailPost = (props) => {
const todo_list = useSelector((state) => state.todo.todo_list);
//   const dispatch =useDispatch();
 
  
  //현재 user정보와 url뒤에 붙는 id값이 일치할 때 수정/삭제가 가능합니다(삼항연산자)
  return(
    <React.Fragment>

      <ModalComponent>
    
      <ModalHeader>
      <TimeText> {todo_list[0].createdAt}</TimeText> 
    <RightHeader>
      <FixButton>MODIFY</FixButton>
    </RightHeader>
      </ModalHeader>

    
    <TopContainer>
    <TimeText>수면시간 {todo_list[0].totalSleep}H ({todo_list[0].startSleep} ~ {todo_list[0].endSleep})</TimeText> 
    </TopContainer>
    
    
      
      <TagContainer>
      <TimeText>태그 {todo_list[0].tag[0]}</TimeText>
      </TagContainer>

      <ConditionContainer>
      <TimeText style={{width:"7%"}}>컨디션 {todo_list[0].condition}</TimeText>
      <ConditionImg src={"https://cdn.crowdpic.net/list-thumb/thumb_l_17FE5A46A4D396FA6FB0E0DFA0E79376.png"}/>    
      </ConditionContainer>

      <BottomContainer>
      <Contents>{todo_list[0].memo}</Contents>
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
    width: 15%;
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