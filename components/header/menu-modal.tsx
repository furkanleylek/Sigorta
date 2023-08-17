'use client'
import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { BiMenuAltRight } from 'react-icons/bi'
const MenuModal = () => {
    return (
        <div className='flex lg:hidden'>
            <Sheet>
                <SheetTrigger><BiMenuAltRight size={28} /></SheetTrigger>
                <SheetContent className='py-12 ' >
                    <SheetHeader className=''>
                        <SheetTitle>Are you sure absolutely sure ?</SheetTitle>
                        <SheetDescription>
                            This action cannot be undone . This will permanently delete your account and remoev . .. .
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MenuModal