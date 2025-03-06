import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { buttonVariants } from '../ui/button'
import BlogCard from '../card/BlogCard'
import CarouselSection from '../carousel/CarouselSection'
import { Topic } from '@/model/model'
import Tag from '../Tag'
import INITIAL_CARDBLOG from '../card/card-data'

import INITIAL_CATEGORY_DATA from '@/data/data'
function Home() {

  
  const [trendingPost, setTrendingPost] = useState(INITIAL_CARDBLOG);

  const filterByTag = (tag: Topic) => {
    console.log(tag)
    //fetch data from server
    //setTrendingPost(data)
  }

  return (
    <>
      <section className="space-y-6 py-16 md:pb-12 md:mt-10 lg:py-32">
        <div className="flex flex-col gap-4 text-center px-8">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
            Stories & ideas 📰
          </h1>
          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
            Welcome to the place where you will find thoughts, ideas and stories.
          </p>
          <div className="flex flex-wrap md:gap-4 gap-x-1.5 gap-y-3  justify-center md:p-8">
            {INITIAL_CATEGORY_DATA.map((tag) => (
              <Tag tag={tag} key={tag.id} tagType='category' onTagClick={()=>filterByTag(tag)}/>
            ))}
            {/* <Link
              to="/blog"
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}
            >
              View my blog
            </Link>
            <Link
              to={""}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-fit"
              )}
            >
              GitHub
            </Link> */}
          </div>
          <span className="text-muted-foreground text-sm">
            <p>
              <strong>Action:</strong> Click to filter trending topics. 
            </p>
          </span>
        </div>
      </section>
      <section className="flex flex-col items-center gap-16 lg:px-16 px-10 mx-auto ">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
          Trending
        </h2>
        <CarouselSection cardList={trendingPost}/>
        {/* <ul className="flex flex-col">
          {latestPosts.map((post) => (
            post.published && (
              <li key={post.slug} className="first:border-t first:border-border">
                <PostItem
                  slug={post.slug}
                  title={post.title}
                  description={post.description}
                  date={post.date}
                  tags={post.tags}
                />
              </li>
            )
          ))}
        </ul> */}
      </section>
    </>
  )
}

export default Home