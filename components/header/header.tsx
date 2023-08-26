'use client'
import React from 'react'
import NavLinks from './nav-links'
import Link from 'next/link'
import { NavbarModal } from './navigation-modal'
import SocialLinks from './social-links'
import { Separator } from '../ui/separator'
import Image from 'next/image'
import MenuModal from './menu-modal'
import { usePathname } from 'next/navigation'
const Header = () => {

    const pathname = usePathname()

    return (
        <header className='w-full '>
            <div className='md:container px-4 w-full flex items-center justify-between py-4 text-main'>
                <SocialLinks />
                <Link href='/' className='font-extrabold flex items-center space-x-3'>
                    <Image
                        src='/tick.png'
                        width={40}
                        height={40}
                        alt='logo'
                    />
                    <span>maraşsigorta</span>
                </Link>
                <div className='flex lg:hidden'>
                    <MenuModal />
                </div>
                <NavLinks />
            </div>
            <Separator />
            {pathname !== '/teklifal' && (
                <div className='hidden lg:flex  w-full'>
                    <NavbarModal />
                </div>
            )}


        </header>
    )
}

export default Header