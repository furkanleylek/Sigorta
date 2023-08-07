import Link from 'next/link'
import React from 'react'
import { NavbarModal } from './navigation-modal'



const NavLinks = () => {

    return (
        <div className='hidden lg:flex items-center space-x-10'>
            <Link
                href='/'
                className='font-semibold tracking-wider uppercase text-sm 
                 hover:translate-y-[-2px] transition-all duration-500
                '
            >
                HAKKIMIZDA
            </Link>

            <Link
                href='/'
                className='font-semibold tracking-wider uppercase text-sm 
                rounded-xl hover:translate-y-[-2px] transition-all duration-500
                '
            >
                BİZE ULAŞIN
            </Link>
        </div>
    )
}

export default NavLinks