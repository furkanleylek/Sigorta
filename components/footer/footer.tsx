import React from 'react'
import Container from '../ui/container'
import Image from 'next/image'
const Footer = () => {
    return (
        <div
            className="w-full h-full relative "
        >
            <Container className='h-80'>
                <footer>Footer</footer>
            </Container>
            <Image
                style={{ filter: "brightness(40%)" }}
                src="/bg2.jpg"
                fill
                alt="footer"
                className='h-60 md:h-80 w-full z-[-10] object-cover'
                priority
            />
        </div>
    )
}

export default Footer