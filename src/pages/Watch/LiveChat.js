// import React, { useEffect, useState } from "react";
// import { getChatLive } from "../../api/baseApi";
// import { Avatar } from "@material-ui/core";
// import "./Watch.css";
// import axios from "axios";

// function LiveChat(props) {
//   const [listChat, setListChat] = useState([]);

//   useEffect(async () => {
//     await getChatLive(props.chatId).then((res) => setListChat(res));
//     console.log("chatlive", getChatLive(props.chatId));
//     // console.log("ok");
//     // console.log("chatId", props.chatId);
//     // const test = await axios.get(
//     //   `https://youtube.googleapis.com/youtube/v3/liveChat/messages?liveChatId=${props.chatId}&part=snippet%2C%20authorDetails&key=AIzaSyBvW9hL8LcRCGyTYUuLykpdjp064Vou0OY`
//     // );
//     // console.log(test);
//   }, []);

//   return (
//     <div className="chatlive">
//       {listChat.map((item) => {
//         return (
//           <div className="chatlive__item">
//             <Avatar alt="Remy Sharp" src={item.authorDetails.profileImageUrl} />
//             <p style={{ color: "rgb(0,0,0,0.66)" }}>
//               {item.authorDetails.displayName}
//             </p>
//             <p>{item.snippet.displayMessage}</p>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default LiveChat;
