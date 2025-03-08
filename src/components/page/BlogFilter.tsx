import React, { useState } from 'react'
import { Separator } from '../ui/separator'
import Sidebar from '../filter/Sidebar'
import { Outlet, Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from "react-router-dom"
import { IoCloseCircleOutline } from "react-icons/io5";
import { cn } from '@/lib/utils'
import ContainerSection from '../filter/ContainerSection'

import {INITIAL_CATEGORY_DATA} from '@/data/data'
import CarouselSection from '../carousel/CarouselSection'
import { Input } from '../ui/input'
import { Button } from '../ui/button'


function BlogFilter() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(searchTerm.trim()) {
      searchParams.set("q", searchTerm);
      if(location.pathname.includes("/filter/posts")) {
        navigate(`posts?${searchParams.toString()}`); 
      }
      if(location.pathname.includes("/filter/people")) {
        navigate(`people?${searchParams.toString()}`);
      }
      if(location.pathname.includes("/filter/tags")) {
        navigate(`tags?${searchParams.toString()}`);
      }
      
      setSearchTerm("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleReset = (param: string) => {
    searchParams.delete(param);
    
    if(location.pathname.includes("/filter/posts")) {
      navigate("posts"+(searchParams.toString() ? `?${searchParams.toString()}` : ""));
    }
    if(location.pathname.includes("/filter/people")) {
      navigate("people"+(searchParams.toString() ? `?${searchParams.toString()}` : ""));
    }
    if(location.pathname.includes("/filter/tags")) {
      navigate("tags"+(searchParams.toString() ? `?${searchParams.toString()}` : ""));
    }
  };
  
  return (
    //Main
    <main className={cn(
        'peer-[.header-fixed]/header:mt-16',
        'px-4 py-10',
        'fixed-main flex flex-grow flex-col overflow-hidden'
      )}
      > 
        <div className='space-y-7 md:mx-10 mx-8'>
          <h1 className='text-center text-2xl font-bold tracking-tight md:text-3xl'>
            Blog Filter
          </h1>
    
          <form onSubmit={handleSearch} className="flex flex-col justify-center items-center">
            <Input
                type="search"
                placeholder="......."
                value={searchTerm}
                onChange={handleInputChange}
                className="max-w-lg "
              />
          </form>
          <div className='pb-3'>
            {searchParams.get('q') ? (
              <div className="flex items-center justify-center space-x-1">
                <p className="text-center text-neutral-500">
                  Search results for <strong>{searchParams.get("q")} </strong> 
                </p>
                <Button variant="ghost" size="icon" className='mt-1 h-7 w-7 rounded-full text-amber-700'
                onClick={()=>handleReset('q')}>
                    <IoCloseCircleOutline className="h-7 w-7 rotate-0 scale-100 transition-all" />
                </Button>
              </div>
            ) : (
              <p className="text-center text-neutral-500 ">
                Find your favorite topics and articles here by searching
              </p>
            )}

            {searchParams.get('category') ? (
              <div className="flex items-center justify-center space-x-1 pt-2">
                <p className="text-center text-neutral-500">
                  Category <strong>{searchParams.get("category")} </strong> 
                </p>
                <Button variant="ghost" size="icon" className='mt-1 h-7 w-7 rounded-full text-amber-700'
                onClick={()=>handleReset('category')}>
                    <IoCloseCircleOutline className="h-7 w-7 rotate-0 scale-100 transition-all" />
                </Button>
              </div>
            ) : (
              <p className="text-center text-neutral-500 pt-2">
                Or by category
              </p>
            )}

            {searchParams.get('topic') ? (
              <div className="flex items-center justify-center space-x-1 pt-2">
                <p className="text-center text-neutral-500">
                Topic <strong>{searchParams.get("topic")} </strong> 
                </p>
                <Button variant="ghost" size="icon" className='mt-1 h-7 w-7 rounded-full text-amber-700'
                onClick={()=>handleReset('topic')}>
                    <IoCloseCircleOutline className="h-7 w-7 rotate-0 scale-100 transition-all" />
                </Button>
              </div>
            ) : (
              <p className="text-center text-neutral-500 pt-2">
                Or by Topic
              </p>
            )}
          </div>
            
          <CarouselSection categoryList={INITIAL_CATEGORY_DATA}/>
        </div>
        <Separator className='my-4 lg:my-6' />
        <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-x-4 lg:space-y-0'>
          <div className='top-0 lg:sticky sm:px-4'>
            <Sidebar />
          </div>
          <div className='flex w-full p-1 lg:max-w-[800px]'>
            <ContainerSection>
               <Outlet />
            </ContainerSection>
          </div>
          <div className='top-0 lg:sticky'>
              DerechaDerecha Derecha Derecha
          </div> 
          
        </div>
      </main>
  )
}



export default BlogFilter