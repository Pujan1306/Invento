import {  Bell, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarTrigger } from '../ui/sidebar'
import { useState } from 'react'
import { AnimatedThemeToggler } from '../ui/animated-theme-toggler'
import { Separator } from '../ui/separator'
import Link from 'next/link'

export default function NavBar() {
  const items = [
    {
      product: 'Product 1',
      name: 'Product 1',
      description: 'Product 1 description',
      price: 100,
      quantity: 1,
      total: 100,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      product: 'Product 2',
      name: 'Product 2',
      description: 'Product 2 description',
      price: 200,
      quantity: 2,
      total: 200,
      status: 'active',
    }
  ]
  
  const [query, setQuery] = useState('');

  function searchProducts(query: string) {
    return items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
  }
  return (
    <>
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">

      <div className="flex items-center justify-between px-4 py-2 md:px-6">
 
        <div className="flex items-center gap-3">
          <SidebarTrigger className="h-8 w-8" />
        </div>

        <div className="flex items-center gap-2 md:gap-5 shrink-0">
          <Button variant="ghost" size="icon" className="h-9 w-9 md:h-8 md:w-8">
            <Bell className="size-5 md:size-5" />
          </Button>
          <AnimatedThemeToggler className="size-9 w-9 md:h-8 md:w-8" />
          <Separator orientation='vertical' className='h-6' />
          <Avatar className="h-9 w-9 md:h-8 md:w-8 cursor-pointer hover:ring-2 hover:ring-ring transition-all duration-200">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback className="text-xs font-medium bg-primary text-primary-foreground">
              Ed
            </AvatarFallback>
          </Avatar>
          <Link href='/userSettings'>
          <Button variant="ghost" size="icon" className="h-9 w-9 md:h-8 md:w-8">
            <Settings className=" size-5 md:size-5" />
          </Button>
          </Link>
        </div>
      </div>

    </header>
    {query.length > 0 && (
      <div className="flex flex-col gap-2 pl-20 lg:pl-65 bg-background">
        {searchProducts(query).map((item, idx) => (
          <div key={item.name + idx}>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    )}
    </>
  );
}