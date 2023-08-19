'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import TeklifAlMenuModal from './teklifal-menu-modal'



const NavLinks = () => {

    const pathname = usePathname()

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
            {pathname === '/teklifal' && (
                <div className='hidden lg:flex'>
                    <TeklifAlMenuModal />
                </div>
            )}
        </div>
    )
}

export default NavLinks