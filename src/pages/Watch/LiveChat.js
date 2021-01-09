// import React, { useEffect, useState } from "react";
// import { getChatLive } from "../../api/baseApi";
// import { Avatar } from "@material-ui/core";
// import "./Watch.css";
// import axios from "axios";

// function LiveChat(props) {
//   const [listChat, setListChat] = useState([]);

//   useEffect(async () => {
//     // if (props.chatId != "") {
//     // const interval = setInterval(() => {
//     //   getChatLive(props.chatId).then((res) => setListChat(res));
//     console.log("chatId", props.chatId);
//     // }, 1000);
//     await getChatLive(props.chatId).then((res) => setListChat(res));
//     // console.log("chatId", props.chatId);
//     // return () => clearInterval(interval);
//     // }
//   }, [window.location.pathname]);

//   return (
//     <div className="chatlive">
//       {listChat.map((item) => {
//         return (
//           <div className="chatlive__items">
//             <div className="chatlive__item">
//               <Avatar
//                 alt="Remy Sharp"
//                 src={item.authorDetails.profileImageUrl}
//               />
//               <p>
//                 <span
//                   style={{ color: "rgb(0,0,0,0.66)", paddingRight: "10px" }}
//                 >
//                   {item.authorDetails.displayName}
//                 </span>
//                 <span>{item.snippet.displayMessage}</span>
//               </p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default LiveChat;
