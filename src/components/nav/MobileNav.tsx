import { useState } from 'react'
import { DiDigitalOcean } from 'react-icons/di';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { LuSquareMenu } from 'react-icons/lu';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { BiLogoDigitalocean } from 'react-icons/bi';

function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="w-10 px-0 sm:hidden scale-95 rounded-full" variant="ghost" size="icon" >
          <LuSquareMenu className="h-5 w-5" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[220px]">
        <SheetHeader>
          <SheetTitle>
            <BiLogoDigitalocean className="h-6 w-6 inline" />
            <span className="ml-2">App</span>
          </SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col gap-3 mt-3">
          <div >
            Blog
          </div>
          <div >
            About
          </div>
          <div>
            GitHub
          </div>
          <Link
            target="_blank"
            rel="noreferrer"
            to={"/"}
          >
            Twitter
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}



export default MobileNav