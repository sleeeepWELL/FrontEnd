// import React from "react";
// import { Grid, Button, Text } from "../elements/Styles";
// import moment from "moment";

// // 임포트 해오기!
// import { useSelector, useDispatch } from "react-redux";
// import { changeToday } from "../redux/modules/todo";
// import styled from "styled-components";
// /**
//  * 달력 만들기 순서
//  *  - 이번달이 몇 주가 필요한 지 "주"수 구하기
//  *  - 주수만큼 map 돌리기
//  *  - map 돌리면서 안에 날짜 넣어주기!
//  *  - +) 일정도 같이 넣어주면 good!
//  */
// const PracCalendar = (props) => {
//   const dispatch = useDispatch();

//   const { _changeMonth, show_completed, _showPopup, _setSeletedTodo } = props;

//   const today = useSelector((state) => state.todo.today);
//   const todo_list = useSelector((state) => state.todo.todo_list);
//   // 넘어온 데이터를 확인하자!
//   console.log(todo_list);

//   // 이번달의 시작 주, 끝 주를 구합니다.
//   const start_week = moment(today).startOf("month").week();
//   const end_week = moment(today).endOf("month").week();

//   // 달력에 넣을 주수 배열 길이를 구합니다. (*주의* +1 해야함(7~11주는 총 몇 주인지 생각해보세요! :)!))
//   // 마지막 주가 다음 해 1주일 수 있어요. (시작 주보다 끝 주가 숫자가 작을 수 있다!)
//   const week_num =
//     (start_week > end_week ? 53 - start_week : end_week - start_week) + 1;

//   // 주수 길이의 배열을 만들고, [14, 15, 16, 17, 18]
//   const _week_arr = Array.from({ length: week_num }, (v, i) => start_week + i);

//   // 주마다 7개씩 날짜를 넣어주면 끝!
//   const week_arr = _week_arr.map((week_index) => {
//     return (
//       <WeekArr key={`${moment(today).format("MM")}_week_${week_index}`}>
//         {/*한 주는 7일이니, 주에 7개씩 날짜 칸을 넣어줍니다. */}
//         {Array.from({ length: 7 }, (v, i) => i).map((day_index) => {
//           let _day = today
//             .clone()
//             .startOf("year")
//             .week(week_index)
//             .startOf("week")
//             .add(day_index, "day");

//           //   console.log(day_index); // 0-6

//           const is_today =
//             moment().format("YYYY-MM-DD") === _day.format("YYYY-MM-DD");

//           // todo_list(Main.js에서 props로 건네줬어요!)에 해당 일자 일정이 들어가 있나 보고, 추가해줍시다.
//           const list_index = Object.keys(todo_list).indexOf(
//             _day.format("YYYY-MM-DD")
//           );

//           // 주석풀고 데이터 확인해보기! :)!
//           //   console.log(list_index);
//           //   console.log(todo_list[_day.format("YYYY-MM-DD")]);
//           // todo_list에 해당 일 일정이 있으면 일정을 list에 넣어주자! (없으면 null이나 빈배열로! 일단 빈배열로 해봅시다! :))
//           const _list =
//             list_index !== -1 ? todo_list[_day.format("YYYY-MM-DD")] : [];

//           const list = _list.map((_l, idx) => {
//             // 데이터 확인하기!
//             // console.log(_l);
//             // 일정을 뿌려줘요!
//             return (
//               <DailyContent
//                 key={`${_l.datetime}_${_l.todo_id}`}
//                 onClick={() => {
//                   console.log("here");
//                   props._showPopup(true);
//                   props._setSeletedTodo(_l);
//                 }}
//               >
//                 <Text type="label">{_l.contents}</Text>
//               </DailyContent>
//             );
//           });

