import React, { useEffect, useRef, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { ScrollArea } from '../ui/scroll-area'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SiGooglemessages } from "react-icons/si";


const sidebarNavItems = [
  {
    title: 'Posts',
    icon: <SiGooglemessages  size={18} />,
    href: 'posts',
  },
  {
    title: 'People',
    icon: <SiGooglemessages size={18} />,
    href: 'people',
  },
  {
    title: 'Tags',
    icon: <SiGooglemessages size={18} />,
    href: 'tags',
  },
  {
      title: 'Tags',
      icon: <SiGooglemessages size={18} />,
      href: 'tags2',
  },
  {
      title: 'Tags',
      icon: <SiGooglemessages size={18} />,
      href: 'tags3',
  },
]

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
    items?:  {
      href: string
      title: string
      icon: JSX.Element
    }[]
  }

function Sidebar({
    className,
    items = sidebarNavItems,
    ...props
}: SidebarNavProps){

  const navigate = useNavigate()
  const location = useLocation()
  const [val, setVal] = useState(location.pathname)
  const searchParams = new URLSearchParams(location.search)

  const handleSelect = (e: string) => {
    navigate(e+`?${searchParams.toString()}`)
  }


  useEffect(() => {
    if(location.pathname.includes("/posts")){
      setVal("posts")
    }
    if(location.pathname.includes("/people")){
      setVal("people")
    }
    if(location.pathname.includes("/tags")){
      setVal("tags")
    }
  }, [location])

  return (
    <>
    <div className='p-1 sm:hidden'>
      <Select value={val} onValueChange={handleSelect}>
        <SelectTrigger className='h-12 sm:w-48 w-full'>
          <SelectValue placeholder='Theme' />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.href} value={item.href}>
              <div className='flex gap-x-4 px-2 py-1'>
                <span className='scale-125'>{item.icon}</span>
                <span className='text-md'>{item.title}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <ScrollArea
      //orientation='horizontal'
      type='always'
      className='hidden w-full min-w-40 bg-background px-1 py-2 sm:block'
    >
      <nav
        className={cn(
          'flex space-x-2 justify-center py-1 lg:flex-col lg:space-x-0 lg:space-y-1',
          className
        )}
        {...props}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href+`?${searchParams.toString()}`}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              location.pathname.includes(item.href)
                ? 'bg-muted hover:bg-muted'
                : 'hover:bg-transparent hover:underline',
              'justify-start'
            )}
          >
            <span className='mr-2'>{item.icon}</span>
            {item.title}
          </Link>
        ))}
      </nav>
    </ScrollArea>
  </>
  )
}

export default Sidebar