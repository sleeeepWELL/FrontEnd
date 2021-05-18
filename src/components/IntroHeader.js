import React from "react";
import styled from "styled-components";
import { history } from "../redux/configureStore";
import "./Font.css";
import Logo from "../images/Logo.png";

const IntroHeader = () => {
  return (
    <React.Fragment>
      <Wrap>
        <FstContainer>
          <LogoImg src={Logo} className="Logo" id="logo" />
        </FstContainer>
        <CategoryContainer />
        <BtnContainer>
          <LogInBox
            className="TimeText"
            onClick={() => {
              history.replace("/login");
            }}
          >
            <span>로그인</span>
          </LogInBox>
          <SignUpBox
            className="TimeText"
            onClick={() => {
              history.replace("/signup");
            }}
          >
            <span>회원가입</span>
          </SignUpBox>
        </BtnContainer>
      </Wrap>
    </React.Fragment>
  );
};

const BtnContainer = styled.div`
  display: flex;
  width: 40%;
  justify-content: flex-end;
`;

const FstContainer = styled.div`
  display: flex;
  width: 15%;
  height: 7vh;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: rgba(219, 219, 219, 1);
  width: 100vw;
  height: 7vh;
  align-items: center;
  border-bottom: 0.8px solid #bebcbc;
  position: fixed;
  box-sizing: border-box;
  top: 0%;
  z-index: 9999;
  border: none;
`;

const LogoImg = styled.img`
  width: 80%;
  height: 7vh;
  display: flex;
  margin: 0px;
  cursor: pointer;
  outline: none;
  border: none;
`;

const LogInBox = styled.div`
  display: flex;
  font-size: 1.3rem;
  margin-right: 1rem;
  justify-content: flex-end;
  cursor: pointer;
  color: black;
  & > span {
    background-color: #4a5666;
    padding: 0.7rem;
    border-radius: 8px;
    color: white;
    box-shadow: rgb(0 0 0 /35%) 0px 3px 5px 0px;
    :hover {
      background-color: white;
      color: #4a5666;
      transition: ease 0.3s;
    }
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    & > span {
      padding: 0.6rem;
    }
  }

  @media (max-width: 540px) {
    font-size: 0.9rem;
    & > span {
      padding: 0.4rem;
    }
  }

  @media (max-width: 414px) {
    font-size: 0.7rem;
    & > span {
      padding: 0.3rem;
    }
  }
  @media (max-width: 360px) {
    font-size: 0.6rem;
    & > span {
      padding: 0.2rem;
    }
  }

  @media (max-width: 320px) {
    font-size: 0.5rem;
    & > span {
      padding: 0.2rem;
    }
  }
`;

const SignUpBox = styled.div`
  display: flex;
  font-size: 1.3rem;
  margin-right: 1rem;
  justify-content: center;
  cursor: pointer;
  color: black;
  & > span {
    background-color: #4a5666;
    padding: 0.7rem;
    border-radius: 8px;
    color: white;
    box-shadow: rgb(0 0 0 /35%) 0px 3px 5px 0px;
    :hover {
      background-color: white;
      color: #4a5666;
      transition: ease 0.3s;
    }
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-right: 0.8rem;
    & > span {
      padding: 0.6rem;
    }
  }

  @media (max-width: 540px) {
    font-size: 0.9rem;
    & > span {
      padding: 0.4rem;
    }
  }

  @media (max-width: 414px) {
    font-size: 0.7rem;
    margin-right: 0.5rem;
    & > span {
      padding: 0.3rem;
    }
  }
  @media (max-width: 360px) {
    font-size: 0.6rem;
    & > span {
      padding: 0.2rem;
    }
  }

  @media (max-width: 320px) {
    font-size: 0.5rem;
    & > span {
      padding: 0.2rem;
    }
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  width: 45%;
  justify-content: space-around;
  font-weight: 600;
`;

export default IntroHeader;
