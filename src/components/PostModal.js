import React, {useState} from 'react';
import styled from "styled-components";
// import PostUpdateModal from './PostUpdateModal';
import CloseIcon from '@material-ui/icons/Close';


const PostModal = (props) => {
  
//   const dispatch =useDispatch();
  const [ is_modal, setModal ] = useState(false)
  const [ is_writeModal, setWriteModal ] = useState(false)


  const closeModal = () => {
    setModal(false)
  }
  const openWriteModal = () => {
    setWriteModal(true)
  }
//   const closeWriteModal = () => {
//     setWriteModal(false)
//   }

  
//   React.useEffect(() => {
  
//   }, [])

  
  //현재 user정보와 url뒤에 붙는 id값이 일치할 때 수정/삭제가 가능합니다(삼항연산자)
  return(
    <React.Fragment>
      <Component onClick={props.close}/>
      <ExitContainer>
        <ExitBtn onClick={props.close}>
          <CloseIcon fontSize="large" />
        </ExitBtn>
      </ExitContainer>
      <ModalComponent>
    
      <ModalHeader>
      <TimeText> 0월 0일 0요일</TimeText> 
    <RightHeader>
      <FixButton>수정</FixButton>
      <FixButton>삭제</FixButton>
    </RightHeader>
      </ModalHeader>

    
    <TopContainer>
    <TimeText>4H (01:00 ~ 05:00)</TimeText> 
        <ConditionImg src={"https://cdn.crowdpic.net/list-thumb/thumb_l_17FE5A46A4D396FA6FB0E0DFA0E79376.png"}/>    
    </TopContainer>
    
    
      
      <TagContainer>
       태그 들어가는 곳
      </TagContainer>
      
      <BottomContainer>
      <Contents>내용</Contents>
      <ReturnButton>돌아가기</ReturnButton>
      </BottomContainer>
    
       
      
      </ModalComponent>

      {/* {is_modal? <PostUpdateModal boardId={props.id} markerId={props.markerId} nickname = {props.nickname} close={closeModal} open={openWriteModal} />
      :null} */}
      {/* {is_writeModal? <PostWrite _id={props._id} close={closeWriteModal} {...props} />
      :null} */}
    </React.Fragment>
  )
}



const Component = styled.div`
  position: fixed;
  top: 0;
  left:0;
  opacity: 0.6;
  height: 1000vh;
  width: 1000vw;
  background-color: black;
  z-index: 10;
  
`
const ModalHeader = styled.div`
background-color: grey;
display: flex;
justify-content: space-between;
width: 80%;
height: 10%;
margin: 20px 0px 20px 0px;
`

const RightHeader = styled.div`
background-color: black;
width: 20%;
height: 60%;
margin: 0px 0px 20px 0px;
`

const ExitContainer = styled.div`
  z-index: 20;
  position: fixed;
  top: 0;
  right: 0;
  padding: 12px;  
`
const ExitBtn = styled.button`
  cursor: pointer;
  color: white;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 14px;
`
const FixButton = styled.button`
    width: 40%;
    height: 30px;
    background-color: grey;
    border: #FEE500;
    font-weight: bold;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    margin: 0px 7px 0px 7px;
    `
const ConditionImg= styled.img`
    width: 10%;
    height:100%;


`

const TopContainer =styled.div`
    background-color: grey;
    display: flex;
    justify-content: space-between;
    width: 80%;
    height: 10%;
    margin: 20px 0px 20px 0px;
   `

const TimeText=styled.div`
    width: 60%;
    font-size: 30px;
    margin: 10px 0px 0px 20px;

`
   

const TagContainer =styled.div`
    
    background-color: grey;
    width: 80%;
    height: 10%;
    display:flex;
    flex-direction: column;
    align-items: center;
   `

const BottomContainer =styled.div`
    background-color: grey;
    width: 80%;
    height: 30%;
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-top:20px;
`

const Contents = styled.div`
    width: 90%;
    height: 55%;
    background-color: white;
    margin-top: 30px;
   
`
const ReturnButton = styled.button`
    width: 30%;
    height: 30px;
    background-color: white;
    border: #FEE500;
    font-weight: bold;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    margin-top:10px;
`


// const DeleteBtn = styled.button`
//   height: 12px;
//   width: 12px;
//   cursor: pointer;
//   background-color: transparent;
//   border: none;
//   outline: none;
//   margin-right: 15px;
//   opacity: 0.3;
//   &:hover {
//     opacity: 1;
//   }
// `




const ModalComponent = styled.div`
  position: fixed;
  width: 915px;
  height: 600px;
  top:50%;
  left: 50%;
  transform: translate(-49%, -50%);
  background-color: white;
  z-index: 20;
  display:flex;
  flex-direction: column;
  @media (max-width: 950px){
    width:350px;
  }
  @media (max-width: 350px){
    width: 100%
  }
  align-items: center;
`


  export default PostModal;