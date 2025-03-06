import React from 'react'
import { Card } from '../ui/card';
import { ArrowRight } from 'lucide-react';
import { Post } from '../filter/pages/Posts';
import { CiHeart } from 'react-icons/ci';
import { LuMessageSquareDashed } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { Avatar } from '@radix-ui/react-avatar';
import { AvatarFallback, AvatarImage } from '../ui/avatar';




function BlogFilterCard({post} : {post: Post}) {
  return (
    // <section className="">
    //   <div className="container flex flex-col items-center gap-16">
    //     <div className="text-center">
    //       <h2 className="mx-auto mb-6 text-pretty text-3xl font-semibold md:text-4xl lg:max-w-3xl">
    //         lol
    //       </h2>
    //       <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
    //         lol
    //       </p>
    //     </div>

    //     <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
    //       {posts.map((post) => (
            <Card
              key={post.id}
              className="order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-16 lg:col-span-12"
            >
              <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-4">
                <div className="sm:col-span-5">
                  <div className="mb-4 md:mb-6">
                    <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wider text-muted-foreground md:gap-5 lg:gap-6">
                      {post.tags?.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold md:text-2xl lg:text-2xl">
                    <a
                      href={post.url}
                      target="_blank"
                      className="hover:underline"
                    >
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-4 text-muted-foreground md:mt-5 line-clamp-4">
                    {post.summary}
                  </p>
                  <div className='flex items-center justify-between pt-4'>
                  
                    <a href="">
                        <Avatar className='h-8 w-8 mr-1.5 inline-flex'>
                            <AvatarImage src={""} alt='@shadcn' />
                            <AvatarFallback>SN</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-600 dark:text-gray-400 font-medium ">
                        {"wdsd"}
                        </span>
                    </a>
                   
                  <div className="text-xs text-gray-500 dark:text-gray-400 pr-3">
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
                            <span>{1}</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => {}}
                            className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400 hover:text-blue-500 transition-colors">
                                <LuMessageSquareDashed   className="w-5 h-5" />
                                <span>{1}</span>
                        </button>
                        
                        </div>
                    </div>
                  </div>
                  
                  {/* <div className="mt-6 flex items-center space-x-2 md:mt-8">
                    <a
                      href={post.url}
                      target="_blank"
                      className="inline-flex items-center font-semibold hover:underline md:text-base"
                    >
                      <span>Read more</span>
                      <ArrowRight className="ml-2 size-4 transition-transform" />
                    </a>
                  </div> */}
                </div>
                <div className="order-first sm:order-last sm:col-span-5">
                  <a href={post.url} target="_blank" className="block">
                    <div className="aspect-[16/9] overflow-clip rounded-lg border border-border">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition-opacity duration-200 fade-in hover:opacity-70"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </Card>
         
  )
}

export default BlogFilterCard