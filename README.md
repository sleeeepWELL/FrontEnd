# FrontEnd


// export default function reducer(state = initialState, action = {}) {
//   switch (action.type) {
//     // 액션 별로 처리할 내용 넣기!
//     case "todo/LOAD":
//       return state;


//     case "todo/UPDATE": {
//       const { date, todo_id, todo_data } = action;
//       // date와 todo_id를 이용해서 삭제할 일정 찾아서 삭제하기
//       // 하나 복사합시다!
//       const _new_todo_list = { ...state.todo_list };

//       // 지울 일정이 있는 날짜! 그 날짜에 어떤 일정이 있나 가져옵니다.
//       let todos = _new_todo_list[date];

//       // 새 전체 일정이 여기 들어갈거예요.
//       let new_todo_list = {};
//       // 만약 날짜가 달라졌다면? 해당 날짜에서 빼줘야해요! 그리고 새로운 날짜에 넣어줘야합니다. :)
//       // 아래 주석을 풀고 콘솔로 날짜가 같은 지, 다른 지 보세요!
//       // console.log(date === moment(todo_data.datetime).format("YYYY-MM-DD"));
//       if (date === moment(todo_data.datetime).format("YYYY-MM-DD")) {
//         // 날짜가 그대로라면?
//         // 해당 일자 데이터에서 지울 일정을 고쳐줍니다.
//         todos = todos.map((t) => {
//           // 지울 일정의 todo_id와 todos 안에 있던 값의 todo_id를 비교해요.
//           // 만약 두 개가 같으면 고칠 데이터겠죠! 그럼 이 친구를 새로 받아온 데이터로 덮어씌워야겠다!
//           // 두 개가 다르면? 그대로 return해준다!
//           if (t.todo_id === todo_id) {
//             //   기존 내용에 고칠 내용을 덮어씌워요 :)
//             return { ...t, ...todo_data };
//           } else {
//             return t;
//           }
//         });

//         // 이제 새로운 일정 데이터(전체!)를 만들어줄게요.
//         new_todo_list = { ..._new_todo_list, [date]: todos };
//       } else {
//         // 날짜가 변했다면?
//         // 원래 일자에서 빼주고, 바뀐 일자엔 넣어주고!
//         //   이번엔 좀 한 번에 써볼게요 :) (상세하게 보고 싶으면 삭제 코드, 추가 코드 참고하기!)
//         // 새 일자를 상수에 넣어주고,
//         const _new_date = moment(todo_data.datetime).format("YYYY-MM-DD");
//         // 해당 일자에 일정이 있었나 확인해요! 있었다면, 원래 배열을 유지하고, 없었다면 빈 배열로!
//         const _new_date_todos = _new_todo_list[_new_date]
//           ? _new_todo_list[_new_date]
//           : [];
//         new_todo_list = {
//           ..._new_todo_list,
//           [date]: _new_todo_list[date].filter((t) => t.todo_id !== todo_id),
//           [_new_date]: [..._new_date_todos, { ...todo_data }],
//         };
//       }

//       // 확인해보자!
//       // console.log(new_todo_list);

//       // 새 일정을 state에 넣으면 끝!
//       return { ...state, todo_list: new_todo_list };
//     }

//     // 액션으로 받아오는 것 : date, todo_id
//     /**
//      *
//      * @param {*} date 일정이 있는 날짜 / 형식은 꼭 YYYY-MM-DD여야겠죠! (string이여야해요!)
//      * @param {*} todo_id 지울 일정의 아이디!
//      */
//     case "todo/DELETE": {
//       const { date, todo_id } = action;
//       // date와 todo_id를 이용해서 삭제할 일정 찾아서 삭제하기
//       // 하나 복사합시다!
//       const _new_todo_list = { ...state.todo_list };

//       // 지울 일정이 있는 날짜! 그 날짜에 어떤 일정이 있나 가져옵니다.
//       let todos = _new_todo_list[date];

//       // 해당 일자 데이터에서 지울 일정을 빼줍니다. (지울거 빼고 나머지만 가져오기)
//       todos = todos.filter((t) => {
//         // 지울 일정의 todo_id와 todos 안에 있던 값의 todo_id를 비교해요.
//         // 만약 두 개가 같으면 지워야하는 것이니, 걸러줘야겠죠!
//         // 두 개가 다르면? 그대로 todos에 남아 있어도 되고요.
//         return t.todo_id !== todo_id;
//       });

//       // 이제 새로운 일정 데이터(전체!)를 만들어줄게요.
//       const new_todo_list = { ..._new_todo_list, [date]: todos };

//       // 새 일정을 state에 넣으면 끝!
//       return { ...state, todo_list: new_todo_list };
//     }
//     case "todo/CHANGE_TODAY": {
//       // action에서 받아오는 값 : date
//       return { ...state, today: moment(action.date) };
//     }

//     default:
//       return state;
//   }
// }