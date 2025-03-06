import { cn } from '@/lib/utils'
import { Message, Comment } from '@/model/model'
import { MessageSquare, ThumbsUp } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../theme-provider';
import {  PublishData, useChat } from '../../context/chat-context';



interface UserMessageProps {
    message: Message;
    isReply: boolean;
    onToggleReplies?: () => void;
}

function UserMessage({message,isReply,onToggleReplies}: UserMessageProps) {
    const { setTheme,theme } = useTheme();
    const isLightTheme = theme === "light";

    const {setPublishData} = useChat();
    
    const handleLike = (messageId: string) => {
        
    }

    const handleReply = () => {
        const typeComment:Comment =  isReply ? "reply" : "comment";
        setPublishData({
            reciver: message.sender.name,
            messageId: message.id,
            typeComment
        });
    }
    
      
  return (
    <div className="" >
        <div className="flex items-start gap-3">
            <img
                src={message.sender.avatar}
                alt={message.sender.name}
                width={36}
                height={36}
                className="rounded-full"
            />
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                <span
                    className={cn(
                    "font-medium",
                    isLightTheme ? "text-zinc-900" : "text-zinc-100",
                    )}
                >
                    {message.sender.name}
                </span>
                <span
                    className={cn(
                    "text-sm",
                    isLightTheme ? "text-zinc-500" : "text-zinc-500",
                    )}
                >
                    {message.timestamp}
                </span>
                </div>
                <p
                className={cn(
                    "break-words",
                    isLightTheme ? "text-zinc-700" : "text-zinc-300",
                )}
                >
                {message.content}
                </p>
                
                <div className="flex items-center justify-between  mt-2">
                    <div className="flex items-center gap-1">
                    
                        <button
                        onClick={() =>
                            handleLike(message.id)
                        }
                        className={cn(
                            "px-2 py-1 rounded-lg text-sm flex items-center gap-1",
                            message.reactions?.count > 0
                            ? isLightTheme
                                ? "bg-violet-100 text-violet-600"
                                : "bg-violet-500/20 text-violet-400"
                            : isLightTheme
                                ? "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700",
                        )}
                        >
                        <span><ThumbsUp className="w-4 h-4" />{message.reactions.count}</span>
                    
                        </button>
                        {!isReply && (
                            <button
                            onClick={onToggleReplies}
                            className={cn(
                                "px-2 py-1 rounded-lg text-sm flex items-center gap-1",
                                isLightTheme
                                ? "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700",
                            )}
                            >
                            <span><MessageSquare className="w-4 h-4" />{message.reactions.replys}</span>
                            </button>
                        )}
                        
                        
                    </div>
                    {/* Reply link*/ }
                    <div className="">
                    <button
                        onClick={handleReply}
                        className={cn(
                        "px-2 py-1 rounded-full cursor-pointer",
                        isLightTheme
                            ? "hover:bg-zinc-100 text-zinc-500"
                            : "hover:bg-zinc-800 text-zinc-400",
                        )}
                    >
                        Reply
                    </button>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default UserMessage;