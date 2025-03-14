import { cn } from '@/lib/utils'
import React, { useEffect } from 'react'
import { BiLogoDigitalocean } from 'react-icons/bi'
import { Link, useLocation } from 'react-router-dom'

function MainNav() {
  const location = useLocation()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
    <Link to="/" className="mr-6 flex items-center space-x-2">
      <BiLogoDigitalocean className="h-6 w-6" />
      <span className="font-bold">App</span>
    </Link>
    <Link
      to="/filter/posts"
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
        //si el paht contiene /filter entonces el texto es foreground si no es foreground/60
        location.pathname.includes("filter") ? "text-foreground" : "text-foreground/60"
      )}
    >
      Blog
    </Link>
    <Link
      to="/about"
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
        location.pathname.includes("about") ? "text-foreground" : "text-foreground/60"
      )}
    >
      About
    </Link>
    <Link
      to="/write"
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary hidden sm:inline-block",
        location.pathname.includes("write") ? "text-foreground" : "text-foreground/60"
      )}
    >
      Write
    </Link>
  </nav>
  )
}

export default MainNav