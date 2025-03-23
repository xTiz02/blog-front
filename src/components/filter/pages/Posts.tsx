
import BlogFilterCard from '@/components/card/BlogFilterCard'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Database } from 'lucide-react';
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { IoIosTime } from "react-icons/io";
import { FaFilter } from "react-icons/fa6";
import { CardBlog, FilterPosts, PostOrderDateBy, PostOrderType } from '@/model/model';
import {INITIAL_CARDBLOG} from '@/components/card/card-data';
import FilterPagination from '../FilterPagination';



function Posts() {
  const [posts, setPosts] = useState<CardBlog[]>(INITIAL_CARDBLOG)
  const [selectDate, setSelectDate] = useState<PostOrderDateBy>("all")
  const [selectOrder, setSelectOrder] = useState<PostOrderType>("all")
  const [totalPages, setTotalPages] = useState(10)
  const location = useLocation()

  const getData = async (page:number) => {
    const searchParams = new URLSearchParams(location.search);
    const postFilter: FilterPosts = {
      q: searchParams.get("q") || "",
      category: searchParams.get("category") || "",
      topic: searchParams.get("topic") || "",
      orderType: selectOrder,
      orderDateBy: selectDate,
      page: page,
    };

    setTotalPages(10);

    console.log("(Obtener datos):", postFilter);
  }

  useEffect(() => {
    getData(1)
  }, [ location,selectDate, selectOrder]);

 
  // useEffect(() => {

  //   const searchParams = new URLSearchParams(location.search);

  //   const postFilter: FilterPosts = {
  //     q: searchParams.get("q") || "",
  //     category: searchParams.get("category") || "",
  //     topic: searchParams.get("topic") || "",
  //     orderType: selectOrder,
  //     orderDateBy: selectDate,
  //     page: currentPage, 
  //   };

  //   console.log("(Cambio de página):", postFilter);
  // }, [currentPage]);

  const handDateSelect = (value: PostOrderDateBy) => {
    setSelectDate(value)
  }

  const handleOrderSelect = (value: PostOrderType) => {
    setSelectOrder(value)
  }

  return (
    <div className='sm:pr-5'>
      <div className='flex flex-row gap-x-3 justify-center sm:justify-end'>
        <Select onValueChange={handDateSelect} defaultValue='all'>
              <SelectTrigger
                id="select-date"
                className="relative ps-9"
                aria-label="Select database"
              >
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 group-has-[[disabled]]:opacity-50">
                  <IoIosTime  size={16} strokeWidth={2} aria-hidden="true" />
                </div>
                <SelectValue placeholder="-----" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lastweek">lastweek</SelectItem>
                <SelectItem value="lastmonth">lastmonth</SelectItem>
                <SelectItem value="last3months">last3months</SelectItem>
                <SelectItem value="last6months">last6months</SelectItem>
                <SelectItem value="lastYear">lastYear</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
        </Select>
        <Select onValueChange={handleOrderSelect} defaultValue='all'>
              <SelectTrigger
                id="select-order"
                className="relative ps-9"
                aria-label="Select database"
              >
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 group-has-[[disabled]]:opacity-50">
                  <FaFilter size={16} strokeWidth={2} aria-hidden="true" />
                </div>
                <SelectValue placeholder="-----" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">popular</SelectItem>
                <SelectItem value="news">news</SelectItem>
                <SelectItem value="oldest">oldest</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-y-2 sm:gap-y-4">
        
        {posts.map((post) => (
          <BlogFilterCard key={post.id} post={post}/>
        ))}
       
        
      </div>
      <div className='pt-3 sm:pt-16'>
         <FilterPagination paginationItemsToDisplay={5} totalPages={totalPages}  onPageChange={(page)=>{getData(page)}} filter={{selectDate,selectOrder}}/>
      </div>
     
    </div>
    
    
  )
}

export default Posts