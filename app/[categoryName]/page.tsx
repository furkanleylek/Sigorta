import React from 'react'
import { Metadata } from 'next'
import CategoryData from '@/data.json'
import SigortaCategory from '@/components/sigorta-category/sigorta-category'
type Props = {
    params: { categoryName: string }
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const categoryItems = CategoryData.data.find(item => item.linkHref === params.categoryName)
    return {
        title: `Categories | ${categoryItems?.title}`,
        // description: `${categorie?.name} description`
    }
}

export default async function CategoryPage({ params }: Props) {

    const categoryItems = CategoryData.data.find(item => item.linkHref === params.categoryName)
    return (

        <div className='flex flex-col  w-full space-y-8 pt-16 h-screen'>
            <SigortaCategory categoryItems={categoryItems} />
        </div>
    )
}
