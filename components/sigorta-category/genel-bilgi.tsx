import React from 'react'
import { Paragraph } from '../ui/paragraph'
import { GenelbilgiH3 } from '../ui/genelbilgi-h3'
import { HiOutlineChevronRight } from 'react-icons/hi'
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
        <div className='flex flex-col gap-20'>
            {genelbilgiler?.map((element) => {
                return (
                    <div key={element.title} className='flex flex-col items-start gap-2'>
                        <GenelbilgiH3>{element.title}</GenelbilgiH3>
                        <div className='flex flex-col gap-2'>
                            {
                                element.description.map((e, index) => (
                                    <div key={index} className='inline-grid grid-flow-col justify-start gap-2 '>
                                        <HiOutlineChevronRight size={14} className="mt-1" />
                                        <Paragraph>{e.paragraph}</Paragraph>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default GenelBilgi