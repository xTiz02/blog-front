import { type } from 'os';
import React, { ReactNode, createContext, useContext, useState } from 'react'
import { Comment } from '@/model/model'



export interface PublishData{
  reciver: string;
  messageId: string;
  typeComment: Comment;
}
interface ChatcontextProps {
  publishData: PublishData | undefined;
  setPublishData: (data: PublishData | undefined) => void;
}

const Chatcontext = createContext<ChatcontextProps | undefined>(undefined);

export const ChatProvider: React.FC<{children:ReactNode}> = ({children,}) => {
  const [publishData, setPublishData] = useState<PublishData | undefined>(undefined);

  return (<Chatcontext.Provider value={{
      publishData,
      setPublishData
      }}>
          {children}
      </Chatcontext.Provider>
  );
  
}

export const useChat = () => {
  const context = useContext(Chatcontext);
  if(context === undefined){
      throw new Error('useFilter must be used within ChatProvider');
  }
  return context;
}
