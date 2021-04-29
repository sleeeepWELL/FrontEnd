// import React, { useState } from "react";
// import styled from "styled-components";
// import { actionCreators as postActions } from "../redux/modules/todo";

// //컨디션 체크
// import bad from "../image/bad-condition.jpg";
// import good from "../image/good-condition.jpg";
// import soso from "../image/soso-condition.jpg";

// import bad_gray from "../image/bad-gray.jpg";
// import good_gray from "../image/good-gray.jpg";
// import soso_gray from "../image/soso-gray.jpg";

// const ConditionButton = (props) => {
//   const [condition, setCondition] = React.useState("");
//   const [checkcondition, setCheckCondition] = React.useState(false);

//   const good_icon = checkcondition ? good : good_gray;
//   const soso_icon = checkcondition ? soso : soso_gray;
//   const bad_icon = checkcondition ? bad : bad_gray;

//   return (
//     <React.Fragment>
//       <ImgGrid>
//         <input
//           width="40"
//           height="40"
//           type="image"
//           src={good_icon}
//           alt="컨디션 good"
//           value={1}
//           onClick={(e) => {
//             setCondition(e.target.value);
//             console.log(e.target.value);
//           }}
//           onChange={changeIcon}
//         />
//       </ImgGrid>
//       <ImgGrid>
//         <input
//           width="40"
//           height="40"
//           type="image"
//           src={soso_icon}
//           alt="컨디션 soso"
//           value={2}
//           onClick={(e) => {
//             setCondition(e.target.value);
//             console.log(e.target.value);
//           }}
//           // is_checked={is_checked}
//         />
//       </ImgGrid>
//       <ImgGrid>
//         <input
//           width="40"
//           height="40"
//           type="image"
//           src={bad_icon}
//           alt="컨디션 bad"
//           value={3}
//           onClick={(e) => {
//             setCondition(e.target.value);
//             console.log(e.target.value);
//           }}
//           // is_checked={is_checked}
//         />
//       </ImgGrid>
//     </React.Fragment>
//   );
// };

// const ImgGrid = styled.div`
//   display: flex;
//   /* background-color: blue; */
//   padding: 10px;
// `;

// export default ConditionButton;
