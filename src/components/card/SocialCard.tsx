import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { CardSocial } from '@/model/model';

function SocialCard({card} : {card: CardSocial}) {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    
    // Limpieza del evento al desmontar
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    
     <div className="pb-10 pt-8 border-b border-zinc-200 dark:border-zinc-700 ">
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex md:items-center gap-1 sm:gap-5 flex-col md:flex-row">
            {isMobile ? (
            <div className="flex justify-between items-center">
                <div className="bg-white dark:bg-zinc-700 rounded-full">
                    <Avatar className="h-12 w-12">
                    <AvatarImage 
                        src={card.user.avatar}
                        alt="@shadcn" 
                    />
                    <AvatarFallback>SN</AvatarFallback>
                    </Avatar>
                </div>
                <div className='pr-1 md:p-0'>
                    <Button className="rounded-2xl">Follow</Button>
                </div>
            </div>
            ) : (
            <div className="bg-white dark:bg-zinc-700 rounded-full">
                <Avatar className="h-12 w-12">
                    <AvatarImage 
                    src={card.user.avatar} 
                    alt="@shadcn" 
                    />
                    <AvatarFallback>SN</AvatarFallback>
                </Avatar>
            </div>
            )}
          <div className='md:pr-8'>
            <h4 className="text-md font-medium text-zinc-900 dark:text-zinc-100">
              {card.user.name}
            </h4>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {card.description}
            </p>
          </div>
        </div>
        {!isMobile && (
          <div >
            <Button className="rounded-2xl">Follow</Button>
          </div>
        )}
        
      </div>
    </div>

  )
}

export default SocialCard