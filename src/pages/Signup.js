import React from 'react';
import styled from 'styled-components';
// import {useDispatch} from "react-redux";
// import {useState} from 'react';
// import {actionCreators as userActions } from '../redux/modules/user';



//회원가입
const Signup=()=> {

//   const dispatch = useDispatch();

  const [id,setId] = React.useState(null)
  const [password,setPw] = React.useState(null)
  const [passwordc,setPwc] = React.useState(null)
  const [nickname,setName] = React.useState(null)
  const [email,setMail] = React.useState(null)
  
  //표현식 체크함수 
  const idCheck = (id) =>{
    let idReg = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{3,}$/g;  
    return idReg.test(id);
  }
  const pwCheck = (password) => {
    let pwReg = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\W)[a-zA-Z0-9].{4,}$/;
    return pwReg.test(password);
  }
  const nicknameCheck = (nickname) => {
    let nicknameReg = /^[a-zA-Z0-9ㄱ-ㅎ가-힣]{1,9}$/g;
    return nicknameReg.test(nickname);
  }
  const emailCheck = (email) => {
    let emailReg = /^(?=.*[@])(?=.*[.])[a-zA-Z0-9@.]{14,30}$/g;
    return emailReg.test(email);
  }
 
  //표현식 함수사용 및 체크구문
  const signup=()=>{
    if(id===""||password===""||nickname===""||email===""){
      window.alert("모든 항목을 입력해주세요!")
      return;
    }
    if (password!== passwordc) {
      window.alert("비밀번호 설정을 다시 확인하세요!");
      return;
    }
    if(!idCheck(id)){
      window.alert('아이디는 3자리 이상이며, 영문(대/소문자)과 숫자로 구성해야합니다😅');
      return;
    }
    if(!pwCheck(password)){
      window.alert('비밀번호는 4자리 이상이며,  영문(대/소문자)와 숫자와 특수문자로 구성해야합니다😅');
      return;
    }
    if(!nicknameCheck(nickname)){
      window.alert('닉네임은 1자리 이상 10자리 미만입니다😅');
      return;
    }
    if(!emailCheck(email)){
      window.alert('이메일은 14자리 이상 30자리 이하며,  형식을 지켜주세요😅');
      return;
    }
    if(password.search(id)>-1){
      window.alert("비밀번호에 아이디가 포함되었습니다😅")
      return;
    }
    if(password.search(/\s/) != -1){
      window.alert("비밀번호에 공백이 포함되었습니다😅");
      return;
    }
    if(nickname.search(/\s/) != -1){
      window.alert("닉네임에 공백이 포함되었습니다😅");
      return;
    }
    // dispatch(userActions.signupSV(id,password,nickname,email))
  }

  return(
    <React.Fragment>
      <SignupBackground>
      <SignupContainer>
        <Title>SLEEP WELL</Title>
        <p><PwBox onChange={(e)=>{setMail(e.target.value)}} placeholder="이메일을 입력해주세요"/></p>
        <p><IdBox onChange={(e)=>{setId(e.target.value)}} placeholder="아이디를 입력해주세요"/> <CheckButton>중복체크</CheckButton></p>
        <p><PwBox onChange={(e)=>{setPw(e.target.value)}} placeholder="비밀번호를 입력해주세요" type="password" /></p>
        <p><PwBox onChange={(e)=>{setPwc(e.target.value)}} placeholder="비밀번호를 재입력해주세요" type="password" /></p>
        <SignupButton onClick={()=>{signup()}}>SIGN UP</SignupButton>
        <SignupButton onClick={()=>{signup()}}>CANCLE</SignupButton>
        <p><SignupText ><p>이미 회원이신가요?</p> 로그인 하러가기</SignupText></p>
      </SignupContainer>
      </SignupBackground>
    </React.Fragment>
  )

}


const SignupBackground = styled.div`
position: absolute;
top:0;
left:0;
background-image: url("https://images.unsplash.com/photo-1488866022504-f2584929ca5f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1343&q=80");
width:100vw;
height: 100vh;
background-size: cover;

`


const SignupContainer = styled.div`
margin: 120px auto;
width: 40%;
height: 70%;
background-color: white;
border-radius: 20px;  
text-align: center;
padding-top: 50px;

`
const Title = styled.div`
width:50%;
font-weight: bold;
font-size: 32px;
color: #121212;
margin: auto;


`
const IdBox = styled.input`
margin:auto;
width: 35%;
height: 20px;
background-color: white;
margin-top: 50px;
border-top: none;
border-right: none;
border-left: none;
border-bottom: 1px solid grey;
border-radius: 1px;
outline: none;
font-size: 15px;
font-weight: bold;
&:hover{
  border-bottom: 1.5px solid black;
};
color: black;
@media (max-width: 975px){
  width: 90%;
}
`

const PwBox = styled.input`
    margin:auto;
    width: 350px;
    height: 20px;
    background-color: white;
    margin-top: 30px;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid grey;
    border-radius: 1px;
    outline: none;
    font-size: 15px;
    font-weight: bold;
    &:hover{
    border-bottom: 1.5px solid black;
    };
    color: black;
    @media (max-width: 975px){
    width: 90%;
    }
`

const SignupButton = styled.button`
    width: 150px;
    height: 30px;
    background-color: grey;
    border: #FEE500;
    font-weight: bold;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    margin: 30px 20px 0px 20px;

    `

    const CheckButton = styled.button`
    width: 10%;
    height: 30px;
    background-color: grey;
    border: #FEE500;
    font-weight: bold;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    margin-left: 30px;

    `

    
const SignupText = styled.button`
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
  color: black;
  border: none;
  outline: none;
  background-color: white;
  cursor: pointer;
  @media (max-width: 975px){
      width: 90%;
  }
`
export default Signup;
