import React from 'react'
import Container from '../ui/container'
import ContentType from './content-type'
import { Separator } from '../ui/separator'
import { FcDocument } from 'react-icons/fc'
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
            <div className='w-full lg:w-2/3 flex items-center space-x-2'>
                <FcDocument size={32} />
                <h1 className='font-semibold text-xl w-max md:text-2xl'>{categoryItems?.title} </h1>
            </div>
            <Separator className='mt-2' />
            <ContentType categoryItems={categoryItems} />
        </Container>
    )
}

export default SigortaCategory