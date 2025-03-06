import  { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearch } from '@/context/search-context'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { CiCloudSun, CiDark } from 'react-icons/ci'
import { GrSystem } from 'react-icons/gr'
import { useTheme } from '../theme-provider'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { searchData } from './data'

export function CommandMenu() {
  const navigate = useNavigate()
  const { setTheme } = useTheme()
  const { open, setOpen } = useSearch()
  const [val, setVal] = useState('')

  const runCommand = useCallback( //useCallback es un hook que se usa para evitar que una función se vuelva a crear cada vez que se renderiza un componente.
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  const pressedKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      navigate(`/filter/posts/?q=${val}`)
      setOpen(false)
    }
  }

  return (
    <CommandDialog modal open={open} onOpenChange={setOpen}>
      <CommandInput placeholder='Type a command or search...' onKeyDown={(e) => pressedKey(e)} onValueChange={
        (value) => {
          setVal(value)
        }
      }/>
      <CommandList>
        <ScrollArea type='hover' className='h-72 pr-1'>
          <CommandEmpty>No results found.</CommandEmpty>
          {searchData.searchGroups.map((group) => ( 
            <CommandGroup key={group.category.id} heading={group.category.title}>
              {group.topics.map((navItem, i) => {

                return (
                  <CommandItem
                  key={`${navItem.id}-${i}`}
                  value={navItem.title}
                  onSelect={() => {
                    
                  }}
                  >
                    <div className='mr-2 flex h-4 w-4 items-center justify-center'>
                      <MdOutlineKeyboardArrowRight  className='size-2 text-muted-foreground/80' />
                    </div>
                    {navItem.title}
                  </CommandItem>
                )
                
              })}
            </CommandGroup>
          ))}
          <CommandSeparator />
          <CommandGroup heading='Theme'>
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <CiCloudSun  /> <span>Light</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <CiDark  className='scale-90' />
              <span>Dark</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <GrSystem  />
              <span>System</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )
}