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
  topics?: Topic[]
  reactions: {
    count: number
    replys: number
  }
}

interface CardSocial{
  id: string
  description: string
  user : User
  followers: number
}

//Filter
type PostOrderType = "popular" | "news" | "oldest"| "all"
type PostOrderDateBy = "lastmonth" | "lastweek" | "lastYear" | "last3months" | "last6months" | "all"
type PeopleOrderType = "popular" | "news"| "all" //asc es por nombre, desc es por nombre inverso

interface FilterPosts{
  q: string
  category: string
  topic: string
  orderType: PostOrderType
  orderDateBy: PostOrderDateBy
  page: number
}

interface FilterPeople{
  q: string
  orderType: PeopleOrderType
  page: number
}

// interface FilterTopics{
//   q: string
//   categoryId: string
// }


export type {Message, User, Comment, SearchData, SearchGroup, Topic, TagType, CardBlog, CardSocial, PostOrderType, PostOrderDateBy, PeopleOrderType, FilterPosts, FilterPeople}