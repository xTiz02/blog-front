
import React, { ReactNode, createContext, useContext, useState } from 'react'
import { PeopleOrderType, PostOrderDateBy, PostOrderType } from '@/model/model'

interface FiltercontextProps {
    q: string | undefined;
    setq: (q: string | undefined) => void;
    categoryId: string | undefined;
    setCategoryId: (categoryId: string | undefined) => void;
    topicId: string | undefined;
    setTopicId: (topicId: string | undefined) => void;

    orderPostType: PostOrderType | undefined;
    setOrderPostType: (orderType: PostOrderType | undefined) => void;
    orderPostDateBy: PostOrderDateBy | undefined;
    setOrderPostDateBy: (orderDateBy: PostOrderDateBy | undefined) => void;

    orderPeopleType: PeopleOrderType | undefined;
    setOrderPeopleType: (orderType: PeopleOrderType | undefined) => void;
}

const FilterContext = createContext<FiltercontextProps | undefined>(undefined);

export const FilterProvider: React.FC<{children:ReactNode}> = ({children,}) => {
    const [q, setq] = useState<string | undefined>(undefined);
    const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
    const [topicId, setTopicId] = useState<string | undefined>(undefined);
    const [orderPostType, setOrderPostType] = useState<PostOrderType | undefined>(undefined);
    const [orderPostDateBy, setOrderPostDateBy] = useState<PostOrderDateBy | undefined>(undefined);
    const [orderPeopleType, setOrderPeopleType] = useState<PeopleOrderType | undefined>(undefined);


  return (<FilterContext.Provider value={{
        q,
        setq,
        categoryId,
        setCategoryId,
        topicId,
        setTopicId,
        orderPostType,
        setOrderPostType,
        orderPostDateBy,
        setOrderPostDateBy,
        orderPeopleType,
        setOrderPeopleType
      }}>
          {children}
      </FilterContext.Provider>
  );
  
}
export const useFilter = () => {
  const context = useContext(FilterContext);
  if(context === undefined){
      throw new Error('useFilter must be used within ChatProvider');
  }
  return context;
}