//           if (is_today) {
//             return (
//               <DayGrid
//                 key={`${moment(today).format(
//                   "MM"
//                 )}_week_${week_index}_day_${day_index}`}
//                 bg={is_today ? "blue" : null}
//               >
//                 {_day.format("MM") === moment(today).format("MM") && (
//                   <Text type="label">{_day.format("DD")}</Text>
//                 )}
//                 <ListGrid>
//                   {
//                     // 일정도 보여줍시다! :) null이 아닐때만 보여줘요!
//                     _list && list
//                   }
//                 </ListGrid>
//               </DayGrid>
//             );
//           } else {
//             return (
//               <DayGrid
//                 key={`${moment(today).format(
//                   "MM"
//                 )}_week_${week_index}_day_${day_index}`}
//                 //   flex_direction="row"
//                 background-color={is_today ? "#6991E1" : "#ffffff"}
//               >
//                 {_day.format("MM") === moment(today).format("MM") && (
//                   <Text type="label">{_day.format("DD")}</Text>
//                 )}
//                 <ListGrid>
//                   {
//                     // 일정도 보여줍시다! :) null이 아닐때만 보여줘요!
//                     _list && list
//                   }
//                 </ListGrid>
//               </DayGrid>
//             );
//           }
//         })}
//       </WeekArr>
//     );
//   });

//   // 요일이 나올 배열도 만들어주기!
//   const dow = ["일", "월", "화", "수", "목", "금", "토"].map((_d) => {
//     return (
//       <DowArr key={`${moment(today).format("MM")}_week_${_d}`}>
//         <Text bold type="label">
//           {_d}
//         </Text>
//       </DowArr>
//     );
//   });

//   return (
//     <CalendarGrid>
//       <ButtonGrid>
//         <Button
//           onClick={() => {
//             // 기준일을 한달 전으로 돌려요!
//             dispatch(changeToday(moment(today).clone().subtract(1, "month")));
//           }}
//         >
//           이전
//         </Button>
//         <Text type="title">{moment(today).format("MM")}월</Text>
//         <Button
//           onClick={() => {
//             // 기준일을 한달 후로 돌려요!
//             dispatch(changeToday(moment(today).clone().add(1, "month")));
//           }}
//         >
//           이후
//         </Button>
//       </ButtonGrid>
//       <DowGrid>{dow}</DowGrid>
//       {week_arr}
//     </CalendarGrid>
//   );
// };

// const ListGrid = styled.div`
//   display: flex;
//   flex-direction: row;
//   /* border: 2px solid skyblue; */
// `;

// const WeekArr = styled.div`
//   display: flex;
//   margin: 4px auto;
//   flex-direction: row;
//   /* border: 2px solid yellowgreen; */
//   height: 100px;
// `;

// const DayGrid = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin: 0px 2px;
//   width: 800px;
//   /* border: 2px solid pink; */
//   ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
// `;

// const DailyContent = styled.div`
//   display: flex;
//   flex-direction: row;
//   height: auto;
//   margin: 0px 2px;
//   flex-wrap: nowrap;
//   /* border: 2px solid red; */
//   padding: 2px;
// `;

// const DowArr = styled.div`
//   display: flex;
//   margin: 4px 2px;
//   width: 100%;
//   flex-direction: column;
//   /* border: 2px solid skyblue; */
//   height: auto;
//   text-align: center;
//   padding: 5px;
// `;

// const CalendarGrid = styled.div`
//   flex-direction: column;
//   width: 100%;
//   height: 100%;
//   margin: auto;
//   max-width: 800px;
//   /* border: 2px solid skyblue; */
// `;

// const ButtonGrid = styled.div`
//   display: flex;
//   justify-content: space-between;
//   /* border: 2px solid skyblue; */
//   padding: 5px;
// `;

// const DowGrid = styled.div`
//   display: flex;
//   height: auto;
//   /* border: 2px solid black; */
//   padding: 5px;
// `;

// // const DayGrid = styled.div`
// //   flex-direction: row;
// //   height: auto;
// //   margin: 1px 0px;
// //   flex-wrap: nowrap;
// // `;

// // 기본적으로 꼭 필요한 props를 미리 정해줍시다!
// PracCalendar.defaultProps = {
//   _showPopup: () => {},
//   _setSeletedTodo: () => {},
// };

// export default PracCalendar;
