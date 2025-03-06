import { Message } from "@/model/model";
import { useState } from "react";

const CURRENT_USER = {
    name: "You",
    avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-04-uuYHWIRvVPi01gEt6NwnGyjqLeeZhz.png"
  };
  
  const INITIAL_MESSAGES: Message[] = [
    {
      id:crypto.randomUUID(),
      content: "Hey team! I've just pushed the latest design changes 🎨",
      sender: {
        id: "1",
        name: "Alex Chen",
        avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-01-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png",
        
      },
      timestamp: "10:24 AM",
      reactions: {
        count: 2,
        replys: 1
      }
    },
    {
      id: crypto.randomUUID(),
      content: "Looking great! The new color scheme is perfect",
      sender: {
        id: "2",
        name: "Sarah Kim",
        avatar: "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-02-albo9B0tWOSLXCVZh9rX9KFxXIVWMr.png",
        
      },
      reactions: {
        count: 0,
        replys: 1
      },
      timestamp: "10:26 AM",
      
    },
    {
      id: crypto.randomUUID(),
      content: "Thanks! I'll prepare the documentation now.",
      sender: {
        id: "1",
        name: CURRENT_USER.name,
        avatar: CURRENT_USER.avatar,
      },
      reactions: {
        count: 2,
        replys: 1
      },
      timestamp: "10:30 AM",
    }
  ];


  
//   <div className="p-8 space-y-8">
//   <div className="max-w-4xl mx-auto">
  //   <ChatProvider> 
//       <ChatCard
//         chatName={chats[0].name}
//         membersCount={chats[0].membersCount}
//         onlineCount={chats[0].onlineCount}
//         initialMessages={chats[0].messages}
//         currentUser={CURRENT_USER}
//         className={theme === "light" ? "border border-zinc-200" : ""}
//       />
//     </ChatProvider> 
//   </div>
// </div>
