import React from 'react'
import Container from '../ui/container'

interface SigortaCategoryProps {
    categoryItems?: {
        title: string
        description: string
    }
}

const SigortaCategory: React.FC<SigortaCategoryProps> = ({ categoryItems }) => {

    console.log(categoryItems)
    return (
        <Container>
            <h1 className='text-3xl text-white'>  {categoryItems?.title} </h1>
        </Container>
    )
}

export default SigortaCategory