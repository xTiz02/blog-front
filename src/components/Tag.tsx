import React from 'react'
import { Button } from './ui/button'
import { TagType, Topic } from '@/model/model'
import { on } from 'events'
import { cn } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

interface TagProps {
    tag: Topic
    tagType: TagType
    onTagClick?: () => void
    className?: string
}

function Tag({
    tag,
    tagType,
    onTagClick,
    className
}:TagProps) {
  const navigate = useNavigate()

  const navigateToFilter = () => {
    navigate(`/filter/posts?topic=${tag.title}`)
  }
  
  return (
    <Button
        size="sm"
        onClick={ onTagClick ? onTagClick : navigateToFilter}
        variant="outline"
        className= {cn(
            "'text-muted-foreground'",
            className
        )
        }
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