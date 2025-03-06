
import BlogFilterCard from '@/components/card/BlogFilterCard'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
  tags?: string[];
}
const INITIAL_POSTS: Post[] = [
  {
    id: "post-1",
    title:
      "Building Modern UIs: A Deep Dive into Shadcn and React Components",
    summary:
      "Join us for an in-depth exploration of building modern user interfaces using shadcn/ui and React. Learn best practices and advanced techniques.Join us for an in-depth exploration of building modern user interfaces using shadcn/ui and React. Learn best practices and advanced techniques.",
    label: "Web Design",
    author: "Sarah Chen",
    published: "15 Feb 2024",
    url: "https://shadcnblocks.com",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8m5y7sn6MveC7_iQcZXCQ_xlcr_SkHT1_7Q&s",
    tags: ["Web Design", "UI Development"],
  },
  {
    id: "post-2",
    title: "Mastering Tailwind CSS: From Basics to Advanced Techniques",
    summary:
      "Discover how to leverage the full power of Tailwind CSS to create beautiful, responsive websites with clean and maintainable code.ss",
    label: "Web Design",
    author: "Michael Park",
    published: "22 Feb 2024",
    url: "https://shadcnblocks.com",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8m5y7sn6MveC7_iQcZXCQ_xlcr_SkHT1_7Q&s",
    tags: ["Web Design", "CSS"],
  },
]

function Posts() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)
  const location = useLocation()
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    if(searchParams.size > 0) {
      
    }else{
      //setPosts([]) por defecto
    }
  }, [location])

  return (
    <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
      {posts.map((post) => (
        <BlogFilterCard post={post}/>
      ))}
    </div>
    
  )
}

export default Posts