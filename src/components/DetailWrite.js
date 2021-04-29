import React, {useState} from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/todo";

import TextField from "@material-ui/core/TextField";
import { isMoment } from "moment";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";



const DetailWrite = (props) => {
  const dispatch =useDispatch();
  const todo_list = useSelector((state) => state.todo.todo_list);
  


  const [checkDate, setCheckDate] = React.useState("");
  const [startSleep, setstartSleep] = React.useState("");
  const [endSleep, setendSleep] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [memo, setMemo] = React.useState("");
  const [personName, setPersonName] = React.useState([]);

  const changeDate = (event) => {
    setCheckDate(event.target.value);
  };
  const checkSleep = (event) => {
    setstartSleep(event.target.value);
  };
  const checkoutSleep = (event) => {
    setendSleep(event.target.value);
  };
  const checkCondition = (event) => {
    setCondition(event.target.value);
    console.log(event.target.value);
  };
  const changeMemo = (event) => {
    setMemo(event.target.value);
    console.log(event.target.value);
  };
  const handleChange = (event) => {
    setPersonName(event.target.value);
    console.log(event.target.value);
  };


//태그 관련코드(라이브러리)

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
}));

const classes = useStyles();
const theme = useTheme();
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  "운동","😄","음주","커피","야근","건강식","폭식","명상",];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const addPost = () => {
  let post={
    startSleep: startSleep,
    endSleep: endSleep,
    selectedAt: checkDate,
    tag: personName,
    condition: condition,
    memo: memo, 
  }
  dispatch(postActions.addPostAX(post))
};
  return(
    <React.Fragment>
    <ModalComponent>

    <TopContainer>
    <TextField id="date" type="date" label="날짜" // value={checkDate}
    onChange={changeDate}
    InputLabelProps={{shrink: true,}} defaultValue={isMoment}/>  
    <FixButton  onClick={()=>
    {addPost()}}
      //  props._showModify(false)}
    >완료</FixButton>  
    </TopContainer>
   
    <Container>
    <TextField
      id="time"
      label="취침시간"
      type="time"
      // value={startSleep}
      onChange={checkSleep}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 300, // 5 min
      }}
    />
    <TextField
      id="time"
      label="기상시간"
      type="time"
      // value={endSleep}
      onChange={checkoutSleep}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 300, // 5 min
      }}
    />
    </Container>
    
    <TagContainer>
        <div>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">태그</InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
    </TagContainer>

    <ConditionContainer>
    <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top"
          >
            <FormControlLabel
              value="1"
              control={<Radio color="primary" />}
              label="매우 나쁨"
              labelPlacement="bottom"
              onChange={checkCondition}
            />
            <FormControlLabel
              value="2"
              control={<Radio color="primary" />}
              label="나쁨"
              labelPlacement="bottom"
              onChange={checkCondition}
            />
            <FormControlLabel
              value="3"
              control={<Radio color="primary" />}
              label="보통"
              labelPlacement="bottom"
              onChange={checkCondition}
            />
            <FormControlLabel
              value="4"
              control={<Radio color="primary" />}
              label="좋음"
              labelPlacement="bottom"
              onChange={checkCondition}
            />
            <FormControlLabel
              value="5"
              control={<Radio color="primary" />}
              label="매우 좋음"
              labelPlacement="bottom"
              onChange={checkCondition}
            />
          </RadioGroup>
    </ConditionContainer>
      {/* 컨디션 <ConditionInput  placeholder ={todo_list[0].condition}></ConditionInput>
      <ConditionImg src={"https://cdn.crowdpic.net/list-thumb/thumb_l_17FE5A46A4D396FA6FB0E0DFA0E79376.png"}/>   */}

    <BottomContainer>
    <input
      type="text"
      multiline
      placeholder="메모를 입력하세요"
      onChange={changeMemo}>
    </input>
    </BottomContainer>
  </ModalComponent>
    </React.Fragment>
  )
}



const Container = styled.div`
background-color: grey;
display: flex;
width: 100%;
height: 15%;
margin: 5px 0px 5px 0px;
justify-content: space-between;
`

const FixButton = styled.button`
    width: 10%;
    height: 30px;
    background-color: white;
    border: #FEE500;
    font-weight: bold;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
    margin: 10px 2px 10px 0px;
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
    height: 20%;
    margin-bottom: 5px;
   `

const TagContainer =styled.div`
    
    background-color: grey;
    width: 100%;
    height: 20%;
    display:flex;
    flex-direction: column;
    margin-bottom: 10px;
    justify-content: space-between;
   
   `
const ConditionContainer =styled.div`
    
    background-color: grey;
    width: 100%;
    height: 30%;
    display:flex; 
 `

const BottomContainer =styled.div`
    background-color: grey;
    width: 100%;
    height: 30%;
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-top:10px;
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


  export default DetailWrite;