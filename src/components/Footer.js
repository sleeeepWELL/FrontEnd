import React from "react";
import styled from "styled-components";
import LogoImg from "../images/Logo.png";
import "./Font.css";

const Footer = () => {
  return (
    <>
      <Wrap>
        <Container>
          <Head>
            <Logo />
            &nbsp;&nbsp;
            <Title className="TimeText">TEAM SLEEPWELL</Title>
          </Head>
          <Body>
            <a
              className="Text"
              href="https://www.notion.so/TeamSleepwell-dcb0a3d7c4fc47d781479c33c3929e48"
            >
              팀원 소개
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;
            <a className="Text" href="https://www.instagram.com/teamsleepwell/">
              Instagram
            </a>
          </Body>
        </Container>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  
  bottom:0;
  right: 0;
  display: flex;
  width: 100%;
  height: 120px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #494949;
`;

const Container = styled.div`
  width: 75%;
  height: 80%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  color: white;
  @media (max-width: 481px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;

const Logo = styled.div`
  background-color: white;
  width: 40px;
  height: 40px;
  background: url(${LogoImg});
  background-position-x: center;
  background-position-y: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Head = styled.div`
  display: flex;
  flex-direction: row;
  width: 50%;
  align-items: center;
  @media (max-width: 481px) {
    width: 100%;
  }
`;

const Body = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  & > a {
    text-decoration: none;
    font-size: 14px;
    color: white;
    :hover {
      color: lightgray;
      transition: 0.2s ease;
    }
  }
  @media (max-width: 481px) {
    width: 100%;
    justify-content: flex-start;
    & > a {
      font-size: 12px;
    }
  }
`;

const Title = styled.div`
  display: flex;
  color: white;
`;

export default Footer;
