import React from 'react'
import Container from '../ui/container'
import ContentType from './content-type'

interface SigortaCategoryProps {
    categoryItems?: {
        title: string
        description: string
        linkHref: string
        merakedilenler: {
            title: string
            description: string
        }[]
        genelbilgiler: {
            title: string
            description: {
                paragraph: string
            }[]
        }[]
    }
}

const SigortaCategory: React.FC<SigortaCategoryProps> = ({ categoryItems }) => {

    return (
        <Container className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl w-full lg:w-2/3'>{categoryItems?.title} </h1>
            <ContentType categoryItems={categoryItems} />
        </Container>
    )
}

export default SigortaCategory