import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import BlogCard from '../card/BlogCard'

import { CardBlog, Topic } from '@/model/model'
import Tag from '../Tag'
import { useNavigate } from 'react-router-dom'

  
function CarouselSection({ cardList, categoryList }: { cardList?: CardBlog[], categoryList?: Topic[] }) {
  const navigate = useNavigate();
  

  const navtoFilterPage = (category: Topic) => {
    const searchParams = new URLSearchParams(location.search);
    if(searchParams.get("category") == category.title) {
      return;
    }
    if(searchParams.get("topic")){
      searchParams.delete("topic");
    }
    searchParams.set("category", category.title);
    if(location.pathname.includes("/filter/posts") || location.pathname.includes("/filter/people")) {
      navigate(`posts?${searchParams.toString()}`);
    }
    if(location.pathname.includes("/filter/tags")) {
      navigate(`tags?${searchParams.toString()}`);
    }
  }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full select-none cursor-grab active:cursor-grabbing border-x-2 border-gray-200 "
    >
      <CarouselContent>
        {cardList && cardList.length > 0 ? ( 
          cardList.map((card, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="md:m-2">
                <BlogCard card={card} />
              </div>
            </CarouselItem>
          ))
        ) : categoryList && categoryList.length > 0 ? ( 
          categoryList.map((tag) => (
            <CarouselItem key={tag.id} className="basis-1/2 sm:basis-1/5 md:basis-1/6 lg:basis-1/9 ">
              <div className="flex justify-self-end">
                <Tag tag={tag} tagType="category" onTagClick={() => {navtoFilterPage(tag)}} />
              </div>
            </CarouselItem>
          ))
          
        ) : (
          <p className="text-center w-full p-4 text-gray-500">No hay contenido disponible</p>
        )}
      </CarouselContent>
      {categoryList && categoryList.length > 0 && (
        <>
          <CarouselPrevious >
          </CarouselPrevious>
          <CarouselNext>
          </CarouselNext>
        </>
      )}
    </Carousel>
  );
}

export default CarouselSection