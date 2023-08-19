'use client'
import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { BiMenuAltRight } from 'react-icons/bi'
import { FiMenu } from 'react-icons/fi'
import { NavbarModal } from './navigation-modal'
const TeklifAlMenuModal = () => {
    return (
        <Sheet>
            <SheetTrigger><FiMenu size={28} /></SheetTrigger>
            <SheetContent className='pt-12 ' side="top">
                {/* <SheetHeader className=''>
                    <SheetTitle>Are you sure absolutely sure ?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone . This will permanently delete your account and remoev . .. .
                    </SheetDescription>
                </SheetHeader> */}
                <NavbarModal />
            </SheetContent>
        </Sheet>
    )
}

export default TeklifAlMenuModal