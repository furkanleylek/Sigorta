import React from 'react'
import { Paragraph } from '../ui/paragraph'
import { GenelbilgiH3 } from '../ui/genelbilgi-h3'
import { HiOutlineChevronRight } from 'react-icons/hi'
import { Separator } from '../ui/separator'
import ScrollProgressButton from '../ScrollArrow'
interface GenelBilgilerProps {
    genelbilgiler?: {
        title: string
        description: {
            paragraph: string
        }[]
    }[]
}

const GenelBilgi: React.FC<GenelBilgilerProps> = ({ genelbilgiler }) => {
    return (
        <div className='flex flex-col w-full lg:w-2/3'>
            {genelbilgiler?.map((element) => {
                return (
                    <div key={element.title} className='flex flex-col items-start gap-2'>
                        <GenelbilgiH3 >{element.title}</GenelbilgiH3>
                        <div className='flex flex-col gap-2'>
                            {
                                element.description.map((e, index) => (
                                    <div key={index} className='inline-grid grid-flow-col justify-start gap-2 '>
                                        {
                                            e.paragraph.length > 0 && (
                                                <HiOutlineChevronRight size={14} className="mt-1" />
                                            )
                                        }
                                        <Paragraph>{e.paragraph}</Paragraph>
                                    </div>
                                ))
                            }
                        </div>
                        <Separator className='my-8' />
                    </div>
                )
            })}
            <ScrollProgressButton />
        </div>
    )
}

export default GenelBilgi