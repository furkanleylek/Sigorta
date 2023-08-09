import React from 'react'
import Container from '../ui/container'
import ContentType from './content-type'

interface SigortaCategoryProps {
    categoryItems?: {
        title: string
        description: string
        linkHref: string
    }
}

const SigortaCategory: React.FC<SigortaCategoryProps> = ({ categoryItems }) => {

    return (
        <Container className=''>
            <h1 className='text-3xl'>  {categoryItems?.title} </h1>
            <ContentType />
        </Container>
    )
}

export default SigortaCategory