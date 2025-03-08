import React from 'react'
import { Card } from '../ui/card';
import { ArrowRight } from 'lucide-react';
import { CiHeart } from 'react-icons/ci';
import { LuMessageSquareDashed } from 'react-icons/lu';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Tag from '../Tag';
import { CardBlog } from '@/model/model';




function BlogFilterCard({post} : {post: CardBlog}) {
  return (
    // <section className="">
    //   <div className="p-8 flex flex-col items-center gap-16">
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
              className="border-0 bg-transparent shadow-none sm:col-span-16 lg:col-span-12"
            >
              <div className="grid gap-y-4 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-4">
                <div className="sm:col-span-5">
                  <div className="mb-3 md:mb-4">
                    <div className="flex flex-wrap justify-center sm:justify-start gap-1.5 uppercase tracking-wider text-muted-foreground">
                      {post.topics?.map((tag) => 
                      <Tag key={tag.id} tag={tag} tagType='topic' className = "h-6 text-[10px] p-1 border-accent" />
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold md:text-2xl lg:text-2xl">
                    <a
                      href={""}
                      target="_blank"
                      className="hover:underline"
                    >
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-4 text-muted-foreground md:mt-5 line-clamp-4">
                    {post.description}
                  </p>
                  <div className='flex items-center justify-between pt-4'>
                  
                    <div className='inline-flex items-center'>
                      <Avatar className='h-8 w-8 mr-2'>
                        <AvatarImage src={post.user.avatar} alt='@shadcn' />
                        <AvatarFallback>SN</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-600 dark:text-gray-400 font-medium ">
                      {post.user.name}
                      </span>
                    </div>
                    
                    
                    
                   
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
                              <span>{post.reactions.count}</span>
                          </button>
                          <button
                              type="button"
                              onClick={() => {}}
                              className="flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400 hover:text-blue-500 transition-colors">
                                  <LuMessageSquareDashed   className="w-5 h-5" />
                                  <span>{post.reactions.replys}</span>
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
                  <a href={""} target="_blank" className="block">
                    <div className="aspect-[16/9] overflow-clip rounded-lg border border-border">
                      <img
                        src={post.img}
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