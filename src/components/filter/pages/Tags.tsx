import Tag from '@/components/Tag'
import { FilterTopics, Topic } from '@/model/model'
import React, { useEffect, useState } from 'react'
import FilterPagination from '../FilterPagination'
import { useLocation } from 'react-router-dom'
import { INITIAL_CATEGORY_DATA } from '@/data/data'

function Tags() {
  const [topics, setTopics] = useState<Topic[]>(INITIAL_CATEGORY_DATA)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const location = useLocation()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    const socialFilter: FilterTopics = {
      q: searchParams.get("q") || "",
      category: searchParams.get("category") || "",
      page: 1,
    };

    setCurrentPage((prev) => (prev !== 1 ? 1 : prev));
    setTotalPages(10);

    console.log("(Reset a página 1):", socialFilter);
  }, [location]);

 
  useEffect(() => {
    
    if (currentPage === 1) return;

    const searchParams = new URLSearchParams(location.search);

    const socialFilter: FilterTopics = {
      q: searchParams.get("q") || "",
      category: searchParams.get("category") || "",
      page: currentPage, 
    };

    console.log("(Cambio de página):", socialFilter);
  }, [currentPage]);


  return (
    <div className='p-4 sm:px-10 md:mr-5'>
      
      <div className="flex items-center flex-wrap gap-x-4 gap-y-2 tracking-wider text-muted-foreground">
        
        {topics.map((topic) => (
          <Tag key={topic.id} tag={topic} tagType='topic' className ="border-accent rounded-2xl"/>
        ))}
       
        
      </div>
      <div className='pt-10 sm:pt-16'>
         <FilterPagination paginationItemsToDisplay={5} totalPages={totalPages} currentPage={currentPage} onPageChange={(page:number) =>{setCurrentPage(page)}}/>
      </div>
     
    </div>
  )
}

export default Tags