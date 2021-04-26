import React from 'react';
import styled from 'styled-components';
// import {useDispatch} from "react-redux";
// import {actionCreators as userActions } from '../redux/modules/user';
// import {history} from "../redux/configureStore";



//로그인 
const Login =(props)=> {

//   const dispatch = useDispatch();
  const [id,setId] = React.useState(null)
  const [password,setPw] = React.useState(null)


  const login = ()=> {
    if(id===""||password===""){
      window.alert("아이디 혹은 비밀번호를 입력해주세요!")
      return;
    }
    // dispatch(userActions.loginSV(id,password));
  }

//   onClick={()=>{history.push("/signup")}}
  return(
    <React.Fragment>
      <LoginBackground>
      <LoginContainer>
     
        <Title>SLEEP WELL</Title>
        <p><IdBox onChange={(e)=>{setId(e.target.value)}} placeholder="아이디를 입력해주세요"/></p>
        <p><PwBox onChange={(e)=>{setPw(e.target.value)}} placeholder="비밀번호를 입력해주세요" type="password"/></p>
       
        <LoginButton onClick={()=>{login()}}>로그인</LoginButton>
        <SLoginButton onClick={()=>{login()}}>카카오톡으로 로그인</SLoginButton>

        <p><SignupText ><p>아직 회원가입을 하지 않으셨나요?</p> 회원가입 하러가기</SignupText></p>
    
      </LoginContainer>
      </LoginBackground>
    </React.Fragment>
  )

}

const LoginBackground = styled.div`
position: absolute;
top:0;
left:0;
background-image: url("https://images.unsplash.com/photo-1488866022504-f2584929ca5f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1343&q=80");
width:100vw;
height: 100vh;
background-size: cover;

`

const LoginContainer = styled.div`
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
    width: 350px;
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
const SignupText = styled.button`
  font-size: 12px;
  text-align: center;
  margin-top: 40px;
  color: black;
  border: none;
  outline: none;
  background-color: white;
  cursor: pointer;
  @media (max-width: 975px){
      width: 90%;
  }
`
const LoginButton = styled.button`
    width: 360px;
    height: 30px;
    background-color: white;
    margin-top: 10px;
    border: #FEE500;
    font-weight: bold;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    
    
`

const SLoginButton = styled.button`
    width: 360px;
    height: 30px;
    background-color: #FFD700;
    margin-top: 10px;
    border: #FEE500;
    font-weight: bold;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    
    
`


export default Login;
