'use client'
import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { FiMenu } from 'react-icons/fi'
import { NavbarModal } from './navigation-modal'
import Link from 'next/link'
import Image from 'next/image'
const TeklifAlMenuModal = () => {
    return (
        <Sheet>
            <SheetTrigger><FiMenu size={28} /></SheetTrigger>
            <SheetContent className='pt-12 ' side="top">
                <SheetHeader className='items-center pb-6'>
                    <Link href='/' className='font-extrabold flex items-center space-x-3'>
                        <Image
                            src='/tick.png'
                            width={40}
                            height={40}
                            alt='logo'
                        />
                        <span>maraşsigorta</span>
                    </Link>
                </SheetHeader>
                <NavbarModal />
            </SheetContent>
        </Sheet>
    )
}

export default TeklifAlMenuModal