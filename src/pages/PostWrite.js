import React, { useState } from "react";
import styled from "styled-components";
import { Button, Text } from "../elements/Styles";
import DatePicker from "react-datepicker";
import TextField from "@material-ui/core/TextField";
import { isMoment } from "moment";

import { actionCreators as postActions } from "../redux/modules/todo";
import { useDispatch, useSelector } from "react-redux";
import Input from "@material-ui/core/Input";

//태그 선택
import beer from "../image/beer.jpg";
import overeat from "../image/overeat.jpg";
import work from "../image/work.jpg";
import workout from "../image/workout.jpg";

import beer_gray from "../image/beer_gray.jpg";
import overeat_gray from "../image/overeat_gray.jpg";
import work_gray from "../image/work_gray.jpg";
import workout_gray from "../image/workout_gray.jpg";

//컨디션 체크
import bad from "../image/bad-condition.jpg";
import good from "../image/good-condition.jpg";
import soso from "../image/soso-condition.jpg";

import bad_gray from "../image/bad-gray.jpg";
import good_gray from "../image/good-gray.jpg";
import soso_gray from "../image/soso-gray.jpg";

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
  // const useStyles = makeStyles((theme) => ({
  //   formControl: {
  //     margin: theme.spacing(1),
  //     minWidth: 120,
  //     maxWidth: 300,
  //   },
  //   chips: {
  //     display: "flex",
  //     flexWrap: "wrap",
  //   },
  //   chip: {
  //     margin: 2,
  //   },
  // }));

  // const ITEM_HEIGHT = 48;
  // const ITEM_PADDING_TOP = 8;
  // const MenuProps = {
  //   PaperProps: {
  //     style: {
  //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  //       width: 250,
  //     },
  //   },
  // };

  // const names = [
  //   "운동",
  //   "😄",
  //   "음주",
  //   "커피",
  //   "야근",
  //   "건강식",
  //   "폭식",
  //   "명상",
  // ];

  // function getStyles(name, personName, theme) {
  //   return {
  //     fontWeight:
  //       personName.indexOf(name) === -1
  //         ? theme.typography.fontWeightRegular
  //         : theme.typography.fontWeightMedium,
  //   };
  // }

  // const classes = useStyles();
  // const theme = useTheme();

  const [tags1, setTags1] = React.useState("");
  const [tags2, setTags2] = React.useState("");
  const [tags3, setTags3] = React.useState("");
  const [tags4, setTags4] = React.useState("");

  const [checkbeer, setCheckBeer] = React.useState(false);
  const [checkovereat, setCheckOvereat] = React.useState(false);
  const [checkwork, setCheckWork] = React.useState(false);
  const [checkworkout, setCheckWorkOut] = React.useState(false);

  const beer_icon = checkbeer ? beer : beer_gray;
  const overeat_icon = checkovereat ? overeat : overeat_gray;
  const work_icon = checkwork ? work : work_gray;
  const workout_icon = checkworkout ? workout : workout_gray;

  const TotalTags = [];

  // const chooseTags = (e) => {
  //   TotalTags.push(tags);
  // };
  // console.log(TotalTags);
  if (tags1) {
    TotalTags.push(tags1);
  }
  if (tags2) {
    TotalTags.push(tags2);
  }
  if (tags3) {
    TotalTags.push(tags3);
  }
  if (tags4) {
    TotalTags.push(tags4);
  }
  console.log(TotalTags);
  // 컨디션 체크

  const [condition, setCondition] = React.useState("");
  const [checkgood, setCheckGood] = React.useState(false);
  const [checksoso, setCheckSoso] = React.useState(false);
  const [checkbad, setCheckBad] = React.useState(false);

  const good_icon = checkgood ? good : good_gray;
  const soso_icon = checksoso ? soso : soso_gray;
  const bad_icon = checkbad ? bad : bad_gray;

  //메모
  const [memo, setMemo] = React.useState("");

  const changeMemo = (event) => {
    setMemo(event.target.value);
    console.log(event.target.value);
  };

  const addPost = () => {
    let post = {
      selectedAt: checkDate,
      startSleep: startSleep,
      endSleep: endSleep,
      tag: TotalTags,
      condition: condition,
      memo: memo,
    };
    dispatch(postActions.addPostAX(post));
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
          <TotalImgGrid>
            <ImgGrid>
              <input
                width="40"
                height="40"
                type="image"
                src={good_icon}
                alt="컨디션 good"
                value={1}
                onClick={(e) => {
                  setCondition(e.target.value);
                  console.log(e.target.value);
                  checkgood ? setCheckGood(false) : setCheckGood(true);
                }}
              />
            </ImgGrid>
            <ImgGrid>
              <input
                width="40"
                height="40"
                type="image"
                src={soso_icon}
                alt="컨디션 soso"
                value={2}
                onClick={(e) => {
                  setCondition(e.target.value);
                  console.log(e.target.value);
                  checksoso ? setCheckSoso(false) : setCheckSoso(true);
                }}
              />
            </ImgGrid>
            <ImgGrid>
              <input
                width="40"
                height="40"
                type="image"
                src={bad_icon}
                alt="컨디션 bad"
                value={3}
                onClick={(e) => {
                  setCondition(e.target.value);
                  console.log(e.target.value);
                  checkbad ? setCheckBad(false) : setCheckBad(true);
                }}
              />
            </ImgGrid>
          </TotalImgGrid>
        </SettingContainer>
        <TotalImgGrid>
          <ImgGrid>
            <input
              width="40"
              height="40"
              type="image"
              src={beer_icon}
              alt="beer"
              value={"음주"}
              onClick={(e) => {
                setTags1(e.target.value);

                if (!checkbeer) {
                  setTags1(e.target.value);
                }
                if (checkbeer) {
                  setTags1(null);
                }

                console.log(e.target.value);
                checkbeer ? setCheckBeer(false) : setCheckBeer(true);
              }}
            />
          </ImgGrid>
          <ImgGrid>
            <input
              width="40"
              height="40"
              type="image"
              src={overeat_icon}
              alt="overeat"
              value={"야식"}
              onClick={(e) => {
                setTags2(e.target.value);

                if (!checkovereat) {
                  setTags2(e.target.value);
                }
                if (checkovereat) {
                  setTags2(null);
                }

                console.log(e.target.value);
                checkovereat ? setCheckOvereat(false) : setCheckOvereat(true);
              }}
            />
          </ImgGrid>
          <ImgGrid>
            <input
              width="40"
              height="40"
              type="image"
              src={work_icon}
              alt="work"
              value={"야근"}
              onClick={(e) => {
                setTags3(e.target.value);

                if (!checkwork) {
                  setTags3(e.target.value);
                }
                if (checkwork) {
                  setTags3(null);
                }

                console.log(e.target.value);
                checkwork ? setCheckWork(false) : setCheckWork(true);
              }}
            />
          </ImgGrid>
          <ImgGrid>
            <input
              width="40"
              height="40"
              type="image"
              src={workout_icon}
              alt="workout"
              value={"운동"}
              onClick={(e) => {
                setTags4(e.target.value);

                if (!checkworkout) {
                  setTags4(e.target.value);
                }
                if (checkworkout) {
                  setTags4(null);
                }

                console.log(e.target.value);
                checkworkout ? setCheckWorkOut(false) : setCheckWorkOut(true);
              }}
            />
          </ImgGrid>
          {/* <div>
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
          </div> */}
        </TotalImgGrid>
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
            <Button onClick={addPost}>OK</Button>
          </BtnContainer>
        </InnerGrid>
      </Wrap>
    </React.Fragment>
  );
};

const ImgGrid = styled.div`
  display: flex;
  /* background-color: blue; */
  padding: 10px;
`;

const TotalImgGrid = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px;
  justify-content: space-evenly;
  background-color: white;
`;

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

// const TagContainer = styled.div`
//   width: 100%;
//   height: 5rem;
//   margin: 20px;
//   flex-direction: row;
//   justify-content: space-evenly;
//   background-color: white;
// `;

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
