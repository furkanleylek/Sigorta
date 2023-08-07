import React from 'react'
import Container from '../ui/container'

interface SigortaCategoryProps {
    categoryItems?: {
        title: string
        description: string
        linkHref: string
    }
}

const SigortaCategory: React.FC<SigortaCategoryProps> = ({ categoryItems }) => {

    return (
        <Container>
            <h1 className='text-3xl text-white'>  {categoryItems?.title} </h1>
        </Container>
    )
}

export default SigortaCategory