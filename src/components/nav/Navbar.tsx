
import { Link } from 'react-router-dom'
import ModeToggle from './ModeToggle'
import { FaGithub } from 'react-icons/fa'
import { buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'
import MainNav from './MainNav'
import MobileNav from './MobileNav'
import Search from '../search/Search'
import PerfilDropdown from './PerfilDropdown'

function Navbar() {


  return (
    <header className="z-10 sticky top-0 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 max-w-screen-2xl items-center md:px-8 px-1">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <Search />
            <div className='ml-2 flex items-center gap-3'>
              <ModeToggle />
              <PerfilDropdown />
              <MobileNav />
            </div>
            {/* <Link
              to={"/"}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "w-10 px-0 hidden sm:inline-flex"
                )}
              >
                <FaGithub  className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
             */}
          </nav>
        </div>
      </div>
    </header>
  )
}
{/* 
    <Link to={`/home`}/> */}
export default Navbar