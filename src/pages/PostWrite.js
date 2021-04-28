import React, { useState } from "react";
import styled from "styled-components";
import { Button, Text } from "../elements/Styles";
import DatePicker from "react-datepicker";
import TextField from "@material-ui/core/TextField";
import { isMoment } from "moment";

import { actionCreators as postActions } from "../redux/modules/todo";
import { useDispatch, useSelector } from "react-redux";
//태그 선택
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

//컨디션 체크
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const PostWrite = (props) => {
  const dispatch = useDispatch();
  //날짜 선택
  const [checkDate, setCheckDate] = React.useState("");

  const changeDate = (event) => {
    setCheckDate(event.target.value);
    console.log(event.target.value);
  };

  //취침 시간
  const [startSleep, setstartSleep] = React.useState("");

  const checkSleep = (event) => {
    setstartSleep(event.target.value);
    console.log(event.target.value);
  };

  //기상 시간
  const [endSleep, setendSleep] = React.useState("");

  const checkoutSleep = (event) => {
    setendSleep(event.target.value);
    console.log(event.target.value);
  };

  //태그 선택
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
    "운동",
    "😄",
    "음주",
    "커피",
    "야근",
    "건강식",
    "폭식",
    "명상",
  ];

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const classes = useStyles();
  const theme = useTheme();

  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
    console.log(event.target.value);
  };

  //컨디션 체크

  const [condition, setCondition] = React.useState("");

  const checkCondition = (event) => {
    setCondition(event.target.value);
    console.log(event.target.value);
  };

  //메모
  const [memo, setMemo] = React.useState("");

  const changeMemo = (event) => {
    setMemo(event.target.value);
    console.log(event.target.value);
  };

  const uploadPost = () => {
    dispatch(
      postActions.addTodoSV(
        checkDate,
        startSleep,
        endSleep,
        personName,
        condition,
        memo
      )
    );
  };

  return (
    <React.Fragment>
      <Wrap>
        <SettingContainer>
          <InnerGrid>
            <TextField
              id="date"
              type="date"
              label="날짜"
              // value={checkDate}
              onChange={changeDate}
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={isMoment}
            />
          </InnerGrid>
          <InnerGrid>
            <TimeGrid>
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
            </TimeGrid>
          </InnerGrid>
          <InnerGrid>
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
          </InnerGrid>
        </SettingContainer>
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
        <InnerGrid>
          <MemoContainer>
            <Input
              type="text"
              multiline
              placeholder="메모를 입력하세요"
              onChange={changeMemo}
            >
              메모
            </Input>
          </MemoContainer>
          <BtnContainer>
            <Button onClick={uploadPost}>OK</Button>
          </BtnContainer>
        </InnerGrid>
      </Wrap>
    </React.Fragment>
  );
};

const InnerGrid = styled.div`
  flex-wrap: wrap;
  align-content: space-evenly;
  margin: 20px;
  background-color: white;
  padding: 10px;
`;

const TimeGrid = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 20px 0px 0px;
  justify-content: space-evenly;
  background-color: white;
  padding: 10px;
`;

const Wrap = styled.div`
  width: 40rem;
  height: 45rem;
  background-color: #c6c4c4;
  margin: auto;
`;

const SettingContainer = styled.div`
  width: 100%;
  height: 15rem;
`;

const TagContainer = styled.div`
  width: 100%;
  height: 5rem;
  margin: 20px;
`;

const MemoContainer = styled.div`
  width: 100%;
  height: 10rem;
  background-color: white;
`;

const BtnContainer = styled.div`
  width: 100%;
  height: 5rem;
`;

export default PostWrite;
