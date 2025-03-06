import { Separator } from '@radix-ui/react-separator'
import React from 'react'
import { ScrollArea } from '../ui/scroll-area'


function ContainerSection({children}: {children:React.JSX.Element}) {
  return (
    <div className='flex flex-1 flex-col'>
      {/* <div className='flex-none'>
        <h3 className='text-lg font-medium'>{title}</h3>
        <p className='text-sm text-muted-foreground'>{desc}</p>
      </div> */}
      {/* <Separator className='my-4 flex-none' /> */}
      <ScrollArea className='faded-bottom  flex-1 md:pb-16'>
        <div className='-mx-1 px-1.5'>{children}</div>
      </ScrollArea>
    </div>
  )
}

export default ContainerSection