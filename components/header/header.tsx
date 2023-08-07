import React from 'react'
import NavLinks from './nav-links'
import Link from 'next/link'
import { NavbarModal } from './navigation-modal'
import SocialLinks from './social-links'
import { Separator } from '../ui/separator'
const Header = () => {
    return (
        <header className='w-full'>
            <div className='md:container px-4 w-full flex items-center justify-between py-8 text-main'>
                <SocialLinks />
                <Link href='/' className='font-extrabold'>maraşsigorta</Link>
                <NavLinks />
            </div>
            <Separator />
            <div className='text-main hidden lg:flex items-center justify-center py-4'>
                <NavbarModal />
                {/* <Link
                    href='/'
                    className='font-semibold tracking-wider uppercase text-sm 
                rounded-xl hover:translate-y-[-2px] transition-all duration-500
                '
                >
                    EN UYGUN TEKLİFİ ALIN
                </Link> */}
            </div>
        </header>
    )
}

export default Header