import React from 'react'
import { Button } from './ui/button'
import { TagType, Topic } from '@/model/model'
import { on } from 'events'

interface TagProps {
    tag: Topic
    tagType: TagType
    onTagClick?: () => void
}

function Tag({
    tag,
    tagType,
    onTagClick
}:TagProps) {

  const navigateToFilter = () => {
    //Si es un topic o categoria
    //router.push(`/search?${tagType}=${tag.id}`)
  }
  return (
    <Button
        size="sm"
        onClick={ onTagClick ? onTagClick : navigateToFilter}
        variant="outline"
        className='text-muted-foreground'
        style={{
            opacity: 1,
            cursor: "pointer",
            pointerEvents: "auto",
            position: "relative",
        }}
    >
        {tagType === "category" ? (
            "#"+tag.title
        ) : (
            tag.title
        )}
    </Button>
          

        //   {hiddenCount > 0 && (
        //     <Button
        //       ref={registerItem(items.length)}
        //       size="sm"
        //       variant="outline"
        //     >
        //       +{hiddenCount} more
        //     </Button>
        //   )}
        
  )
}

export default Tag