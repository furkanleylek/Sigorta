import React from 'react'
import Image from 'next/image'
import { Paragraph } from '@/components/ui/paragraph'
interface SingleNasılCalısırProps {
    cardData: {
        title: string
        description: string
        Icon: string
    }
}

const SingleNasılCalısır: React.FC<SingleNasılCalısırProps> = ({ cardData }) => {
    return (
        <div className='flex flex-col gap-4 border border-border p-8  rounded-md shadow-xl shadow-rose-50 text-primary bg-white
    hover:bg-main hover:text-white hover:transition-all hover:translate-y-[-10px] hover:duration-500 duration-500 opacity-80 hover:opacity-100'>
            <Image
                src={cardData.Icon}
                width={60}
                height={60}
                alt={cardData.title}
                className='object-cover'
            />
            <div className='flex flex-col h-full space-y-2'>
                <h4 className='font-semibold lg:text-xl'>
                    {cardData.title}
                </h4>
                <Paragraph className='whitespace-pre-line flex-grow'>
                    {cardData.description}
                </Paragraph>
            </div>
        </div>
    )
}

export default SingleNasılCalısır



