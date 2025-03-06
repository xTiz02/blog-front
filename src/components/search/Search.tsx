import React from 'react'
import { Button } from '../ui/button'
import { FaSearch } from 'react-icons/fa'
import { cn } from '@/lib/utils'
import { useSearch } from '@/context/search-context'

interface Props {
    className?: string
    type?: React.HTMLInputTypeAttribute
    placeholder?: string
  }

function Search({ className = '', placeholder = 'Search' }: Props) {
  const { setOpen } = useSearch()

  return (
    <Button
      variant='outline'
      className={cn(
        'relative h-8 w-full flex-1 justify-start rounded-md bg-muted/25 text-sm font-normal text-muted-foreground shadow-none hover:bg-muted/50 sm:pr-12 md:w-44 md:flex-none lg:w-58 xl:w-66',
        className
      )}
      onClick={() => setOpen(true)}
    >
      <FaSearch 
        aria-hidden='true'
        className='absolute left-1.5 top-1/2 -translate-y-1/2'
      />
      <span className='ml-3'>{placeholder}</span>
      <kbd className='pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex'>
        <span className='text-xs'>⌘</span>K
      </kbd>
    </Button>
  )
}

export default Search