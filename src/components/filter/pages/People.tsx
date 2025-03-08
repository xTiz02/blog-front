import SocialCard from '@/components/card/SocialCard'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import React, { useEffect, useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import { IoIosTime } from 'react-icons/io'
import FilterPagination from '../FilterPagination'
import { CardSocial, FilterPeople, PeopleOrderType } from '@/model/model'
import {INITIAL_CARDSOCIAL} from '@/components/card/card-data';
import { useLocation } from 'react-router-dom'

function People() {
  const [cards, setCards] = useState<CardSocial[]>(INITIAL_CARDSOCIAL)
  const [selectPeopleOrder, setSelectPeopleOrder] = useState<PeopleOrderType>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(10)
  const location = useLocation()

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    const socialFilter: FilterPeople = {
      q: searchParams.get("q") || "",
      orderType: selectPeopleOrder,
      page: 1,
    };

    setCurrentPage((prev) => (prev !== 1 ? 1 : prev));
    setTotalPages(10);

    console.log("(Reset a página 1):", socialFilter);
  }, [location, selectPeopleOrder]);

 
  useEffect(() => {
    
    if (currentPage === 1) return;

    const searchParams = new URLSearchParams(location.search);

    const socialFilter: FilterPeople = {
      q: searchParams.get("q") || "",
      orderType: selectPeopleOrder,
      page: currentPage, 
    };

    console.log("(Cambio de página):", socialFilter);
  }, [currentPage]);

  const handPeopleOrderSelect = (value: PeopleOrderType) => {
    setSelectPeopleOrder(value)
  }

  

  console.log('People')
  return (
    <div className='px-4 sm:px-16 sm:mr-5'>
      <div className='flex flex-row justify-center sm:justify-end'>
        <Select onValueChange={handPeopleOrderSelect} defaultValue='all'>
              <SelectTrigger
                id="select-order"
                className="relative ps-9"
                aria-label="Select database"
              >
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 group-has-[[disabled]]:opacity-50">
                  <FaFilter  size={16} strokeWidth={2} aria-hidden="true" />
                </div>
                <SelectValue placeholder="-----" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="news">News</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectContent>
        </Select>
      </div>
      
      <div className="grid gap-y-2 sm:gap-y-4">
        
        {cards.map((card) => (
          <SocialCard key={card.id} card={card}/>
        ))}
       
        
      </div>
      <div className='pt-3 sm:pt-16'>
         <FilterPagination paginationItemsToDisplay={5} totalPages={totalPages} currentPage={currentPage} onPageChange={(page:number) =>{setCurrentPage(page)}}/>
      </div>
     
    </div>
  )
}

export default People