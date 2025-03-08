import { CardBlog, CardSocial } from "@/model/model";

const INITIAL_CARDBLOG: CardBlog[] = [
    {
        id: "1",
        date: "15 Mars 2024",
        title: "Lorem ipsum dolor sit amet",
        description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxyaEBXj5PaK8LibBqGtSnpMFJ6S__G6kRQg&s",
        category: {
        id: "1",
        title: "Design",
        },
        user: {
        id: "1",
        name: "Shadcn",
        avatar: "https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png",
        },
        reactions: {
            count: 10,
            replys: 2,
        },
        topics: [{title:"Web Design", id:"1236"}, {title:"Web Design", id:"1237"},{title:"Web Design", id:"1238"}, {title:"Web Design", id:"1239"} ,{title:"Web Design", id:"1230"}],
    },
    {
        id: "2",
        date: "15 Mars 2024",
        title: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
        description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxyaEBXj5PaK8LibBqGtSnpMFJ6S__G6kRQg&s",
        category: {
        id: "1",
        title: "Design",
        },
        user: {
        id: "1",
        name: "Shadcn",
        avatar: "https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png",
        },
        reactions: {
            count: 10,
            replys: 2,
        },
        topics: [{title:"Web Design", id:"1236"}, {title:"Web Design", id:"1237"},{title:"Web Design", id:"1238"}, {title:"Web Design", id:"1239"} ,{title:"Web Design", id:"1230"}],
    },
    {
        id: "3",
        date: "15 Mars 2024",
        title: "Lorem ipsum dolor sit amet ",
        description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxyaEBXj5PaK8LibBqGtSnpMFJ6S__G6kRQg&s",
        category: {
        id: "1",
        title: "Design",
        },
        user: {
        id: "1",
        name: "Shadcn",
        avatar: "https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png",
        },
        reactions: {
            count: 10,
            replys: 2,
        },
        topics: [{title:"Web Design", id:"1236"}, {title:"Web Design", id:"1237"},{title:"Web Design", id:"1238"}, {title:"Web Design", id:"1239"} ,{title:"Web Design", id:"1230"}],
    },
    {
        id: "4",
        date: "15 Mars 2024",
        title: "Lorem ipsum dolor sit amet",
        description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxyaEBXj5PaK8LibBqGtSnpMFJ6S__G6kRQg&s",
        category: {
        id: "1",
        title: "Design",
        },
        user: {
        id: "1",
        name: "Shadcn",
        avatar: "https://avatars.githubusercontent.com/u/127729578?s=200&v=4",
        },
        reactions: {
            count: 10,
            replys: 2,
        },
        topics: [{title:"Web Design", id:"1236"}, {title:"Web Design", id:"1237"},{title:"Web Design", id:"1238"}],
    },
    {
        id: "5",
        date: "15 Mars 2024",
        title: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
        description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxyaEBXj5PaK8LibBqGtSnpMFJ6S__G6kRQg&s",
        category: {
        id: "1",
        title: "Design",
        },
        user: {
        id: "1",
        name: "Shadcn",
        avatar: "https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png",
        },
        reactions: {
            count: 10,
            replys: 2,
        },
        topics: [{title:"Web Design", id:"1236"}, {title:"Web Design", id:"1237"},{title:"Web Design", id:"1238"}, {title:"Web Design", id:"1239"} ,{title:"Web Design", id:"1230"}],
    },
]


const INITIAL_CARDSOCIAL: CardSocial[] = [
    {
        id: "1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        user: {
        id: "1",
        name: "Shadcn",
        avatar: "https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png",
        },
        followers: 1000,
    },
    {
        id: "2",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        user: {
        id: "1",
        name: "Shadcn",
        avatar: "https://img.freepik.com/premium-vector/cartoon-man-with-glasses-beard_481747-101434.jpg?semt=ais_hybrid",
        },
        followers: 1000,
    },
    {
        id: "3",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        user: {
        id: "1",
        name: "Shadcn",
        avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid",
        },
        followers: 1000,
    }
    
]

export {INITIAL_CARDBLOG, INITIAL_CARDSOCIAL }