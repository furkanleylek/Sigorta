import React from 'react'
import { Paragraph } from '../ui/paragraph'
import { TitleH3 } from '../ui/h3'

interface GenelBilgilerProps {
    genelbilgiler?: {
        title: string
        description: string
    }[]
}

const GenelBilgi: React.FC<GenelBilgilerProps> = ({ genelbilgiler }) => {
    return (
        <div className='flex flex-col gap-20'>
            {genelbilgiler?.map((element) => {
                return (
                    <div key={element.title} className='flex flex-col gap-2'>
                        <TitleH3>{element.title}</TitleH3>
                        <Paragraph>{element.description}</Paragraph>
                    </div>
                )
            })}
        </div>
    )
}

export default GenelBilgi