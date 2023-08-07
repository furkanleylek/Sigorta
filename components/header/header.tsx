import React from 'react'
import NavLinks from './nav-links'
import Link from 'next/link'
import { NavbarModal } from './navigation-modal'
const Header = () => {
    return (
        <header className='absolute z-20 w-full  '>
            <div className='md:container mx-auto px-4 md:px-12 lg:px-24 w-full flex items-center justify-between py-8 md:py-16 text-white'>
                <Link href='/' className='font-extrabold'>maraşsigorta</Link>
                <NavLinks />
            </div>
        </header>
    )
}

export default Header