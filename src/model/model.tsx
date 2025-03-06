import { type } from "os"



//Comentarios
interface Message {
  id: string
  content: string
  sender: User
  timestamp: string
  reactions: {
    count: number
    replys: number
  }
}

interface User{
  id: string      //si el mensaje es mio desparece el reply button y se desactiva el like y coment
  name: string
  avatar: string
}



type Comment = 'comment' | 'reply';



//Busquedad
interface SearchData {
  searchGroups: SearchGroup[]
}

interface SearchGroup {
  category: Topic
  topics: Topic[]
}

interface Topic{
  title: string
  id : string
}

type TagType = "category" | "topic"


interface CardBlog{
  id: string
  img:string
  title: string
  description: string
  date: string
  category: Topic
  user : User
  topics?: string[]
  reactions: {
    count: number
    replys: number
  }
}

//Filter

type PostOrderType = "popular" | "latest" | "oldest"

type PostOrderDateBy = "lastmonth" | "lastweek" | "lastYear" | "last3months" | "last6months" | "all"

type PeopleOrderType = "asc" | "desc" | "popular" | "news"//asc es por nombre, desc es por nombre inverso

// interface FilterPosts{
//   q: string
//   categoryId: string
//   topicId: string
//   orderType: PostOrderType
//   orderDateBy: PostOrderDateBy
// }

// interface FilterPeople{
//   q: string
//   orderType: PeopleOrderType
// }

// interface FilterTopics{
//   q: string
//   categoryId: string
// }


export type { SearchData, SearchGroup, Topic, CardBlog, Message, User, Comment , TagType, PostOrderType, PostOrderDateBy, PeopleOrderType}