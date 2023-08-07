import React from 'react'
import Container from '../../ui/container'
import Image from 'next/image'
import { Paragraph } from '../../ui/paragraph'
import { Button } from '../../ui/button'
import { BackgroundImage } from './background-image'
const Landing = () => {
    return (
        <div className=' text-white h-full w-full flex items-center  relative pb-36 pt-24'>
            <BackgroundImage />
            <Container className='h-full space-y-10'>
                <h1 className='text-2xl md:text-4xl lg:text-6xl'>Kahramanmaraş Sigorta<br /> <span className='font-bold text-3xl md:text-5xl lg:text-7xl'>Kaza Geliyorum Demez !</span></h1>
                <Paragraph className=' w-[96%] md:w-1/2 tracking-wider'>
                    Trafik kazalarında trafik sigorta poliçeniz ve kasko poliçenizde teminatların tam olduğundan emin olmanız gerekmektedir .
                </Paragraph>
                <div className='flex flex-col md:flex-row items-start gap-4 pt-4 md:pt-8'>
                    <Button className='uppercase bg-stroke text-secondary rounded-full font-semibold tracking-wider hover:translate-y-[-4px] transition-all duration-500' size='lg'>
                        EN UYGUN TEKLİFİ ALIN
                    </Button>
                    <Button className='uppercase bg-zinc-900 bg-opacity-20 text-secondary rounded-full font-semibold tracking-wider hover:translate-y-[-4px] transition-all duration-500' size='lg' variant='outline'>
                        BİZE ULAŞIN
                    </Button>
                </div>

            </Container>
        </div>
    )
}

export default Landing