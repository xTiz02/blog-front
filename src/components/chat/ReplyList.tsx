import { cn } from '@/lib/utils';
import { Message } from '@/model/model';
import React, { useEffect, useState } from 'react'
import UserMessage from '../chat/UserMessage';
import { randomUUID } from 'crypto';

interface ReplyListProps {
    messageid: string;
}

function ReplyList( {messageid:string}: ReplyListProps) {

    const [replys, setReplys] = useState<Message[]>([])

    useEffect(() => {
      const newMessage: Message = {
        //id ramdon
        id: crypto.randomUUID(),
        content: "Hello",
        sender: {
          id :crypto.randomUUID(),
          name: "Hello",
          avatar: "https://github.com/csandman.png?size=128",
          
        },
        timestamp: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        reactions: { count: 0 , replys: 0},
      }
      setReplys((prev) => [newMessage])
    }, [])

  return (
    <div className='ml-[12px] my-2 py-2'>
        {replys.map((reply) => (
          <div className='pl-[24px] py-[16px] border-l-2 border-gray-300' key={reply.id}>
            <UserMessage
            message={reply}
            isReply={true}
          />
          </div>
        ))} 
    </div>
    
  )
}

export default ReplyList