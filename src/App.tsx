import Navbar from "./components/nav/Navbar"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from "./components/page/Home"
import { SearchProvider } from "./context/search-context"
import BlogFilter from "./components/page/BlogFilter"
import Posts from "./components/filter/pages/Posts"
import People from "./components/filter/pages/People"
import Tags from "./components/filter/pages/Tags"
import Write from "./components/page/Write"

function App() {
  return (
    <Router>
      <SearchProvider>
        
        <div className="relative flex flex-col bg-background">
          <Navbar/>
        </div>
        <Routes>
          
            <Route path="" element={<Home />} />
            <Route path="/write" element={<Write />} />
            <Route path="/filter" element={<BlogFilter />}>
              <Route path="posts" element={<Posts />} />
              <Route path="people" element={<People />} />
              <Route path="tags" element={<Tags />} />
            </Route>
            {/* <Route path="/blog/list" element={<ProductPage />} /> */}
          
              
        </Routes>
        
        
      </SearchProvider>
    </Router>
  )
}

export default App
