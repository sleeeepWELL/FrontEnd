import React, { useEffect } from "react";
import {Text } from "../elements/Styles";
import moment from "moment";

import { useSelector, useDispatch } from "react-redux";
import { changeToday } from "../redux/modules/todo";
import styled from "styled-components";

const KyuCalendar = (props) => {
  const dispatch = useDispatch();

  const { _changeMonth, show_completed, _showPopup, _setSeletedTodo } = props;

  const today = useSelector((state) => state.todo.today);
  const todo_list = useSelector((state) => state.todo.todo_list);

  const start_week = moment(today).startOf("month").week(); // 오늘!에 해당하는 달의 시작 의 주
  const end_week = moment(today).endOf("month").week();     // 오늘!에 해당하는 달의 마지막 의 주 
  
  const week_num =
    (start_week > end_week ? 53 - start_week : end_week - start_week) + 1; //해가 넘어가는 것 & 몇주인지 고려합니다
  const _week_arr = Array.from({ length: week_num }, (v, i) => start_week + i); //몇 주인지를 가지고 배열을 생성합니다   
  const week_arr = _week_arr.map((week_index) => {     //해당 주마다 map을 돌려서 그 안에 7일을 넣어줍니다
    
    return (
      <WeekContainer
        key={`${moment(today).format("MM")}_week_${week_index}`}>
        {Array.from({ length: 7 }, (v, i) => i).map((day_index) => {
          let _day = today
            .clone()
            .startOf("year")
            .week(week_index)
            .startOf("week")
            .add(day_index, "day");

          const is_today =
            moment().format("YYYY-MM-DD") === _day.format("YYYY-MM-DD");
          // console.log(_day.format("YYYY-MM-DD"))
          // console.log(todo_list)


     
          // 해당하는 날짜배열을 반환한다
         const _list = todo_list.filter((item,idx)=>{
           if(item.createdAt==_day.format("YYYY-MM-DD"))
            return (item.createdAt)
          })

    
         
          // // todo_list에 값이 _day에서 뽑아낸 값들이 없다면 -1 
          // const list_index = Object.keys(todo_list).indexOf(_day.format("YYYY-MM-DD"));
          // console.log(list_index)
          // console.log(list_index) //-1(4) 0 -1(19) 1 -1(10)
          // console.log(todo_list[_day.format("YYYY-MM-DD")]); //없으면 undefined 있으면 해당 배열이 나온다
          // const _list = list_index !== -1 ? todo_list[_day.format("YYYY-MM-DD")] : []; //일정이 있는 날이라면 넣어주고 아니면 빈값을 준다

          // console.log(_list)
          const list = _list.map((_l, idx) => {
            // console.log(_l.datetime.split("-")[1]); // 값이 있는 애들만 골라진다
            // 일정이 있는 날의 월과 오늘의 월이 같은 경우에만 컨텐츠표시!
            return (
              <div key={`${_l.id}_${_l.createdAt}`}
                onClick={() => { console.log("here");
                  props._showPopup(true);
                  props._setSeletedTodo(_l);}}
                >
                  {_l.createdAt.split("-")[1]===moment(today).format("MM") ?
                <Text>{_l.memo}</Text>:""}
              </div>
            );
          });
        
          //7일에 대한 return //둘다 일치할때만 보여준다 그렇지 않으면 null값이 있어서 오류가 난다 차이가 있나...?!
          //오늘 날짜의 월과 _day의 월이 일치 && 오늘인 경우에만 바탕으로 표시!
          return (
            <DayBox key={`${moment(today).format("MM")}_week_${week_index}_day_${day_index}`} 
            bg={is_today && (moment(today).format("MM")=== _day.format("MM"))? "grey" : "#ffffff"}>
              {_day.format("MM") === moment(today).format("MM") && (
                <DayText font_c={is_today ? "white" : "black"}>{_day.format("DD")}</DayText>)}
              <Imo>
              {_list && list} 
              </Imo>
            </DayBox>
            );
          })}
    </WeekContainer>
    );
  });

  
  const dow = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((_d) => {
    return (
      <Dow key={`${moment(today).format("MM")}_week_${_d}`}>
        <DowText>{_d}</DowText>
      </Dow>
      );
    });

    //가장 마지막 return
    return (
      <CalendarContainer>
        
        <CalendarHeader>
          <MoveButton onClick={() => {
              dispatch(changeToday(moment(today).clone().subtract(1, "month")));}}
              >{parseInt(moment(today).format("M"))-1===0?12:parseInt(moment(today).format("M"))-1}월</MoveButton>
          
          {/* MM형식과 M형식의 차이 */}
          <Text type="title">{moment(today).format("M")}월</Text>
         
          <MoveButton
            onClick={() => {
              dispatch(changeToday(moment(today).clone().add(1, "month")));}}
          >{parseInt(moment(today).format("M"))+1===13?1:parseInt(moment(today).format("M"))+1}월</MoveButton>
        </CalendarHeader>

        <Dow1>{dow}</Dow1>
        {week_arr}
      </CalendarContainer>
  );
  
};



const CalendarContainer = styled.div`
  display : flex;
  flex-direction : column;
  width: 100%;
  height: 90%;
  margin : 5px auto;
  padding-bottom: 10px;
  border: 2px solid black;
`

const CalendarHeader = styled.div`
  box-sizing: border-box; 
  display: flex;
  justify-content: space-between;
  background-color: grey;
  align-items: center;
  width:100%;
  height:80%;
`
const WeekContainer = styled.div`
  box-sizing: border-box; 
  display: flex;
  flex-direction: row;
  // 너비와 길이
  width: 100%;
  height: 100%;
  margin: 4px auto;
`

const DayBox = styled.div`
display : flex;
flex-direction : column;
margin: 2px 2px;
border: 2px solid black;
border-radius: 10px;
//map을 돌렸기때문에 하나를 100%로 설정하면 자동으로 맞춰진다
width: 100%;
height:100%;
background-color: ${(props) => props.bg};

`
const DayText  =styled.div`
font-size: 13px;
font-weight: bold;
margin: 3px 0px 0px 3px;
color: ${(props) => props.font_c};
`



const Imo = styled.div`
display:flex; 
flex-direction:row; 
flex-flow: wrap;

`;

const Dow1= styled.div`
//원래는 한줄을 다 먹는데 한줄에 나눠들어가게 한다 
display:flex; 
`;

const Dow =styled.div`
display: flex;
margin : 4px 2px;
width : 100%;
border-radius: 10px;
background-color: #121212;
height :80%; 
// 가운데 정렬을 하려면
flex-direction: column;
text-align: center;

`
const DowText =styled.div`
color: white;
font-size: 13px;
font-weight: bold;
`
const MoveButton =styled. div`
background-color: #121212;
color: white;
font-size: 15px;
font-weight: bold;
width: 80px;
height: 30px;
padding-top:5px;
margin: 0px 30px 0px 30px;
border-radius: 12px;
text-align: center;
`

// 기본적으로 꼭 필요한 props를 미리 정해줍시다!
// KyuCalendar.defaultProps = {
//   _showPopup: () => {},
//   _setSeletedTodo: () => {},
// };

export default KyuCalendar;
