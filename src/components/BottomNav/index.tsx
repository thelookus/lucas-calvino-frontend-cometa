'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HomeFilledIcon,
  HomeOutlineIcon,
  ProfileFilledIcon,
  ProfileOutlineIcon,
  OrderFilledIcon,
  OrderOutlineIcon,
 } from '@/assets/icons'
 import { useOrderStore } from '@/store'

export const BottomNav = () => {
  const pathname = usePathname()
  const { getActiveOrders } = useOrderStore()
  const hasActiveOrders = getActiveOrders().length > 0

  return (
    <footer className="">
      <nav className="fixed bottom-0 left-0 right-0 h-15 px-13 bg-[var(--background)]">
        <div className="max-w-screen-xl mx-auto h-full flex justify-between items-center">
          <Link
            href="/"
            className="flex flex-col items-center gap-1"
          >
            { pathname === '/' ? <HomeFilledIcon className='w-8 h-8' /> : <HomeOutlineIcon className='w-8 h-8' /> }
          </Link>

          <Link
            href="/orders"
            className="flex flex-col items-center gap-1 relative"
          >
            { pathname.includes('/orders')
              ? <OrderFilledIcon className='w-8 h-8' />
              : (
                <>
                  <OrderOutlineIcon className='w-8 h-8'/>
                  {hasActiveOrders && !pathname.includes('/orders') && (
                    <span className="absolute -top-[-7px] -right-[-7px] w-[6px] h-[6px] bg-[#FF5C00] rounded-full" />
                  )}
                </>
              )
            }
          </Link>

          <Link
            href="/profile"
            className="flex flex-col items-center gap-1"
          >
            { pathname === '/profile' ? <ProfileFilledIcon className='w-8 h-8'/> : <ProfileOutlineIcon className='w-8 h-8'/> }
          </Link>
        </div>
      </nav>
    </footer>
  )
}
