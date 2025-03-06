import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { FaArrowRight } from 'react-icons/fa'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { CiHeart } from 'react-icons/ci'
import { cn } from '@/lib/utils'

import { LuMessageSquareDashed } from 'react-icons/lu'
import { CardBlog } from '@/model/model'

function BlogCard({card} : {card: CardBlog}) {
  return (
    //<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
    //className="grid grid-rows-[auto_auto_1fr_auto] pt-0 gap-3"
      <Card className="grid grid-rows-[auto_auto_1fr_auto] pt-0 gap-3 ">
        <div className="aspect-[16/9] w-full">
          <a
            href={""}
            target="_blank"
            className="transition-opacity duration-200 fade-in hover:opacity-70"
          >
            <img
              src={card.img}
              alt={"image"}
              className="h-full w-full object-cover object-center"
            />
          </a>
        </div>
        <div className='min-h-[250px]'>
          <CardHeader>
            <CardDescription>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>#{card.category.title}</span>
                  <span>
                  <time className="text-xs text-gray-500 dark:text-gray-400">{"15 Mars 2024"}</time>
                  </span>
              </div>
              
            </CardDescription>
            <CardTitle className="text-lg font-semibold hover:underline md:text-xl ">
              <a href={""} target="_blank">
                {card.title}
              </a>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="m-auto">
              <p className=" text-muted-foreground py-1 line-clamp-5 ">{card.description}</p>
            </div>
          </CardContent>
          </div>
        
        <CardFooter className='flex items-center justify-between'>
            <div className="flex items-center">
            <a href="">
                <Avatar className='h-8 w-8 mr-1.5 inline-flex'>
                    <AvatarImage src={""} alt='@shadcn' />
                    <AvatarFallback>SN</AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium ">
                {card.user.name}
                </span>
            </a>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={() => {}}
                    className={cn(
                    "flex items-center gap-1 text-sm transition-colors",
                    false
                        ? "text-rose-600"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-rose-600"
                    )}
                >
                    <CiHeart 
                    className={cn(
                        "w-5 h-5 transition-all",
                        false && "fill-current scale-110"
                    )}
                    />
                    <span>{card.reactions.count}</span>
                </button>
                <button
                    type="button"
                    onClick={() => {}}
                    className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400 hover:text-blue-500 transition-colors">
                        <LuMessageSquareDashed   className="w-5 h-5" />
                        <span>{card.reactions.replys}</span>
                </button>
                
                </div>
            </div>
        </CardFooter>
      </Card>
   
  //</div>
      
  )
}

export default BlogCard