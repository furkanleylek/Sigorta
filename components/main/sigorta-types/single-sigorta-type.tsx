import React from 'react'
import Image from 'next/image'
import { Paragraph } from '@/components/ui/paragraph'
import Link from 'next/link'

interface SingleSigortaTypeProps {
    singleSigorta: {
        title: string
        description: string
        imageUrl: string
        linkHref: string
    }
}

const SingleSigortaType: React.FC<SingleSigortaTypeProps> = ({ singleSigorta }) => {


    return (
        <>
            <Link
                href={`/${singleSigorta.linkHref}`}
                className='flex flex-col justify-between border border-border rounded-md shadow-xl shadow-rose-50  text-primary bg-white  w-full h-full 
'>
                <div className='relative w-full h-44 '>
                    <Image
                        src={singleSigorta.imageUrl}
                        fill
                        alt={singleSigorta.title}
                        className='object-cover'
                    />
                </div>
                <div className="px-4 lg:px-8 py-4 space-y-2 h-32 md:h-40">
                    <h4 className='font-semibold text-base lg:text-2xl '>
                        {singleSigorta.title}
                    </h4>
                    <Paragraph className='whitespace-pre-line '>
                        {singleSigorta.description}
                    </Paragraph>
                </div>
                <button className='text-sm md:text-base text-main font-semibold border border-border py-3 '>
                    DETAYLI BİLGİ AL
                </button>

            </Link>

            {/* 


            <Link
                href={`/${singleSigorta.linkHref}`}
                className='border border-border rounded-md shadow-xl shadow-rose-50  text-primary bg-white
   group hover:bg-main hover:text-white hover:transition-all hover:translate-y-[-10px] hover:duration-500 duration-500 opacity-80 hover:opacity-100'>
                <div className='relative w-full h-36'>
                    <Image
                        src={singleSigorta.imageUrl}
                        fill
                        alt={singleSigorta.title}
                        className='object-cover'
                    />
                </div>
                <div className='flex flex-col p-4 lg:py-4 lg:px-8 space-y-4 h-full '>
                    <h4 className='font-semibold text-base lg:text-2xl'>
                        {singleSigorta.title}
                    </h4>
                    <Paragraph className='whitespace-pre-line flex-grow'>
                        {singleSigorta.description}
                    </Paragraph>
                </div>
            </Link> */}
        </>

    )
}

export default SingleSigortaType



