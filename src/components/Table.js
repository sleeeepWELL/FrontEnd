import React from "react";
import styled, { keyframes } from 'styled-components';

const Table = (props) => {
 
    console.log(props)
    const wsleep_av= props.table.week_sleepaverage;
    const wwake_av= props.table.week_wakeaverage;
    const sleeptime_av= props.table.week_stimeaverage;
    const result_time= props.table.good_stime;
    
    
 return (
    <React.Fragment>  
    <CContainer>
   
   
   <BoxContainer>
   {wsleep_av[0]>11?
   <Box1>
     <Text>Weekly Sleep Time Average</Text> 
     <Text>PM {wsleep_av[0]-12}H {wsleep_av[1]}M</Text>
      </Box1>:
    <Box1> <Text>Weekly Sleep Time Average</Text> 
    <Text>  AM {wsleep_av[0]}H{wsleep_av[1]}M</Text>  
    </Box1>}

    {wwake_av[0]>11? <Box2><Text> Weekly Wake Time Average</Text> 
      <Text>   PM {wwake_av[0]-12}H {wwake_av[1]}M</Text>  </Box2>:
    <Box2><Text> Weekly Wake Time Average</Text> 
    <Text> AM {wwake_av[0]}H {wwake_av[1]}M</Text>  </Box2>}
   
   
    <Box3><Text>  Weekly Sleep Time Average</Text>  <Text> {sleeptime_av[0]}H {sleeptime_av[1]}M</Text> </Box3>
    <Box4><Text> 당신의 적정 수면시간</Text> <Text>  {result_time[0]}H {result_time[1]}M</Text>  </Box4>
   </BoxContainer>
   
    
   
    </CContainer>
    </React.Fragment>
  );
};

const CContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: white;
  margin: auto;
`;

const Text = styled.div`
 width:100%;
 height: 20%;
 
 margin-top: 25px;
 padding-top: 3px;
 font-weight: bold;
`
const boxFade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
 ` 

 
const Box1 = styled.div`
  width: 45%;
  height:200px; 
  border: 5px white solid;
  border-radius: 15px;
  margin: 10px 5px 10px 5px;
  text-align: center;
  align-items: center;
  animation: ${boxFade} 2s;
`

const Box2 = styled.div`
  width: 45%;
  height:200px; 
  border: 5px white solid;
  border-radius: 15px;
  margin: 10px 5px 10px 5px;
  text-align: center;
  align-items: center;
  animation: ${boxFade} 5s alternate;
`

const Box3 = styled.div`
  width: 45%;
  height:200px; 
  border: 5px white solid;
  border-radius: 15px;
  margin: 10px 5px 10px 5px;
  text-align: center;
  align-items: center;
  animation: ${boxFade} 8s alternate;
`

const Box4 = styled.div`
  width: 45%;
  height:200px; 
  border: 5px white solid;
  border-radius: 15px;
  margin: 10px 5px 10px 5px;
  text-align: center;
  align-items: center;
  animation: ${boxFade} 11s alternate;
`

const BoxContainer = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  flex-wrap: wrap;
 
  

  
`;

export default Table;
