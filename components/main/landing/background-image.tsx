import React from 'react'
import Image from 'next/image'
export const BackgroundImage = () => {
    return (
        <Image
            src="/bg2.jpg"
            fill
            alt='bg'
            className=' bg-cover object-cover w-full z-[-20] brightness-[.65] '
        />
    )
}

