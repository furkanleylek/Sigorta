import React from 'react'
import Container from '../../ui/container'
import Image from 'next/image'
import { Paragraph } from '../../ui/paragraph'
import { Button } from '../../ui/button'
import { BackgroundImage } from './background-image'
import Link from 'next/link'
const Landing = () => {
    return (
        <div className=' text-white h-full w-full flex items-center  relative  pb-8 pt-8 md:pb-16 md:pt-16'>
            <BackgroundImage />
            <Container className='h-full space-y-6 md:space-y-4'>
                {/* <h1 className='text-xl md:text-3xl lg:text-5xl'>Kahramanmaraş Sigorta<br /> <span className='font-bold text-3xl md:text-5xl lg:text-7xl'>Geleceğinizi Şimdi Koruma Altına Alın</span></h1> */}
                <h1 className='font-bold text-3xl md:text-5xl lg:text-7xl'>Geleceğinizi Şimdi Koruma Altına Alın</h1>

                <Paragraph className=' w-[96%] md:w-2/3 tracking-wider'>
                    Trafik kazalarında trafik sigorta poliçeniz ve kasko poliçenizde teminatların tam olduğundan emin olmanız gerekmektedir .
                </Paragraph>
                <div className='flex flex-col md:flex-row items-start gap-4 pt-4 md:pt-8'>
                    <Link href='/teklifal'>
                        <Button className='uppercase bg-stroke text-secondary rounded-full font-semibold tracking-wider hover:translate-y-[-4px] transition-all duration-500' size='lg'>
                            EN UYGUN TEKLİFİ ALIN
                        </Button>
                    </Link>
                    <Link href='/iletisim'>
                        <Button className='uppercase bg-zinc-900 bg-opacity-20 text-secondary rounded-full font-semibold tracking-wider hover:translate-y-[-4px] transition-all duration-500' size='lg' variant='outline'>
                            BİZE ULAŞIN
                        </Button>
                    </Link>
                </div>
            </Container>
        </div>
    )
}

export default Landing