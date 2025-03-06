import {
  SmilePlus,
  MoreHorizontal,
  Send,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Message } from "@/model/model"

import { useTheme } from "../theme-provider"
import { useChat } from "../../context/chat-context"
import UserMessage from "./UserMessage"
import ReplyList from "./ReplyList"


interface ChatCardProps {
  chatName?: string
  membersCount?: number //numMessage
  onlineCount?: number //numReactions
  initialMessages?: Message[] //No se recibe, se muestra cuando se da click a ver
  currentUser?: {
    name: string
    avatar: string
  }
  className?: string
}

export function ChatCard({
  chatName = "Team Chat",
  membersCount = 3,
  onlineCount = 2,
  initialMessages = [],
  currentUser = {
    name: "You",
    avatar:
      "https://ferf1mheo22r9ira.public.blob.vercel-storage.com/avatar-03-n0x8HFv8EUetf9z6ht0wScJKoTHqf8.png",
  },
  className,
}: ChatCardProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [visibleReplies, setVisibleReplies] = useState<{ [key: string]: boolean }>({});


  const {publishData, setPublishData} = useChat();

  const { setTheme,theme } = useTheme()

  const toggleReplies = (messageId: string) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [messageId]: !prev[messageId], // Alternar entre true y false
    }));
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: crypto.randomUUID(),
      content: "inputValue",
      sender: {
        id: crypto.randomUUID(),
        name: currentUser.name,
        avatar: currentUser.avatar,
      },
      timestamp: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      reactions: { count: 0 , replys: 0},
    }

    setMessages((prev) => [...prev, newMessage])
    setInputValue("")
    
  }

  const isLightTheme = theme === "light"

  useEffect(() => {
    if (publishData) {
      console.log(publishData);
      setInputValue(`@${publishData.reciver} `); // Agrega el usuario al input
    }
  }, [publishData]);



  return (
    
    <div
      className={cn(
        "w-full max-w-xl mx-auto rounded-2xl overflow-hidden",
        isLightTheme
          ? "bg-white text-zinc-900 border border-zinc-200"
          : "bg-zinc-900 text-zinc-100",
        className,
      )}
    >
      <div className="flex flex-col h-[600px]">
        {/* Header */}
        <div
          className={cn(
            "px-4 py-3 flex items-center justify-between border-b",
            isLightTheme ? "border-zinc-200" : "border-zinc-800",
          )}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-violet-500 flex items-center justify-center text-lg font-medium text-white">
                {chatName.charAt(0)}
              </div>
              <div
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2",
                  isLightTheme ? "ring-white" : "ring-zinc-900",
                )}
              />
            </div>
            <div>
              <h3
                className={cn(
                  "font-medium",
                  isLightTheme ? "text-zinc-900" : "text-zinc-100",
                )}
              >
                {chatName}
              </h3>
              <p
                className={cn(
                  "text-sm",
                  isLightTheme ? "text-zinc-500" : "text-zinc-400",
                )}
              >
                {membersCount} members • {onlineCount} online
              </p>
            </div>
          </div>
          <button
            type="button"
            className={cn(
              "p-2 rounded-full",
              isLightTheme
                ? "hover:bg-zinc-100 text-zinc-500"
                : "hover:bg-zinc-800 text-zinc-400",
            )}
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id}>
              <UserMessage message={message} isReply={false} onToggleReplies={() => toggleReplies(message.id)}/>
              
              {visibleReplies[message.id] && (
                <ReplyList messageid={message.id} />
                )}
            </div>
          ))} 
        </div>

        {/* Input */}
        <div className={cn("p-4", isLightTheme ? "bg-white" : "bg-zinc-900")}>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                placeholder="Write a message..."
                className={cn(
                  "w-full px-4 py-2.5 rounded-lg border-none",
                  "focus:outline-none focus:ring-1",
                  isLightTheme
                    ? "bg-zinc-100 text-zinc-900 placeholder-zinc-500 focus:ring-zinc-300"
                    : "bg-zinc-800 text-zinc-100 placeholder-zinc-500 focus:ring-zinc-600",
                )}
              />
              <button
                type="button"
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full",
                  isLightTheme
                    ? "hover:bg-zinc-200 text-zinc-500"
                    : "hover:bg-zinc-700 text-zinc-400",
                )}
              >
                <SmilePlus className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={sendMessage}
              className={cn(
                "p-2.5 rounded-lg transition-colors",
                isLightTheme
                  ? "bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-600"
                  : "bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-300",
              )}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
